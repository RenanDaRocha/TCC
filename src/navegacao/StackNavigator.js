import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Constantes from '../constantes'
import TelaLogin from "../tela/TelaLogin";
import TelaPrincipal from '../tela/TelaPrincipal'

const Stack = createStackNavigator();

const screenOptionStyle = {
  headerStyle: {
    backgroundColor: Constantes.corCabecalho,
  },
  headerTintColor: "white",
  headerBackTitle: "Back",
};

const MainStackNavigator = () => {
  return (  
    <Stack.Navigator 
      screenOptions={screenOptionStyle} 
      initialRouteName={"TelaLogin"}
    > 
      <Stack.Screen name="TelaLogin" component={TelaLogin} options={{headerShown:false}} />
      <Stack.Screen name="TelaPrincipal" component={TelaPrincipal} options={{headerShown:false}} />
    </Stack.Navigator>
  );
};

export default MainStackNavigator