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
        padding: 10,
        paddingBottom: 20,
        borderWidth: 10,
        borderColor: Constantes.corBloco,
        backgroundColor: '#DDD',
        borderRadius: 10,
        width: '90%',
    },
    caixa: {
        backgroundColor: 'white',
        borderColor: 'black',
        borderWidth: 1,
        borderStyle: 'dotted'
    },
    botoes: {
        flexDirection: 'row',
        width: '90%',
    },
    tab: {
        paddingTop: 10,
        fontSize: 16,
    },
    texto: {
        backgroundColor: '#EEE',
        padding: 5,
        borderWidth: 1,
        borderStyle: 'dotted'
    },
    codigo: {
        backgroundColor: 'white',
        borderColor: 'black',
    }
})