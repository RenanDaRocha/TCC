import React from 'react';
import { ImageBackground } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context';

const imgFundo='./assets/background.png'

import StackNavigator from "./src/navegacao/StackNavigator";

export default function App() {
  return (
    <SafeAreaView style={{flex: 1}} >
      <ImageBackground
                source={require(imgFundo)}
                style={{width: '100%', height: '100%'}}
      >
        <NavigationContainer>        
          <StackNavigator />
        </NavigationContainer>      
      </ImageBackground>
      
    </SafeAreaView>
  );
}