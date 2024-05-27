import { View, Text,TouchableOpacity } from "react-native";
import { Button, TextInput } from "react-native-paper";

export default function RegisterScreen({ navigation }) {
  function onPressLogin() {
    navigation.navigate("Login");
  }

  return (
    <View>
      <Text>Registro</Text>
      <TextInput label="Nome" />
      <TextInput label="Email" />
      <TextInput label="Senha" />

      <Button onPress={onPressLogin}>Registrar</Button>
      <TouchableOpacity onPress={() => navigation.navigate("Login")}>
        <Text>
          Já tem uma conta?
          <Text>Entre nela</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
}
