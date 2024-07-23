import React, { useState } from "react";
import { View, Image, StyleSheet } from "react-native";
import { Button, Text, TextInput, Dialog, Portal, Paragraph } from "react-native-paper";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../config/firebase";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [hidePassword, setHidePassword] = useState(true);
  const [visible, setVisible] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    setError("");

    if (!email.trim() || !senha.trim()) {
      setError("Por favor, preencha todos os campos.");
      setLoading(false);
      setVisible(true);
      return;
    }

    try {
      const userRef = await signInWithEmailAndPassword(auth, email, senha);
      if (userRef) {
        setVisible(true);
      }
    } catch (e) {
      console.error(e);
      setError("Credenciais inválidas. Por favor, tente novamente.");
      setVisible(true);
    }

    setLoading(false);
  };

  const hideDialog = () => {
    setVisible(false);
    if (!error) {
      navigation.navigate("Home");
    }
  };

  module.exports = email;

  return (
    <View style={estilo.container}>
      <View style={estilo.header}>
        <Image
          source={require("../../../assets/joypetz.png")}
          style={estilo.logo}
        />
        <Text variant="titleLarge" style={StyleSheet.compose(estilo.title)}>Login</Text>
      </View>
      <View style={estilo.separator} />
      <View style={estilo.formContainer}>
        <View style={estilo.input}>
          <Text style={{ color: 'hotpink' }}>Email</Text>
          <TextInput
            activeUnderlineColor="hotpink"
            placeholder={"Digite seu e-mail"}
            value={email}
            onChangeText={setEmail}
          />
        </View>
        <View style={estilo.input2}>
          <Text style={{ color: 'hotpink' }}>Senha</Text>
          <TextInput
            activeUnderlineColor="hotpink"
            placeholder={"Digite sua Senha"}
            value={senha}
            onChangeText={setSenha}
            secureTextEntry={hidePassword}
            right={
              <TextInput.Icon
                icon={hidePassword ? "eye" : "eye-off"}
                onPress={() => setHidePassword(!hidePassword)}
              />
            }
          />
        </View>
        <View style={estilo.esp}></View>
        <Button style={estilo.margimtopo} mode="contained" onPress={handleLogin} buttonColor="hotpink" loading={loading}>
          Entrar
        </Button>
        <Button style={estilo.margimtopo} mode="contained" onPress={() => navigation.navigate("Register")} buttonColor="hotpink">
          Registrar
        </Button>
      </View>
      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog}>
          <Dialog.Title>{error ? "Erro" : "Sucesso"}</Dialog.Title>
          <Dialog.Content>
            <Paragraph>{error ? error : "Usuário logado com sucesso!"}</Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={hideDialog}>OK</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
}

const estilo = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFF",
    alignItems: "center",
    justifyContent: 'flex-start',
    paddingRight: 20,
    paddingLeft: 20,
  },
  header: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 10,
  },
  logo: {
    width: 100,
    height: 100,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "hotpink",
  },
  separator: {
    width: "100%",
    height: 2,
    backgroundColor: "hotpink",
    marginBottom: 20,
  },
  formContainer: {
    width: "100%",
    marginTop: 20,
  },
  lefttext: {
    alignItems: "flex-start",
  },
  input: {
    width: "100%",
    marginBottom: 10,
  },
  input2: {
    width: "100%",
    marginBottom: 10,
    marginTop: 30,
  },
  margimtopo: {
    width: "100%",
    marginBottom: 10,
    marginTop: 10,
  },
  errorText: {
    color: "red",
    marginBottom: 10,
  },
  esp: {
    marginBottom: 100,
  }
});
