import { Text, View } from "react-native";
import { Button } from "react-native-paper";


export default function LoginScreen({navigation}) {
    return(
        <View>
            <Text>Bom dia</Text>
            <Button onPress={() => navigation.navigate('Home')}>logar</Button>
        </View>
    )
}