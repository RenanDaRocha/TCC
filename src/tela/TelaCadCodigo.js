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

        this.state = {
            resposta: '',
            titulo: '',
            descricao: '',
            trecho1: '',
            trecho2: '',
            resposta: '',
            dificuldade: '',
        }
    }

    

    async buscaDados() {

        try {
            const response = await api.post("/enviarcodigos", {
                TITULO: this.state.titulo,
                DESCRICAO: this.state.descricao,
                RESPOSTA: this.state.resposta,
                DIFICULDADE: this.state.dificuldade,
                TRECHO1: this.state.trecho1,
                TRECHO2: this.state.trecho2,
                USUARIO: constantes.id
            });
            if (response.status == 200) {
                Alert.alert('Cadastro Concluído')
                this.props.navigation.goBack()
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
                                Título do Problema
                            </Text>
                            <View style={styles.codigo}>
                                <TextInput
                                    multiline={true}
                                    onChangeText={text => this.setState({titulo: text})}
                                    value={this.state.titulo}
                                />    
                            </View> 

                            <View style={{borderBottomWidth: 0, paddingTop: 20}} />

                            <Text>
                                Descrição do Problema
                            </Text>
                            <View style={styles.codigo}>
                                <TextInput
                                    multiline={true}
                                    onChangeText={text => this.setState({descricao: text})}
                                    value={this.state.descricao}
                                />    
                            </View> 

                            <View style={{borderBottomWidth: 0, paddingTop: 20}} />

                            <Text>
                                Pré-Código
                            </Text>
                            <View style={styles.codigo}>
                                <TextInput
                                    multiline={true}
                                    onChangeText={text => this.setState({trecho1: text})}
                                    value={this.state.trecho1}
                                />    
                            </View>     

                            <View style={{borderBottomWidth: 0, paddingTop: 20}} />

                            <Text>
                                Pós-Código
                            </Text>
                            <View style={styles.codigo}>
                                <TextInput
                                    multiline={true}
                                    onChangeText={text => this.setState({trecho2: text})}
                                    value={this.state.trecho2}
                                />    
                            </View> 

                            <View style={{borderBottomWidth: 0, paddingTop: 20}} />

                            <Text>
                                Resposta Esperada
                            </Text>
                            <View style={styles.codigo}>
                                <TextInput
                                    multiline={true}
                                    onChangeText={text => this.setState({resposta: text})}
                                    value={this.state.resposta}
                                />    
                            </View> 

                            <View style={{borderBottomWidth: 0, paddingTop: 20}} />

                            <Text>
                                Dificuldade
                            </Text>
                            <View style={styles.codigo}>
                                <TextInput
                                    multiline={true}
                                    onChangeText={text => this.setState({dificuldade: text})}
                                    value={this.state.dificuldade}
                                />    
                            </View> 
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