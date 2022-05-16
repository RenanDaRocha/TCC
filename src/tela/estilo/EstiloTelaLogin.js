import { StyleSheet } from 'react-native'
import constantes from '../../constantes'

export default StyleSheet.create({
    imagemFundo: {
        width: '100%',
        height: '100%'
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    logo: {
        height: '10%',
    },
    corpo: {
        flex: 2,
        flexDirection: 'row',
        padding: 30,        
    },
    stretch: {      
        width: 300,
        borderRadius: 50,
    },
    entradas: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        borderWidth: 1,
        borderColor: 'white',
        borderRadius: 5,
        backgroundColor: constantes.corDeFundo,
    },
    login: {
        height: 40, 
        width: 250, 
        fontSize: 24,
    },
    icon: {
        paddingTop: 3,
    },
    senhaInvalida: {
        paddingTop: 10,
        color: 'red',
        fontSize: 16,
    },
    cadastrar: {
        paddingTop: 20,
        alignItems: 'flex-end'
    },
})