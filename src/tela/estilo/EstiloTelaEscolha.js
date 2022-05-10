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
    }
})