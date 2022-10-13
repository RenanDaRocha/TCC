import React, { Component } from 'react'
import { View, Text, ImageBackground, ScrollView, TextInput, Alert, ActivityIndicator } from 'react-native'

import styles from './estilo/EstiloTelaCodigo'
import BotaoCentral from '../componente/BotaoCentral'
import api from '../servico/api'
import constantes from '../constantes'
import { DataHoje } from '../funcoes'

const imgFundo='../../assets/background.png'

export default class TelaLogin extends Component {

    constructor(props){
        super(props);
        this.id = this.props.route.params.dados.ID
        this.descricao = this.props.route.params.dados.DESCRICAO,
        this.trecho1 = this.props.route.params.dados.TRECHO
        this.trecho2 = this.props.route.params.dados.TRECHO2
        this.resposta = this.props.route.params.dados.RESPOSTA
        this.retorno = ''

        this.state = {
            resposta: '',
            Carregando: false,
        }
    }

    

    async buscaDados() {
        this.setState({Carregando: true})
        try {
            const response = await api.post("/executar", {
                CODIGO: this.trecho1+'\n'+this.state.resposta+'\n'+this.trecho2,
                RESPOSTA: this.resposta,
                ID_USUARIO: constantes.Usuario.ID,
            });

            console.log(response.data)
             
            if (response.data == 'V') {
                Alert.alert('Código Correto!')
                await api.post("/enviarconcluido", {
                    ID_USUARIO: constantes.Usuario.ID,
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
        this.setState({Carregando: false})
    }
    Enviar(){
        if (!this.state.Carregando) {
            this.buscaDados()       
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

                        <View style={styles.informacoes}>
                            <Text style={styles.tab}>
                                Obs: indentação igual a 4 espaços
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

                        <View>
                            {this.state.Carregando ? (
                                <View style={[styles.container, styles.horizontal]}>
                                    <ActivityIndicator  size="large" color="#0000ff" />
                                </View>   
                            ) : null}   
                        </View> 
                        
                        <View style={{paddingTop: 30}}/> 
                    </View>
                </ScrollView>
            </ImageBackground>    
                
             
        </>
    }
}