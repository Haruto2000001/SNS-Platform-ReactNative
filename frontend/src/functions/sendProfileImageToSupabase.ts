import { decode } from "base64-arraybuffer"
import * as ImagePicker from "expo-image-picker"
import { supabase } from "@/lib/supabase"
import useUserStore from "@/store/userStore"
import { ImageManipulator, SaveFormat } from "expo-image-manipulator"
import ExpoImageEditorModule from "../../modules/expo-image-editor/src/ExpoImageEditorModule"

const sendProfileImageToSupabase = async (user: any) => {
  try {
    if (!user) {
      console.warn("User is null or undefined. Cannot upload profile image.")
      return
    }

    const resultPicker = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: "images",
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    })

    if (resultPicker.canceled) {
      console.warn("Image selection was canceled or no base64 data found.")
      return
    }

    const manipulator = ImageManipulator.manipulate(resultPicker.assets[0].uri)
    manipulator.resize({
      width: 1024,
      height: 1024,
    })

    const resiezdImage = await manipulator.renderAsync()
    const resultResized = await resiezdImage.saveAsync({
      format: SaveFormat.PNG,
      base64: true,
    })

    const nativeImage = await ExpoImageEditorModule.cropCircle(
      resultResized.base64!
    )

    const imagePath = `${user.id}/profileImage.png`
    //const imageData = decode(resultResized.base64!)
    const imageData = decode(nativeImage)
    console.log(imageData)
    // Upload image to Supabase Storage
    const { data, error } = await supabase.storage
      .from("user-profile-image")
      .update(imagePath, imageData, {
        upsert: true,
      })

    if (error) {
      console.error(
        "Failed to upload image to Supabase Storage:",
        error.message
      )
      return
    }

    // Get the public URL of the uploaded image
    const { data: publicUrlData } = supabase.storage
      .from("user-profile-image")
      .getPublicUrl(imagePath)

    if (!publicUrlData?.publicUrl) {
      console.error("Failed to retrieve public URL for the uploaded image.")
      return
    }

    const imageUrl = `${publicUrlData.publicUrl}?t=${new Date().getTime()}`

    // Update Icon to zustand
    useUserStore.getState().setIcon(imageUrl)

    console.log("Profile image updated successfully!")
  } catch (err) {
    console.error("An unexpected error occurred:", err)
  }
}

export default sendProfileImageToSupabase
