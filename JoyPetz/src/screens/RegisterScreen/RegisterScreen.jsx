import React, { useState } from "react";
import { View, Image, StyleSheet } from "react-native";
import { Button, Surface, Text, TextInput, Dialog, Portal, Paragraph } from "react-native-paper";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../config/firebase";
import { useFocusEffect } from "@react-navigation/native";

export default function RegisterScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [repetirSenha, setRepetirSenha] = useState("");
  const [hidePassword, setHidePassword] = useState(true);
  const [error, setError] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");
  const [visible, setVisible] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
        return () => {
            setEmail("");
            setSenha("");
            setError("");
        };
    }, [])
  );

  const handleRegister = () => {
    setError("");

    if (!email.trim() || !senha.trim() || !repetirSenha.trim()) {
      setError("Por favor, preencha todos os campos.");
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      setError("Por favor, insira um endereço de email válido.");
      return;
    }

    if (senha !== repetirSenha) {
      setError("As senhas não estão iguais. Por favor, tente novamente.");
      return;
    }

    if (senha.length < 6) {
      setError("A senha deve ter pelo menos 6 caracteres.");
      return;
    }

    createUserWithEmailAndPassword(auth, email, senha)
      .then(() => {
        setVisible(true);
      })
      .catch((error) => {
        setError("Erro ao registrar: " + error.message);
        setVisible(true);
      });
  };

  const handlePasswordChange = (text) => {
    setSenha(text);
    if (text.length < 6) {
      setPasswordMessage("A senha deve ter pelo menos 6 caracteres.");
    } else {
      setPasswordMessage("");
    }
  };

  const hideDialog = () => {
    setVisible(false);
    if (!error) {
      navigation.navigate("Login");
    }
  };

  return (
    <Surface style={estilo.container}>
      <View style={estilo.header}>
        <Image
          source={require("../../../assets/joypetz.png")}
          style={estilo.logo}
        />
        <Text variant="titleLarge" style={estilo.title}>Registrar</Text>
      </View>
      <View style={estilo.separator} />
      <View style={estilo.formContainer}>
        {error ? <Text style={estilo.errorText}>{error}</Text> : null}
        <View style={estilo.input2}>
          <Text style={estilo.label}>Email</Text>
          <TextInput
            activeUnderlineColor="hotpink"
            placeholder={"Digite seu e-mail"}
            value={email}
            onChangeText={setEmail}
            style={estilo.input}
          />
        </View>
        <View style={estilo.input2}>
          <Text style={estilo.label}>Senha</Text>
          <TextInput
            activeUnderlineColor="hotpink"
            placeholder={"Digite sua Senha"}
            value={senha}
            onChangeText={handlePasswordChange}
            secureTextEntry={hidePassword}
            right={
              <TextInput.Icon
                icon={hidePassword ? "eye" : "eye-off"}
                onPress={() => setHidePassword(!hidePassword)}
              />
            }
            style={estilo.input}
          />
          {passwordMessage ? <Text style={estilo.errorText}>{passwordMessage}</Text> : null}
        </View>
        <View style={estilo.input2}>
          <Text style={estilo.label}>Confirmação da Senha</Text>
          <TextInput
            activeUnderlineColor="hotpink"
            placeholder={"Repita sua senha"}
            value={repetirSenha}
            onChangeText={setRepetirSenha}
            secureTextEntry={hidePassword}
            right={
              <TextInput.Icon
                icon={hidePassword ? "eye" : "eye-off"}
                onPress={() => setHidePassword(!hidePassword)}
              />
            }
            style={estilo.input}
          />
        </View>
        <Button style={estilo.margimtopo} mode="contained" onPress={handleRegister} buttonColor="hotpink">
          Fazer Cadastro
        </Button>
        <Button style={estilo.margimtopo} labelStyle={{ color: 'hotpink' }} mode="text" onPress={() => navigation.navigate("Login")}>
          Voltar para o login
        </Button>
      </View>
      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog}>
          <Dialog.Title>{error ? "Erro" : "Sucesso"}</Dialog.Title>
          <Dialog.Content>
            <Paragraph>{error ? error : "Conta criada com sucesso!"}</Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={hideDialog}>OK</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </Surface>
  );
}

const estilo = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFF",
    alignItems: "center",
    justifyContent: 'flex-start',
    padding: 20,
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
  label: {
    color: 'hotpink',
    marginBottom: 5,
  }
});
