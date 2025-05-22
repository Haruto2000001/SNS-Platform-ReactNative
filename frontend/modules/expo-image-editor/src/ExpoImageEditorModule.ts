import { NativeModule, requireNativeModule } from "expo"

import { ExpoImageEditorModuleEvents } from "./ExpoImageEditor.types"

declare class ExpoImageEditorModule extends NativeModule<ExpoImageEditorModuleEvents> {
  PI: number
  hello(): string
  setValueAsync(value: string): Promise<void>
  cropCircle(image: string): Promise<string>
}

// This call loads the native module object from the JSI.
export default requireNativeModule<ExpoImageEditorModule>("ExpoImageEditor")
