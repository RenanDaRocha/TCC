import React, { Component } from 'react'
import { View, Text, ImageBackground, ScrollView, ActivityIndicator } from 'react-native'

import styles from './estilo/EstiloTelaEscolha'
import BotaoCentral from '../componente/BotaoCentral'
import constantes from '../constantes'

const imgFundo='../../assets/background.png'

export default class TelaLogin extends Component {

    constructor(props){
        super(props);

        this.state = {
            dados: null,
            Carregando: false,
        }
    }

    navegarPara = (Dificuldade) => {
        this.props.navigation.navigate("TelaRanking", {
            Tela: this.props.route.params.Tela,
            Dificuldade: Dificuldade,
        }) 
    }

    render(){
        
        return <>
            <ImageBackground
                source={require(imgFundo)}
                style={{width: '100%', height: '100%'}}
            >
                <ScrollView>
                    <View style={styles.telaTotal}>

                        <View>
                            {this.state.Carregando ? (
                                <View style={[styles.container, styles.horizontal]}>
                                    <ActivityIndicator  size="large" color="#0000ff" />
                                </View>   
                            ) : null}   
                        </View>
                        
                        <View style={styles.informacoes}>
                            <View style={{alignItems:'center', paddingBottom: 30}}>
                                <Text style={styles.data}>
                                    Ranking
                                </Text>    
                            </View> 

                            <View style={{flexDirection: 'column', flex: 1, paddingLeft: '8%'}}>
                                <BotaoCentral 
                                    titulo="Geral"
                                    backgroundColor='white'
                                    height={60}
                                    corFonte={constantes.corBloco}
                                    TamFonte={24}
                                    onClick={() => this.navegarPara(0)}
                                />  
                            </View>    

                            <View style={{borderBottomWidth: 0, paddingTop: 30}} />

                            <View style={{flexDirection: 'column', flex: 1, paddingLeft: '8%'}}>
                                <BotaoCentral 
                                    titulo="Fácil"
                                    backgroundColor='white'
                                    height={60}
                                    corFonte={constantes.corBloco}
                                    TamFonte={24}
                                    onClick={() => this.navegarPara(1)}
                                />  
                            </View>     

                            <View style={{borderBottomWidth: 0, paddingTop: 20}} />

                            <View style={{flexDirection: 'column', flex: 1, paddingLeft: '8%'}}>
                                <BotaoCentral 
                                    titulo="Médio"
                                    backgroundColor='white'
                                    height={60}
                                    corFonte={constantes.corBloco}
                                    TamFonte={24}
                                    onClick={() => this.navegarPara(2)}
                                />  
                            </View>     

                            <View style={{borderBottomWidth: 0, paddingTop: 20}} />

                            <View style={{flexDirection: 'column', flex: 1, paddingLeft: '8%'}}>
                                <BotaoCentral 
                                    titulo="Difícil"
                                    backgroundColor='white'
                                    height={60}
                                    corFonte={constantes.corBloco}
                                    TamFonte={24}
                                    onClick={() => this.navegarPara(3)}
                                />  
                            </View>                              
                        </View>  

                        <View style={{borderBottomWidth: 0, paddingTop: 30}} />

                        <View style={styles.botoes}>                         
                           <BotaoCentral
                                titulo="Voltar"
                                height= {50}   
                                width= {'100%'}
                                onClick={() => this.props.navigation.goBack()}                   
                            />     
                        </View>  

                        <View style={{paddingTop: 30}}/> 
                    </View>
                </ScrollView>
            </ImageBackground>    
                
             
        </>
    }
}