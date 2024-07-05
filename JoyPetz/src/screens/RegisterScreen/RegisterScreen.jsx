import React, { useState } from "react";
import { View, Image, StyleSheet } from "react-native";
import { Button, Icon, Surface, Text, TextInput } from "react-native-paper";
import { styles } from "../../config/Style";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../config/firebase";

export default function RegisterScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [repetirSenha, setRepetirSenha] = useState("");
  const [hidePassword, setHidePassword] = useState("");
  const [error, setError] = useState("");

  const handleRegister = () => {
    // Verificar se os campos de email, senha e repetir senha estão preenchidos
    if (!email.trim() || !senha.trim() || !repetirSenha.trim()) {
      setError("Por favor, preencha todos os campos.");
      return;
    }

    // Verificar se as senhas são iguais
    else if (senha !== repetirSenha) {
      setError("As senhas não estão iguais. Por favor, tente novamente.");
      return;
    }

    try {
      const userRef = createUserWithEmailAndPassword(auth, email, senha);
      if (userRef) {
        console.log("Usuário registrado com sucesso!");
        navigation.navigate("Login");
      }

    } catch (e) {
      console.error(e);
    }

  };

  return (
    <Surface style={estilo.container}>
      <View style={estilo.header}>
        <Image
          source={require("../../../assets/joypetz.png")}
          style={estilo.logo} />
        <Text variant="titleLarge" style={StyleSheet.compose(estilo.title)}>Registrar</Text>
      </View>
      <View style={estilo.separator} />
      <View style={estilo.formContainer}>
        {error ? <Text style={styles.errorText}>{error}</Text> : null}
        <View style={estilo.input2}>
          <Text style={{ color: 'hotpink' }}>Email</Text>
          <TextInput
            activeUnderlineColor="hotpink"
            placeholder={"Digite seu e-mail"}
            value={email}
            onChangeText={setEmail}
            style={styles.input}
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
            style={styles.input}
          />
        </View>
        <View style={estilo.input2}>
          <Text style={{ color: 'hotpink' }}>Confimação da Senha</Text>
          <TextInput
            activeUnderlineColor="hotpink"
         
            placeholder={"Repita sua senha"}
            value={repetirSenha}
            onChangeText={setRepetirSenha}
            style={styles.esp}
            secureTextEntry={hidePassword}
            right={
              <TextInput.Icon
                icon={hidePassword ? "eye" : "eye-off"}
                onPress={() => setHidePassword(!hidePassword)}
              />
            }
          />
        </View>
        <Button style={estilo.margimtopo} mode="contained" onPress={handleRegister} buttonColor="hotpink">
          Fazer Cadastro
        </Button>
        <Button style={estilo.margimtopo} labelStyle={{ color: 'hotpink' }} mode="text" onPress={() => navigation.navigate("Login")}>
          Voltar para o login
        </Button>
      </View>
    </Surface>
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
    marginTop: 25,
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
});