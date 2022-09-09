import React, { Component } from 'react'
import { ScrollView, View, Text, TextInput, ImageBackground, Alert } from 'react-native'
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
            peopleIcon: "people",
            eyeIcon: "visibility",
            Esenha: true,
            usuarioCadastrado: false,
            SenhaInvalida: false,
            Preenchido: false,
        }
    }

    componentDidMount(){
        this.buscaDados();
    }

    async buscaDados() {
        try {
            const response = await api.get("/login");
            if (response.data.length) {         
                this.setState({dados: response.data}) 
            }
        } catch (error) {
            console.log(error)
        }
    }

    async EnviaDados() {
        try {
            const response = await api.post("/enviarlogin", {
                LOGIN: this.state.valueLogin,
                SENHA: this.state.valueSenha,
                NOME: this.state.valueNome,
                TIPO: this.props.route.params.TIPO
            });
            if (response.status == 200) {
                Alert.alert('Cadastro Concluído')
                this.props.navigation.goBack()
            }

        } catch (error) {
            console.log(error)
        }
    }

    Campos() {
        this.setState({Preenchido: false})

        if ((this.state.valueNome == '') ||
           (this.state.valueLogin == '') ||
           (this.state.valueSenha == '') ||
           (this.state.valueSenha2 == '')) 
        {
            this.setState({Preenchido: true})
        }
    }


    ExecutarCadastro = () => {
        this.buscaDados()
        this.Campos()
        
        if (this.state.dados && !((this.state.valueNome == '') ||
                                 (this.state.valueLogin == '') ||
                                 (this.state.valueSenha == '') ||
                                 (this.state.valueSenha2 == ''))) 
        {            
            try {
                this.setState({usuarioCadastrado: false})
                
                for (let i = 0; i < this.state.dados.length; i++) {
                    if (this.state.valueLogin.toUpperCase() == this.state.dados[i].LOGIN)
                    {
                        this.setState({usuarioCadastrado: true})
                    }
                }
                this.setState({SenhaInvalida: this.state.valueSenha != this.state.valueSenha2})

                if ((!this.state.Preenchido) && (!this.state.usuarioCadastrado) && (!this.state.SenhaInvalida))
                {
                    this.EnviaDados()
                }
            } catch (error) {
                console.log(error)
            }
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
                                    />     
                                </View>  
                                <View style={{paddingBottom: 20}}/>
                                <View style={styles.entradas}>
                                    <TextInput 
                                        style={styles.login}
                                        placeholder="Login"
                                        color='white'
                                        onChangeText={text => this.setState({valueLogin: text})}
                                        value={this.state.valueLogin}
                                        placeholderTextColor='white'
                                    />     
                                </View> 
                                <View>
                                    {this.state.usuarioCadastrado ? (
                                        <Text style={styles.senhaInvalida}>
                                            Usuário Já cadastrado
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
                                    /> 
                                    <Icon
                                        style={styles.icon}
                                        name={this.state.eyeIcon}
                                        size={33}
                                        color="white"
                                        onPress={changePwdType}
                                    /> 
                                </View> 
                                <View>
                                    {this.state.Preenchido ? (
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
                                        titulo='Cadastrar'
                                        height={70}
                                        width='100%'
                                        borderWidth={1}
                                        onClick={() => this.ExecutarCadastro()}
                                    />    
                                </View>   
                                <View style={{paddingTop: 40}}>  
                                    <BotaoCentral 
                                        titulo='Voltar'
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