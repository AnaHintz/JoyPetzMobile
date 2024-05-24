import { View, Text,TouchableOpacity } from "react-native";
import { Button, TextInput } from "react-native-paper";

export default function LoginScreen({ navigation }) {
  function onPressLogin() {
    navigation.navigate("Home");
  }

  return (
    <View>
      <Text>Login</Text>

      <TextInput label="Email" />
      <TextInput label="Senha" />

      <Button onPress={onPressLogin}>Logar</Button>
      <TouchableOpacity onPress={() => navigation.navigate("Register")}>
        <Text>
          Não tem uma conta?
          <Text>Crie uma</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
}
