import { View, Text } from 'react-native'
import { Header } from '@/src/components/Header'
import { styles } from './organizarPartidasStyles'
import { useRouter } from 'expo-router'

export default function organizarPartidas(){
    const router = useRouter();
    const voltar = () => {
        router.back();
    }

    return(
       <View style={styles.container}>
             <Header 
               title="ORGANIZAR PARTIDAS" 
               iconName="bell" 
               showLogo={false}
               icon='arrow-left'
               onPressIcon={voltar}
             />
           </View>
    )
}