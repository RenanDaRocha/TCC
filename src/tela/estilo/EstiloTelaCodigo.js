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
        backgroundColor: 'white',
        borderRadius: 10,
        width: '90%',
    },
    botoes: {
        flexDirection: 'row',
        paddingLeft: 20,
    }
})