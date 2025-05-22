# Map Setup

Map では, [MapLibre React Native](https://maplibre.org/maplibre-react-native/), [Maptiler Cloud](https://cloud.maptiler.com/maps/), [react-native-background-geolocation](https://github.com/transistorsoft/react-native-background-geolocation)を使用します。

## MapLibre React Native

[Expo Setup](https://maplibre.org/maplibre-react-native/docs/setup/expo)に従ってインストールをします。
`ios/Podfile`を書き換えた後は`pod install`する必要があることに注意してください。
Install according to the [Expo Setup](https://maplibre.org/maplibre-react-native/docs/setup/expo).
Note that after modifying the `ios/Podfile`, you need to run `pod install`.

## Maptiler Cloud

[Maptiler Cloud](https://cloud.maptiler.com/maps/)にアクセスし、API key を取得します。
`frontend/.env`に API key を記入します。
Access [Maptiler Cloud](https://cloud.maptiler.com/maps/) and obtain an API key.
Add the API key to `frontend/.env` as shown above.

```.env
EXPO_PUBLIC_MAPTILER_API_KEY=...
```

設定した API key は MapLibre の`MapView`コンポーネントで登録します。
The API key should be used in the MapView component like this:

```typescript
<MapView
  style={styles.map}
  mapStyle={MAPTILER_STYLE_URL.replace("MAPTILER_API_KEY", MAPTILER_API_KEY)}
/>
```

## react-native-background-geolocation

バックグラウンドで位置情報を取得するために使用します。
[react-native-background-geolocation](https://github.com/transistorsoft/react-native-background-geolocation)の Expo setup に従ってセットアップしてください。
This is used to obtain location information in the background.
Please follow the Expo setup in the [react-native-background-geolocation](https://github.com/transistorsoft/react-native-background-geolocation) documentation.

> [!NOTE]
> エミュレーターの設定から位置情報を常に ON にする必要があります。
> ios エミュレータのホーム画面から、`設定→プライバシーとセキュリティ→位置情報サービス`
> You must always enable location in the emulator settings.
> In the iOS emulator: `Settings → Privacy & Security → Location Services`
> <img src="https://github.com/user-attachments/assets/12614ba6-e908-4864-b0ea-8aed8d53edb8" width="400">

> [!NOTE]
> react-native-background-geolocation の github に書いてある example code では動かないので注意してください。
> The example code on the react-native-background-geolocation GitHub does not work as is
> [[Help Wanted]: BackgroundGeolocation is configured and ready: false #2300](https://github.com/transistorsoft/react-native-background-geolocation/issues/2300)
