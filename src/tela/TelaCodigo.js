import React, { Component } from 'react'
import { View, Text, ImageBackground, ScrollView, TextInput, Alert } from 'react-native'

import styles from './estilo/EstiloTelaCodigo'
import BotaoCentral from '../componente/BotaoCentral'
import api from '../servico/api'
import constantes from '../constantes'
import { DataHoje } from '../funcoes'

const imgFundo='../../assets/background.png'

export default class TelaLogin extends Component {

    constructor(props){
        super(props);
        this.id = this.props.route.params.id
        this.descricao = this.props.route.params.descricao
        this.trecho1 = this.props.route.params.trecho1
        this.trecho2 = this.props.route.params.trecho2
        this.resposta = this.props.route.params.resposta
        this.retorno = ''

        this.state = {
            resposta: '',
        }
    }

    

    async buscaDados() {

        try {
            const response = await api.post("/executar", {
                CODIGO: this.trecho1+'\n'+this.state.resposta+'\n'+this.trecho2,
                RESPOSTA: this.resposta
            });

            console.log(response.data)
             
            if (response.data == 'C') {
                Alert.alert('Código Correto!')
                await api.post("/enviarconcluido", {
                    ID_USUARIO: constantes.id,
                    ID_CODIGO: this.id,
                    DATA: DataHoje(2)
                });
                this.props.navigation.navigate("TelaPrincipal")
            } else {
                Alert.alert('Código Incorreto!')
            }
        } catch (error) {
            console.log(error)
        }
    }

    Enviar(){
        this.buscaDados()   
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
                            <Text>
                                {this.descricao}
                            </Text>                             
                        </View>

                        <View style={{borderBottomWidth: 0, paddingTop: 20}} />

                        <View style={styles.informacoes}>
                            <Text>
                                {this.trecho1}
                            </Text>
                            <View style={styles.codigo}>
                                <TextInput
                                    multiline={true}
                                    onChangeText={text => this.setState({resposta: text})}
                                    value={this.state.resposta}
                                />    
                            </View>   
                            <Text>
                                {this.trecho2}
                            </Text>     
                        </View>

                        <View style={{borderBottomWidth: 0, paddingTop: 20}} />

                        <View style={styles.botoes}>
                            <BotaoCentral 
                                style={{flex: 1}}
                                titulo="Enviar"
                                height= {50}
                                width= {'47%'}
                                onClick={() => this.Enviar()} 
                            />    
                            <View 
                                style={{width: '6%'}}
                            />
                        
                            <BotaoCentral
                                style={{flex: 1}}
                                titulo="Cancelar"
                                height= {50} 
                                width= {'47%'}  
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