## Expo & Supabase setup

最初はこの説明に従って、expo と supabase を使えるようにします。
First, follow the instructions in this document to integrate Supabase and Expo into your project.
[Google Document](!https://docs.google.com/document/d/1l-S13HMmnQu33n958Tzu3wSE_DUIOCFER_bzx5tTDLI/edit?tab=t.0)

## Development build

次に、ExpoGo ではなく development build を使う必要があるので、Xcode と Android Studio をインストーする必要があります。
Next, you need to use Expo's development builds instead of Expo Go to incorporate native modules, so you need to install Xcode and Android Studio.
[Expo Document iOS Simulator](https://docs.expo.dev/workflow/ios-simulator/)
[Expo Document Android Studio Emulator](https://docs.expo.dev/workflow/android-studio-emulator/)

また、エミュレータを起動するときに、`npx expo run:ios`, `npx expo run:android`で起動する必要があります。これは`npx expo start`では Native Module を使えないためです。
To launch your application on the simulator or emulator, you must use the `npx expo run:ios`, `npx expo run:android` commands, because `npx expo start` command does not support Native Modules.

## Cocoa Pods

ios のネイティブライブラリは Cocoa pods で管理されます。`npx expo run:ios`の初回実行で`/ios`フォルダの中に生成されます。
iOS native libraries are managed using CocoaPods. The necessary configuration and the `/ios` directory will be generated the first time you run `npx expo run:ios`

> [!CAUTION]
> ネイティブコードを含んだパッケージをインストールした場合に、`cd ios && pod install`してから`npx expo run:ios`をしないとエラーが出ることがよくあるので注意してください。
> If you install a new package that includes native code, you often need to manually install the pods `cd ios && pod install` before running the app again `npx expo run:ios`.

また、M1,2,3,4 チップ PC の場合は Ruby の影響でエラーが出る可能性があり、`rbenv`でバージョン管理をする必要があります。
If you are using a Mac with an Apple Silicon chip (M1, M2, M3, M4), you might encounter build errors related to the system's Ruby version, particularly affecting CocoaPods. So you need to manage your Ruby version using `rbenv`.
[GitHub Issue #2620](https://github.com/infinitered/ignite/issues/2620)
