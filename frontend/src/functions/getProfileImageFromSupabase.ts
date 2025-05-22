import { supabase } from "@/lib/supabase"

const getAllUserProfileImageFromSupabase = async () => {
  //console.log("getAllUserProfileImageFromSupabase Start !")
  try {
    const { data: allUserProfileImageUrl, error: allUserProfileImageUrlError } =
      await supabase.from("user_settings").select("id, icon")

    if (allUserProfileImageUrlError) {
      console.error(
        "Can't get all user profile image from supabase: ",
        allUserProfileImageUrlError
      )
      return null
    }

    return allUserProfileImageUrl
  } catch (err) {
    console.error("An unexpected error occurred:", err)
  }
}
const getUserProfileImageFromSupabase = async (user: any) => {
  //console.log("getUserProfileImageFromSupabase Start !")
  try {
    const { data: userProfileImageUrl, error: userProfileImageUrlError } =
      await supabase
        .from("user_settings")
        .select("icon, id")
        .eq("id", user?.id)
        .single()

    if (userProfileImageUrlError) {
      console.error(
        "Can't get all user profile image from supabase: ",
        userProfileImageUrlError
      )
      return null
    }

    return userProfileImageUrl
  } catch (err) {
    console.error("An unexpected error occurred:", err)
  }
}

export { getAllUserProfileImageFromSupabase, getUserProfileImageFromSupabase }
