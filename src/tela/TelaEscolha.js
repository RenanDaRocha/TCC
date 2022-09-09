import React, { Component } from 'react'
import { View, ImageBackground, ScrollView } from 'react-native'

import styles from './estilo/EstiloTelaEscolha'
import BotaoCentral from '../componente/BotaoCentral'
import api from '../servico/api'
import constantes from '../constantes'

const imgFundo='../../assets/background.png'

export default class TelaLogin extends Component {

    constructor(props){
        super(props);

        this.state = {
            dados: null
        }
    }

    componentDidMount(){
        this.buscaDados();
    }

    async buscaDados() {
        try {
            var response = null
            if (this.props.route.params.modo == 1) {
                response = await api.get("/codigos/"+this.props.route.params.dificuldade);
            } else {
                response = await api.get("/codigosusuario/"+constantes.id);
            }
            
            if (response.data.length) {         
                this.setState({dados: response.data}) 
            }
        } catch (error) {
            console.log(error)
        }
    }

    navegarPara = (dados) => {
        if (this.props.route.params.modo == 1) {
            this.props.navigation.navigate("TelaCodigo", {
                id: dados.ID,
                descricao: dados.DESCRICAO,
                trecho1: dados.TRECHO,
                trecho2: dados.TRECHO2,
                resposta: dados.RESPOSTA
            }) 
        }   
    }

    valores(dados, key){
        return(
            <View key={key}>
                <View style={{borderBottomWidth: 0, paddingTop: 20}} />
                <BotaoCentral
                    style={styles.botao}
                    titulo={dados.TITULO}
                    height= {50}
                    width= {'100%'}
                    backgroundColor = 'white'
                    corFonte = 'black'
                    borderWidth = {1}
                    borderColor = 'black'
                    alignItems = 'baseline'
                    TamFonte = {18}
                    onClick={() => this.navegarPara(dados)}
                />
            </View>
        )
    }

    BotoesCodigo(){
        if (this.state.dados) {
            return(
                this.state.dados.map((x,i) => {
                    return(this.valores(x, i))    
                })    
            )
                     
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
                            {this.BotoesCodigo()}    
                        </View>  

                        <View style={{borderBottomWidth: 0, paddingTop: 30}} />

                        <View style={styles.botoes}>                         
                           <BotaoCentral
                                titulo="Cancelar"
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