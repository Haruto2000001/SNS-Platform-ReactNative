# Profile Image Setup

プロフィール画像設定では、[Expo ImageManipulator](https://docs.expo.dev/versions/latest/sdk/imagemanipulator/), [Expo ImagePicker](https://docs.expo.dev/versions/latest/sdk/imagepicker/), [base64-arraybuffer](https://www.npmjs.com/package/base64-arraybuffer), また[Expo Module API](https://docs.expo.dev/modules/overview/)を使って Swift で書いたコードを使用で使用しています。
For profile image setup, we use [Expo ImageManipulator](https://docs.expo.dev/versions/latest/sdk/imagemanipulator/), [Expo ImagePicker](https://docs.expo.dev/versions/latest/sdk/imagepicker/), [base64-arraybuffer](https://www.npmjs.com/package/base64-arraybuffer), and native Swift code through [Expo Module API](https://docs.expo.dev/modules/overview/).

## Expo Module API

**MapLibre React Native ではマップに表示されるアイコンを丸くすることができませんでした**。
さらに、JS や React Native では画像を丸く切り抜くことができなかったので、Swift(Kotlin)でネイティブコードを書いてそれを Expo で使用するという方法で対処しました。
With MapLibre React Native, **we couldn't make the icons displayed on the map circular.**
Additionally, cropping images into circles was not possible with JS or React Native alone, so we need to write native code in Swift (or Kotlin) and used it via Expo.

[[Expo Doc] Wrap third-party native libraries](https://docs.expo.dev/modules/third-party-library/)の`Start with an existing project`から始めます。
`View`がついているファイルは使用しないので削除します。
`.swift`ファイルに新しく関数を作成し、`.ts`で Expo で使えるように設定します。

Start from the Start with an existing project section of [[Expo Doc] Wrap third-party native libraries](https://docs.expo.dev/modules/third-party-library/).
Delete any files with `View` in the name as we don’t use them.
Then, create a new function in a `.swift` file and expose it in `.ts` to use it with Expo.

```typescript
import ExpoImageEditorModule from "../../modules/expo-image-editor/src/ExpoImageEditorModule"
...
const nativeImage = await ExpoImageEditorModule.cropCircle(
      resultResized.base64!
    )
```

<img src="https://github.com/user-attachments/assets/596c4b9c-252b-4e61-8c60-0ff2e1311208" width="400">
