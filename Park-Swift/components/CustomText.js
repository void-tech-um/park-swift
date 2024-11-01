import React, { useEffect, useState } from 'react';
import { Text } from 'react-native';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';

const CustomText = (props) => {
  const [fontLoaded, setFontLoaded] = useState(false);

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        'NotoSansTaiTham-Bold': require('../assets/fonts/NotoSansTaiTham-Bold.ttf'),
        'NotoSansTaiTham-Medium': require('../assets/fonts/NotoSansTaiTham-Medium.ttf'),
        'NotoSansTaiTham-Regular': require('../assets/fonts/NotoSansTaiTham-Regular.ttf'),
        'NotoSansTaiTham-SemiBold': require('../assets/fonts/NotoSansTaiTham-SemiBold.ttf'),
        'NotoSansTaiTham-Variable': require('../assets/fonts/NotoSansTaiTham-VariableFont_wght.ttf'),
      });
      setFontLoaded(true);
    }

    loadFonts();
  }, []);

  if (!fontLoaded) {
    return <AppLoading />;
  }

  return <Text {...props} style={[props.style, { fontFamily: props.fontFamily || 'NotoSansTaiTham-Regular' }]} />;
};

export default CustomText;