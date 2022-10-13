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

        this.state = {
            titulo: '',
            descricao: '',
            trecho1: '',
            trecho2: '',
            resposta: '',
            dificuldade: 1,
            dificuldadeNome: 'Fácil',
            NomeBotao: 'Cadastrar',
            Carregando: false,
        }
    }

    componentDidMount(){
        if (!!this.props.route.params.edicao) {
            this.ModoEdicao()
        }
    }

    ModoEdicao() {
        console.log(this.props.route.params.dados)
        this.setState({
            titulo: this.props.route.params.dados.TITULO,
            descricao: this.props.route.params.dados.DESCRICAO,
            trecho1: this.props.route.params.dados.TRECHO,
            trecho2: this.props.route.params.dados.TRECHO2,
            resposta: this.props.route.params.dados.RESPOSTA,
            dificuldade: this.props.route.params.dados.DIFICULDADE,
            NomeBotao: 'Alterar'
        })
    }

    async buscaDados() {
        this.setState({Carregando: true})
        try {
            const response = await api.post("/enviarcodigos", {
                TITULO: this.state.titulo,
                DESCRICAO: this.state.descricao,
                RESPOSTA: this.state.resposta,
                DIFICULDADE: this.state.dificuldade,
                TRECHO1: this.state.trecho1,
                TRECHO2: this.state.trecho2,
                USUARIO: constantes.Usuario.ID
            });
            if (response.status == 200) {
                Alert.alert('Cadastro Concluído')
                this.props.navigation.goBack()
            }
        } catch (error) {
            console.log(error)
        }
        this.setState({Carregando: false})
    }

    Enviar(){
        if (!this.state.Carregando){
            this.buscaDados()   
        }
    }

    Dificuldade(){
        if (this.state.dificuldade == 1) {
            this.setState({
                dificuldade: 2,
                dificuldadeNome: 'Médio'
            })
        } else if (this.state.dificuldade == 2) {
            this.setState({
                dificuldade: 3,
                dificuldadeNome: 'Difícil'
            })
        } else {
            this.setState({
                dificuldade: 1,
                dificuldadeNome: 'Fácil'
            })
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
                                Título do Problema:
                            </Text>
                            <View style={styles.caixa}>
                                <TextInput
                                    multiline={true}
                                    onChangeText={text => 
                                        {if (!this.props.route.params.edicao) {
                                            this.setState({titulo: text})
                                        }}
                                    }
                                    value={this.state.titulo}
                                />    
                            </View> 

                            <View style={{borderBottomWidth: 0, paddingTop: 10}} />

                            <Text>
                                Descrição do Problema:
                            </Text>
                            <View style={styles.caixa}>
                                <TextInput
                                    multiline={true}
                                    onChangeText={text => this.setState({descricao: text})}
                                    value={this.state.descricao}
                                />    
                            </View> 

                            <View style={{borderBottomWidth: 0, paddingTop: 10}} />

                            <Text>
                                Resposta Esperada:
                            </Text>
                            <View style={styles.caixa}>
                                <TextInput
                                    multiline={true}
                                    onChangeText={text => this.setState({resposta: text})}
                                    value={this.state.resposta}
                                />    
                            </View>

                            <View style={{borderBottomWidth: 0, paddingTop: 30}} />

                            <View style={styles.texto}>
                                <Text>
                                    def main():
                                </Text>
                                <View style={styles.codigo}>
                                    <TextInput
                                        multiline={true}
                                        onChangeText={text => this.setState({trecho1: text})}
                                        value={this.state.trecho1}
                                    />    
                                </View>     

                                <Text style={{fontWeight: 'bold'}}>
                                    {"    {Código do Aluno}"}
                                </Text>

                                <View style={styles.codigo}>
                                    <TextInput
                                        multiline={true}
                                        onChangeText={text => this.setState({trecho2: text})}
                                        value={this.state.trecho2}
                                    />    
                                </View> 
                                <Text>
                                    {"    return(Resultado)"}
                                </Text>
                            </View>
                            
                            <Text>
                                Obs: indentação igual a 4 espaços
                            </Text>

                            <View style={{borderBottomWidth: 0, paddingTop: 10}} />

                            <Text>
                                Dificuldade:
                            </Text>
                            <View style={styles.caixa}>
                                <BotaoCentral 
                                    style={{flex: 1}}
                                    backgroundColor={'white'}
                                    corFonte={constantes.corBloco}
                                    titulo= {this.state.dificuldadeNome}
                                    height= {45}
                                    width= {'100%'}
                                    onClick={() => this.Dificuldade()} 
                                />    
                            </View>  
                        </View>

                        <View style={{borderBottomWidth: 0, paddingTop: 20}} />

                        <View style={styles.botoes}>
                            <BotaoCentral 
                                style={{flex: 1}}
                                titulo={this.state.NomeBotao}
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