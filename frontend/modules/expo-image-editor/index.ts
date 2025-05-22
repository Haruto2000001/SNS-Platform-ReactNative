// Reexport the native module. On web, it will be resolved to ExpoImageEditorModule.web.ts
// and on native platforms to ExpoImageEditorModule.ts
export { default } from "./src/ExpoImageEditorModule"
export * from "./src/ExpoImageEditor.types"
