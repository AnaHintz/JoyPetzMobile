import React, { useState } from "react";
import { View, Image, StyleSheet } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
import { styles } from "../../config/Style";

export default function LoginScreen({ navigation }) {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [error, setError] = useState("");

    const handleLogin = () => {

        if (!email.trim() || !senha.trim()) {
            setError("Por favor, preencha todos os campos.");

            return;
        }
        else {
            navigation.navigate("Home");
            setError("Credenciais inválidas. Por favor, tente novamente.");
        }
    };

    return (
        <View style={estilo.container}>
            <View style={styles.container_inner}>
                <Image
                    source={require("../../../assets/MicrosoftTeams-image.png")}
                    style={{ width: 200, height: 200 }} />
                <Text variant="titleLarge">Login</Text>
                {/* Exibir mensagem de erro, se houver */}
                {error ? <Text style={styles.errorText}>{error}</Text> : null}        <TextInput
                    activeUnderlineColor="hotpink"
                    label={"Email"}
                    placeholder={"Digite seu e-mail"}
                    value={email}
                    onChangeText={setEmail}
                    style={styles.input}
                />
                <TextInput

                    activeUnderlineColor="hotpink"
                    label={"Senha"}
                    placeholder={"Digite sua Senha"}
                    value={senha}
                    onChangeText={setSenha}
                    style={styles.esp}
                    secureTextEntry // Para esconder a senha
                />
                <Button mode="contained" onPress={handleLogin} buttonColor="hotpink">
                    Entrar
                </Button>
                <Button onPress={() => navigation.navigate("Register")} textColor="hotpink">
                    Fazer Cadastro
                </Button>
            </View>
        </View>
    );
}

const estilo = StyleSheet.create({
    container: {
    flex: 1,
    backgroundColor: "#FFFF",
    alignItems: "center",
    justifyContent: 'center',
    paddingRight: 20,
    paddingLeft: 20,
    }
})