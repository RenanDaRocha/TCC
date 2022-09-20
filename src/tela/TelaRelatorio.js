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
            const response = await api.get("/concluidoaluno/"+this.props.route.params.id+"/"+constantes.id);
            
            if (response.data.length) {         
                this.setState({dados: response.data}) 
            }
        } catch (error) {
            console.log(error)
        }
        this.setState({Carregando: false})
    }

    valores(dados, key){
        return(
            <View key={key}>
                <View style={styles.dados}>
                    <View style={{flex: 2, paddingLeft: 15}}>
                        <Text>
                            {dados.NOME}
                        </Text>    
                    </View>
                    <View style={{flex: 1, paddingRight: 15, alignItems: 'flex-end'}}>
                        <Text>
                            {DataHoje(1,0,dados.DATA)}
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
                                        Aluno:
                                    </Text>    
                                </View>
                                <View style={{flex: 1, paddingRight: 15, alignItems: 'flex-end'}}>
                                    <Text style={styles.texto}>
                                        Concluido:
                                    </Text>    
                                </View>
                            </View> 
                            <View style={{borderBottomWidth: 0, paddingTop: 30}} />
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