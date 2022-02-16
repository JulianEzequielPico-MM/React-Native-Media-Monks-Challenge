import * as Font from 'expo-font';

export default useFonts = async () =>
  await Font.loadAsync({
    NotoSans: require("../assets/fonts/NotoSans/NotoSans-Regular.ttf"),
    NotoSansBold: require("../assets/fonts/NotoSans/NotoSans-Bold.ttf"),
    RedHat: require("../assets/fonts/Red_Hat/RedHatDisplay-Regular.ttf"),
    Cinzel: require("../assets/fonts/Cinzel/Cinzel-Regular.ttf"),
    Roboto: require("../assets/fonts/Roboto/Roboto-Light.ttf"),
  });
