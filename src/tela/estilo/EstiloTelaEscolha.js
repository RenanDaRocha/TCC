import { StyleSheet } from 'react-native'

import Constantes from '../../constantes'

export default StyleSheet.create({
    telaTotal: {
        flex: 1,
        backgroundColor: Constantes.corDeFundo,
        alignItems: 'center',
        paddingTop: 20,
    },
    informacoes: {
        paddingBottom: 20,
        borderRadius: 10,
        width: '90%',
    },
    codigo: {
        backgroundColor: 'white',
        borderColor: 'black',
        borderWidth: 1,
        borderStyle: 'dotted'
    },
    botoes: {
        flexDirection: 'row',
        width: '90%',
    },
    botao: {
        flexDirection: 'row',
        width: '50%',
    },
    relatorio: {
        paddingBottom: 20,
        borderRadius: 10,
        width: '90%',
        backgroundColor: 'white',
    },
    dados: {
        flexDirection: 'row', 
        justifyContent: 'space-between',
        paddingBottom: 3,
    },
    texto: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    informacoes: {
        padding: 10,
        paddingBottom: 20,
        backgroundColor: Constantes.corBloco,
        borderRadius: 10,
        width: '90%',
    },
    data: {
        paddingLeft: 10,
        fontSize: 24,
        color: Constantes.corDaFonte,
    },
})