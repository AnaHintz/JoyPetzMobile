import {styles} from '../../config/Style'
import { Button, Surface, Text } from "react-native-paper";
import { useTheme } from '../../contexts/ThemeContext';


export default function SettingsScreen({navigation}){
    const {toggleTheme, isDarkTheme} = useTheme();
    return(
        
        <Surface
            style={styles.container}
        >
            <Text>Configurações</Text>
            <Button onPress={toggleTheme}>Alternar tema</Button>
            <Button onPress={() => navigation.navigate('LoginScreen')}>Voltar</Button>
        </Surface>
    )
}