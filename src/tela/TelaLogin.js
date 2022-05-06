import React, { Component } from 'react'
import { ScrollView, View, Text, Image, TextInput, ImageBackground } from 'react-native'
import Icon from "react-native-vector-icons/MaterialIcons"

import styles from './estilo/EstiloTelaLogin'
import BotaoCentral from '../componente/BotaoCentral'

const imgFundo='../../assets/background.png'

export default class TelaLogin extends Component {

    constructor(props){
        super(props);

        this.state = {
            dados: null,
            valueLogin: '',
            valueSenha: '',
            peopleIcon: "people",
            eyeIcon: "visibility",
            Esenha: true,
            SenhaInvalida: false,
        }
    }

    render(){

        const changePwdType = () => {
            this.setState({eyeIcon: this.state.eyeIcon === "visibility" ? "visibility-off": "visibility"}) 
            this.setState({Esenha: !this.state.Esenha}) 
        };  

        const ExecutarLogin = () => {
            
            this.props.navigation.navigate("TelaPrincipal")
            /*if (this.state.dados) {
                try {
                    this.props.navigation.navigate("TelaPrincipal")
                } catch (error) {
                    console.log(error)
                }
            }    */   
        }

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
                                        placeholder="Login"
                                        onChangeText={text => this.setState({valueLogin: text})}
                                        value={this.state.valueLogin}
                                        placeholderTextColor='white'
                                    /> 
                                    <Icon
                                        style={styles.icon}
                                        name={this.state.peopleIcon}
                                        size={33}
                                        color="white"
                                    />       
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
                                <View>
                                    {this.state.SenhaInvalida ? (
                                        <Text style={styles.senhaInvalida}>
                                            Usuário ou senha inválido
                                        </Text>    
                                    ) : null}   
                                </View>
                                <View style={{paddingTop: 40}}>  
                                    <BotaoCentral 
                                        titulo='Entrar'
                                        height={70}
                                        width='100%'
                                        borderWidth={1}
                                        onClick={() => ExecutarLogin()}
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