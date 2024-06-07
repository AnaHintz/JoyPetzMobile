import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import {TextInput } from "react-native-paper";

export default function LoginScreen({ navigation }) {
  function onPressLogin() {
    navigation.navigate("Home");
  }

  return (
    <View style={styles.container}>
      <Text>Login</Text>

      <TextInput label="Email" />
      <TextInput label="Senha" />

      <Button onPress={onPressLogin}>Entrar</Button>
      <Button mode="contained">Registrar-se</Button>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
