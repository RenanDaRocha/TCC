import React, { Component } from 'react'
import { View, Text, ImageBackground, ScrollView, TextInput, Alert, ActivityIndicator } from 'react-native'
import Icon from "react-native-vector-icons/MaterialIcons"

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
        this.tempo1 = this.props.route.params.dados.TEMPO1
        this.tempo2 = this.props.route.params.dados.TEMPO2
        this.tempo3 = this.props.route.params.dados.TEMPO3
        this.retorno = ''
        this.ponto = 0

        this.state = {
            resposta: '',
            Carregando: false,
            segundo: 0,
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
             
            if (response.data == 'V') {
                this.AlertaSucesso(true);
                console.log('foi')
                await api.post("/enviarconcluido", {
                    ID_USUARIO: constantes.Usuario.ID,
                    ID_CODIGO: this.id,
                    DATA: DataHoje(2),
                    PONTO: this.ponto
                });
                this.props.navigation.navigate("TelaPrincipal")
            } else {
                this.AlertaSucesso(false);
            }
        } catch (error) {
            console.log(error)
        }
        this.setState({Carregando: false})
    }

    AlertaSucesso(sucesso) {
        if (sucesso) {
            if (this.state.segundo <= this.tempo1) {
                this.ponto = 3
                Alert.alert('Código Correto!', 'Você respondeu em até '+this.Tempo(this.tempo1)+ ' e ganhou '+ 3 +' pontos!')
            } else if (this.state.segundo <= this.tempo2) {
                this.ponto = 2
                Alert.alert('Código Correto!', 'Você respondeu em até '+this.Tempo(this.tempo2)+ ' e ganhou '+ 2 +' pontos!')
            } else if (this.state.segundo <= this.tempo3) {
                this.ponto = 1
                Alert.alert('Código Correto!', 'Você respondeu em até '+this.Tempo(this.tempo3)+ ' e ganhou '+ 1 +' pontos!')
            } else {
                Alert.alert('Código Correto!', 'Você respondeu em mais de '+this.Tempo(this.tempo3)+ ' e não ganhou pontos!')
            }

        } else {
            Alert.alert('Código Incorreto!', 'O código não retorna o resultado esperado!')
        }           
    }

    Enviar(){
        if (!this.state.Carregando) {
            this.buscaDados()       
        }   
    }
    
    componentDidMount(){
        this.Iniciar();
    }

    Iniciar = () => {
        const intervalo = setInterval(() => this.setState({ segundo: this.state.segundo+1}), 1000)
    };

    Tempo(tempo){
        const minuto = Math.floor(tempo/60)
        const segundo = tempo % 60
        return ((minuto < 10 ? '0'+minuto: minuto)+':'+(segundo < 10 ? '0'+segundo: segundo))
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
                                {'Tempo: '+this.Tempo(this.state.segundo)}
                                {/*this.state.minuto < 10 ? '0'+this.state.minuto : this.state.minuto*/}
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