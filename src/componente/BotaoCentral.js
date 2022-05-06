import React from 'react'
import { Text, TouchableOpacity } from 'react-native'

import Constantes from '../constantes'


export default props => {
    return (
        <TouchableOpacity 
            onPress={() => props.onClick()}
            activeOpacity={0.8}
            style={{  
                height: props.height || 80, 
                width: props.width || '90%',
                backgroundColor: props.backgroundColor || Constantes.corBloco,
                borderRadius: props.borderRadius || 5, 
                alignItems: props.alignItems || 'center', 
                alignContent: props.alignContent || 'center', 
                justifyContent: props.justifyContent ||'center',
                borderWidth: props.borderWidth || 0,
                borderColor: props.borderColor || 'white',
                padding: props.padding || 0,
            }} 
        >
            <Text 
                style={{  
                    color: props.corFonte || Constantes.corDaFonte,
                    fontSize: props.TamFonte || 32,
                    textAlign: props.textAlign || 'center',  
                }} 
            >
                {props.titulo}    
            </Text>    
               
        </TouchableOpacity>
    )    
}