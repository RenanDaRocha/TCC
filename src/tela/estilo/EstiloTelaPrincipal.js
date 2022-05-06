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
        backgroundColor: Constantes.corBloco,
        borderRadius: 10,
        width: '90%',
    },
    botaoCentro: {
        flexDirection: 'row', 
        paddingTop: 20,
    },
    hoje: {
        paddingLeft: 10,
        paddingTop: 10,
        fontSize: 46,
        color: Constantes.corDaFonte,
    },
    data: {
        paddingLeft: 10,
        fontSize: 24,
        color: Constantes.corDaFonte,
    },
    ultimoAcerto: {
        paddingLeft: 10,
        paddingTop: 5,
        fontSize: 15,
        color: Constantes.corDaFonte,
    },
    codigosResolvidos: {
        paddingLeft: 10,
        paddingTop: 5,
        fontSize: 18,
        color: Constantes.corDaFonte,
        fontWeight: 'bold',
    },
    stretch: {
        position: 'absolute', 
        width: 80,
        height: 80,
        right: 5,
        top: 10,
    },
    resolvidos: {
        flex: 1, 
        padding: 10,
        flexDirection: 'row',
        alignItems:'center',
    }
})