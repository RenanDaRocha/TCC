import React, { Component } from 'react'
import { View, Text, ImageBackground, ScrollView, TextInput } from 'react-native'

import styles from './estilo/EstiloTelaCodigo'
import BotaoCentral from '../componente/BotaoCentral'

const imgFundo='../../assets/background.png'

export default class TelaLogin extends Component {

    constructor(props){
        super(props);
        this.id = this.props.route.params.ID
        this.descricao = this.props.route.params.descricao
        this.trecho1 = this.props.route.params.trecho1
        this.trecho2 = this.props.route.params.trecho2
    }

    Enviar(){

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