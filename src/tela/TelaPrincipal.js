import { StatusBar } from 'expo-status-bar'
import React, { Component } from 'react'
import { View, Text, StyleSheet, ImageBackground, ScrollView, Image } from 'react-native'

import styles from './estilo/EstiloTelaPrincipal'
import BotaoCentral from '../componente/BotaoCentral'
import { DataHoje } from '../funcoes'
import constantes from '../constantes'

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
                            <Text style={styles.hoje}>
                                {DataHoje(8)}
                            </Text>
                            <Image
                                style={styles.stretch}
                                resizeMode='contain'
                                source={require('../../assets/calendario.png')}
                            />
                            <Text style={styles.data}>                    
                                {DataHoje(4)} 
                            </Text>
                            <View style={{borderBottomWidth: 0, paddingTop: 20}} />
                            <Text style={styles.data}>                    
                                {constantes.usuario} 
                            </Text>
                            
                            <Text style={styles.ultimoAcerto}>
                                {'\n'}
                                Último Acerto: "Data" 
                            </Text>
                            <Text style={styles.codigosResolvidos}>
                                Códigos resolvidos Totais: 0
                            </Text>                               
                        </View>

                        <View style={{borderBottomWidth: 0, paddingTop: 20}} />

                        <View style={styles.informacoes}>
                            <View style={{alignItems:'center', paddingBottom: 30}}>
                                <Text style={styles.data}>
                                    Dificuldade
                                </Text>    
                            </View>                    
                            <View style={{flexDirection: 'row'}}>
                                <View style={{flex: 3}}>
                                    <View style={styles.resolvidos}>
                                        <Text style={styles.codigosResolvidos}>
                                            0 de 0
                                        </Text>
                                    </View>
                                    <View style={styles.resolvidos}>
                                        <Text style={styles.codigosResolvidos}>
                                            0 de 0
                                        </Text>
                                    </View>
                                    <View style={styles.resolvidos}>
                                        <Text style={styles.codigosResolvidos}>
                                            0 de 0
                                        </Text>
                                    </View>
                                </View>
                                <View style={{flex: 2}}>
                                    <View style={{padding: 10}}>
                                        <BotaoCentral 
                                            titulo="Fácil"
                                            backgroundColor='white'
                                            height={50}
                                            corFonte={constantes.corBloco}
                                            TamFonte={24}
                                            onClick={() => this.props.navigation.navigate("TelaEscolha", {
                                                dificuldade: 1
                                            })}
                                        />     
                                    </View>
                                    <View style={{padding: 10}}>
                                        <BotaoCentral 
                                            titulo="Médio"
                                            backgroundColor='white'
                                            height={50}
                                            corFonte={constantes.corBloco}
                                            TamFonte={24}
                                            onClick={() => this.props.navigation.navigate("TelaEscolha", {
                                                dificuldade: 2
                                            })}
                                        />     
                                    </View>
                                    <View style={{padding: 10}}>
                                        <BotaoCentral 
                                            titulo="Difícil"
                                            backgroundColor='white'
                                            height={50}
                                            corFonte={constantes.corBloco}
                                            TamFonte={24}
                                            onClick={() => this.props.navigation.navigate("TelaEscolha", {
                                                dificuldade: 3
                                            })}
                                        />     
                                    </View>  
                                </View>
                            </View>                               
                        </View>

                        <View style={{borderBottomWidth: 0, paddingTop: 20}} />
                        

                        <View style={{paddingTop: 30}}/> 
                    </View>
                </ScrollView>
            </ImageBackground>    
                
             
        </>
    }
}