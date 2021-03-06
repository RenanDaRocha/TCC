import { StatusBar } from 'expo-status-bar'
import React, { Component } from 'react'
import { View, Text, StyleSheet, ImageBackground, ScrollView, Image } from 'react-native'

import styles from './estilo/EstiloTelaPrincipal'
import BotaoCentral from '../componente/BotaoCentral'
import { DataHoje } from '../funcoes'
import constantes from '../constantes'
import api from '../servico/api'

const imgFundo='../../assets/background.png'

export default class TelaLogin extends Component {

    constructor(props){
        super(props);

        this.state = {
            total: '',
            totalCon: '',
            total1: '',
            total1Con: '',
            total2: '',
            total2Con: '',
            total3: '',
            total3Con: '',
            data: '',
        }
    }
    
    componentDidMount(){
        this.buscaDados();
    }

    async buscaDados() {
        try {
            const response = await api.get("/concluido/"+constantes.id);
            console.log(response.data)
            if (response.data) {         
                this.setState({
                    total: response.data[0].CADTOTAL,
                    totalCon: response.data[0].CADTOTALRESOL,
                    total1: response.data[0].CADTOTAL1,
                    total1Con: response.data[0].CADTOTAL1RESOL,
                    total2: response.data[0].CADTOTAL2,
                    total2Con: response.data[0].CADTOTAL2RESOL,
                    total3: response.data[0].CADTOTAL3,
                    total3Con: response.data[0].CADTOTAL3RESOL,
                    data: response.data[0].ULTIMO,
                }) 
            }
        } catch (error) {
            console.log(error)
        }
    }

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
                                ??ltimo Acerto: {this.state.data ? DataHoje(1,0,this.state.data) : 'Nenhum realizado'} 
                            </Text>
                            <Text style={styles.codigosResolvidos}>
                                C??digos resolvidos Totais: {this.state.totalCon}
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
                                            {this.state.total1Con} de {this.state.total1}
                                        </Text>
                                    </View>
                                    <View style={styles.resolvidos}>
                                        <Text style={styles.codigosResolvidos}>
                                            {this.state.total2Con} de {this.state.total2}
                                        </Text>
                                    </View>
                                    <View style={styles.resolvidos}>
                                        <Text style={styles.codigosResolvidos}>
                                            {this.state.total3Con} de {this.state.total3}
                                        </Text>
                                    </View>
                                </View>
                                <View style={{flex: 2}}>
                                    <View style={{padding: 10}}>
                                        <BotaoCentral 
                                            titulo="F??cil"
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
                                            titulo="M??dio"
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
                                            titulo="Dif??cil"
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