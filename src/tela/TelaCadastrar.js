import React, { Component, useState, useEffect } from 'react'
import { ScrollView, View, Text, TextInput, ImageBackground, Alert, ActivityIndicator, Keyboard } from 'react-native'
import Icon from "react-native-vector-icons/MaterialIcons"

import styles from './estilo/EstiloTelaLogin'
import BotaoCentral from '../componente/BotaoCentral'
import constantes from '../constantes'
import api from '../servico/api'

const imgFundo='../../assets/background.png'

export default class TelaLogin extends Component {

    constructor(props){
        super(props);

        this.state = {
            dados: null,
            valueNome: '',
            valueLogin: '',
            valueSenha: '',
            valueSenha2: '',
            valueDisciplina: '',
            peopleIcon: "people",
            eyeIcon: "visibility",
            Esenha: true,
            usuarioCadastrado: false,
            SenhaInvalida: false,
            Preenchido: true,
            Carregando: false,
            EnterPressionado: 'N',
            NomeBotao: 'Cadastrar'
        }
    }

    componentDidMount(){
        if (!!this.props.route.params.edicao) {
            this.ModoEdicao()
        }
    }

    async buscaDados() {
        this.setState({Carregando: true})
        try {
            const response = await api.post("/login", {
                LOGIN: this.state.valueLogin,
            });            
            if (response.data.length) {         
                this.setState({usuarioCadastrado: true})
            } else {
                this.setState({usuarioCadastrado: false})
                this.EnviaDados()
            }
        } catch (error) {
            console.log(error)
        }
        this.setState({Carregando: false})
    }

    async EnviaDados() {
        try {
            const response = await api.post("/enviarusuario", {
                LOGIN: this.state.valueLogin,
                SENHA: this.state.valueSenha,
                NOME: this.state.valueNome,
                DISCIPLINA: this.state.valueDisciplina,
                NIVEL: this.props.route.params.NIVEL
            });
            if (response.status == 200) {
                if (!this.props.route.params.edicao) {
                    Alert.alert('Cadastro Concluído')
                } else {
                    Alert.alert('Alteração Efetuada')
                }
                
                this.props.navigation.goBack()
            }

        } catch (error) {
            console.log(error)
        }
    }

    ExecutarCadastro = () => {
        if (!this.state.Carregando && this.state.valueLogin != ''){
            try {         
                
                this.setState({SenhaInvalida: this.state.valueSenha != this.state.valueSenha2})

                if ((this.state.valueNome   == '') ||
                    (this.state.valueLogin  == '') ||
                    (this.state.valueSenha  == '') ||
                    (this.state.valueSenha2 == '')) 
                {
                    this.setState({Preenchido: false})
                } else {
                    this.setState({Preenchido: true})
                    if ((this.state.Preenchido) && (!this.state.SenhaInvalida)) {
                        this.buscaDados()
                    }
                }               
            } catch (error) {
                console.log(error)
            }
        }
    }

    ModoEdicao() {
        this.setState({
            valueNome: constantes.Usuario.NOME,
            valueLogin: constantes.Usuario.LOGIN,
            NomeBotao: 'Alterar'
        })

        if (this.props.route.params.NIVEL == 2) {
            this.setState({
                valueDisciplina: constantes.Usuario.DISCIPLINA,
            })
        }
    }

    render(){
        const changePwdType = () => {
            this.setState({eyeIcon: this.state.eyeIcon === "visibility" ? "visibility-off": "visibility"}) 
            this.setState({Esenha: !this.state.Esenha}) 
        };  

        return <>
            <ImageBackground
                source={require(imgFundo)}
                style={styles.imagemFundo}
            >
                <View style={styles.container}>
                    <View style={styles.logo}/>
                    <View style={styles.corpo}>
                        <ScrollView >
                            <View>
                                <View style={styles.entradas}>
                                    <TextInput 
                                        style={styles.login}
                                        color='white'
                                        placeholder="Nome"
                                        onChangeText={text => this.setState({valueNome: text})}
                                        value={this.state.valueNome}
                                        placeholderTextColor='white'
                                        onSubmitEditing={(i) => this.Verificacao()}
                                    />     
                                </View>  
                                <View style={{paddingBottom: 20}}/>
                                <View style={styles.entradas}>
                                    <TextInput 
                                        style={styles.login}
                                        placeholder="Login"
                                        color='white'
                                        onChangeText={text => 
                                            {if (!this.props.route.params.edicao) {
                                                this.setState({valueLogin: text })
                                            }}
                                        }
                                        value={this.state.valueLogin}
                                        placeholderTextColor='white'
                                        onSubmitEditing={(i) => this.Verificacao()}
                                    />     
                                </View> 
                                <View>
                                    {this.state.usuarioCadastrado ? (
                                        <Text style={styles.senhaInvalida}>
                                            Usuário Já Cadastrado
                                        </Text>    
                                    ) : null}   
                                </View>
                                <View style={{paddingBottom: 20}}/>
                                <View style={styles.entradas}>
                                    <TextInput 
                                        style={styles.login}
                                        placeholder="Senha"
                                        secureTextEntry={this.state.Esenha}
                                        onChangeText={text => this.setState({valueSenha: text})}
                                        value={this.state.valueSenha}
                                        color='white'
                                        placeholderTextColor='white'
                                        onSubmitEditing={(i) => this.Verificacao()}
                                    /> 
                                    <Icon
                                        style={styles.icon}
                                        name={this.state.eyeIcon}
                                        size={33}
                                        color="white"
                                        onPress={changePwdType}
                                    /> 
                                </View> 
                                <View style={{paddingBottom: 20}}/>
                                <View style={styles.entradas}>
                                    <TextInput 
                                        style={styles.login}
                                        placeholder="Repetir Senha"
                                        secureTextEntry={this.state.Esenha}
                                        onChangeText={text => this.setState({valueSenha2: text})}
                                        value={this.state.valueSenha2}
                                        color='white'
                                        placeholderTextColor='white'
                                        onSubmitEditing={(i) => this.Verificacao()}
                                    /> 
                                    <Icon
                                        style={styles.icon}
                                        name={this.state.eyeIcon}
                                        size={33}
                                        color="white"
                                        onPress={changePwdType}
                                    /> 
                                </View> 
                                <View style={{paddingBottom: 20}}/>
                                {this.props.route.params.NIVEL == 2? (
                                    <View style={styles.entradas}>
                                        <TextInput 
                                            style={styles.login}
                                            placeholder="Disciplina"
                                            color='white'
                                            onChangeText={text => this.setState({valueDisciplina: text})}
                                            value={this.state.valueDisciplina}
                                            placeholderTextColor='white'
                                            onSubmitEditing={(i) => this.Verificacao()}
                                        />     
                                    </View>     
                                ) : null}
                                
                                <View>
                                    {!this.state.Preenchido ? (
                                        <Text style={styles.senhaInvalida}>
                                            Campos não preenchidos
                                        </Text>    
                                    ) : null}   
                                </View>
                                <View>
                                    {this.state.SenhaInvalida ? (
                                        <Text style={styles.senhaInvalida}>
                                            As senhas não batem
                                        </Text>    
                                    ) : null}   
                                </View>
                                <View style={{paddingTop: 40}}>  
                                    <BotaoCentral 
                                        titulo={this.state.NomeBotao}
                                        height={70}
                                        width='100%'
                                        borderWidth={1}
                                        onClick={() => this.ExecutarCadastro()}
                                    />    
                                </View>   
                                <View>
                                    {this.state.Carregando ? (
                                        <View style={[styles.container, styles.horizontal]}>
                                            <ActivityIndicator  size="large" color="#0000ff" />
                                        </View>   
                                    ) : null}   
                                </View>
                                <View style={{paddingTop: 40}}>  
                                    <BotaoCentral 
                                        titulo='Cancelar'
                                        height={50}
                                        width='100%'
                                        borderWidth={1}
                                        onClick={() => this.props.navigation.goBack()}
                                    />    
                                </View>                               
                            </View>    
                        </ScrollView>       
                    </View>            
                </View>
            </ImageBackground>
        </>
    }
}