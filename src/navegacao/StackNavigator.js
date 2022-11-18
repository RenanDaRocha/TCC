import React from "react";
import { createNativeStackNavigator  } from "@react-navigation/native-stack";

import Constantes from '../constantes'
import TelaLogin from "../tela/TelaLogin";
import TelaPrincipal from '../tela/TelaPrincipal'
import TelaEscolha from '../tela/TelaEscolha'
import TelaCodigo from '../tela/TelaCodigo'
import TelaCadCodigo from '../tela/TelaCadCodigo'
import TelaCadastrar from '../tela/TelaCadastrar'
import TelaRelatorio from '../tela/TelaRelatorio'
import TelaEscolhaRanking from '../tela/TelaEscolhaRanking'
import TelaRanking from '../tela/TelaRanking'

const Stack = createNativeStackNavigator();

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
      <Stack.Screen name="TelaEscolha" component={TelaEscolha} options={{headerShown:false}} />
      <Stack.Screen name="TelaCodigo" component={TelaCodigo} options={{headerShown:false}} />
      <Stack.Screen name="TelaCadCodigo" component={TelaCadCodigo} options={{headerShown:false}} />
      <Stack.Screen name="TelaCadastrar" component={TelaCadastrar} options={{headerShown:false}} />
      <Stack.Screen name="TelaRelatorio" component={TelaRelatorio} options={{headerShown:false}} />
      <Stack.Screen name="TelaEscolhaRanking" component={TelaEscolhaRanking} options={{headerShown:false}} />
      <Stack.Screen name="TelaRanking" component={TelaRanking} options={{headerShown:false}} />
    </Stack.Navigator>
  );
};

export default MainStackNavigator