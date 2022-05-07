import React, { Component } from 'react'
import { View, Text, ImageBackground, ScrollView, TextInput } from 'react-native'

import styles from './estilo/EstiloTelaCodigo'
import BotaoCentral from '../componente/BotaoCentral'
import { DataHoje } from '../funcoes'

const imgFundo='../../assets/background.png'

export default class TelaLogin extends Component {

    render(){
        return <>
            <ImageBackground
                source={require(imgFundo)}
                style={{width: '100%', height: '100%'}}
            >
                <ScrollView>
                    <View style={styles.telaTotal}>

                        <View style={styles.informacoes}>
                            <Text>
                                {DataHoje(8)}
                            </Text>                             
                        </View>

                        <View style={{borderBottomWidth: 0, paddingTop: 20}} />

                        <View style={styles.informacoes}>
                            <TextInput
                                multiline={true}
                            />
                      
                        </View>

                        <View style={{borderBottomWidth: 0, paddingTop: 20}} />

                        <View style={styles.botoes}>
                            <View style={{flex: 1}}>
                                <BotaoCentral
                                    titulo="Enviar"
                                    height= {50}
                                />    
                            </View>
                            
                            <View style={{flex: 1}}>
                                <BotaoCentral
                                    titulo="Cancelar"
                                    height= {50}                      
                                />    
                            </View>
                            
                        </View>
                        

                        <View style={{paddingTop: 30}}/> 
                    </View>
                </ScrollView>
            </ImageBackground>    
                
             
        </>
    }
}