import React, { Component } from 'react'
import { View, ImageBackground, ScrollView, ActivityIndicator, Text } from 'react-native'

import styles from './estilo/EstiloTelaEscolha'
import BotaoCentral from '../componente/BotaoCentral'
import api from '../servico/api'
import constantes from '../constantes'
import { DataHoje } from '../funcoes'

const imgFundo='../../assets/background.png'

export default class TelaLogin extends Component {

    constructor(props){
        super(props);
        this.Dificuldade = this.props.route.params.Dificuldade
        this.Tela = this.props.route.params.Tela

        this.state = {
            dados: null,
            Carregando: false,
        }
    }

    componentDidMount(){
        this.buscaDados();
    }

    async buscaDados() {
        this.setState({Carregando: true})
        try {
            var response = null

            if (this.Tela == 1) {
                response = await api.get("/concluidoranking");
            } else if (this.Tela == 2) {
                response = await api.get("/concluidorankingponto");
            }       
            
            if (response.data.length) {         
                this.setState({dados: response.data}) 
            }
        } catch (error) {
            console.log(error)
        }
        this.setState({Carregando: false})
    }

    valores(dados, key){
        let quantidade
        if (this.Dificuldade == 0) {
            quantidade = dados.TOTAL 
        } else if (this.Dificuldade == 1) {
            quantidade = dados.FACIL 
        } else if (this.Dificuldade == 2) {
            quantidade = dados.MEDIO 
        } if (this.Dificuldade == 3) {
            quantidade = dados.DIFICIL 
        } 
        return(
            <View key={key}>
                <View style={styles.dados}>
                    <View style={{flex: 2, paddingLeft: 15}}>
                        <Text>
                            {key+1+'  '+dados.NOME}
                        </Text>    
                    </View>
                    <View style={{flex: 1, paddingRight: 15, alignItems: 'flex-end'}}>
                        <Text>
                            {quantidade}
                        </Text>    
                    </View>
                </View>   
            </View>
        )
    }

    BotoesCodigo(){
        if (this.state.dados) {
            return(
                this.state.dados.map((x,i) => {
                    if ((this.Dificuldade == 0 && x.TOTAL > 0) 
                      ||(this.Dificuldade == 1 && x.FACIL > 0) 
                      ||(this.Dificuldade == 2 && x.MEDIO > 0) 
                      ||(this.Dificuldade == 3 && x.DIFICIL > 0)) {
                        return(this.valores(x, i))   
                    }              
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

                        <View>
                            {this.state.Carregando ? (
                                <View style={[styles.container, styles.horizontal]}>
                                    <ActivityIndicator  size="large" color="#0000ff" />
                                </View>   
                            ) : null}   
                        </View>
                        
                        <View style={(styles.relatorio)}>                      
                            <View style={{borderBottomWidth: 0, paddingTop: 10}} />
                            <View style={styles.dados}>
                                <View style={{flex: 2, paddingLeft: 15}}>
                                    <Text style={styles.texto}>
                                        Usuário
                                    </Text>    
                                </View>
                                <View style={{flex: 1, paddingRight: 15, alignItems: 'flex-end'}}>
                                    <Text style={styles.texto}>
                                        Quantidade
                                    </Text>    
                                </View>
                            </View> 
                            <View style={{borderBottomWidth: 0, paddingTop: 30}} />
                            {this.BotoesCodigo()}    
                        </View>  

                        <View style={{borderBottomWidth: 0, paddingTop: 30}} />

                        <View style={styles.botoes}>                         
                           <BotaoCentral
                                titulo="Voltar"
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