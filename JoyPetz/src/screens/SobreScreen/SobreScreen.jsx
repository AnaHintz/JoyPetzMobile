import { View, Text } from 'react-native';
import { styles } from '../../config/Style';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Surface } from 'react-native-paper';

export default function SobreScreen({ navigation }) {
    return (
        <Surface style={styles.container}>
    <View style={styles.container}>
       
                    <Text style={styles.largeTitle} >Bem-vindo ao JoyPetz! </Text>
                    <Text >No JoyPetz, acreditamos que cada animal merece um lar cheio de amor e carinho. Nosso aplicativo foi criado com o objetivo de conectar animais que precisam de um lar com pessoas dispostas a oferecer um.</Text>
      
</View>
</Surface>
    )
}