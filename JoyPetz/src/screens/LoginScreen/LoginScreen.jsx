import React, { useState } from "react";
import { View, Image, StyleSheet } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../config/firebase";

export default function LoginScreen({ navigation }) {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [error, setError] = useState("");

    const handleLogin = () => {
        if (!email.trim() || !senha.trim()) {
            setError("Por favor, preencha todos os campos.");
            return;
        } else {
            navigation.navigate("Home");
            setError("Credenciais inválidas. Por favor, tente novamente.");
        }

        try {
            const userRef = signInWithEmailAndPassword(auth, email, senha);
            if (userRef) {
                console.log("Usuário logado com sucesso!");
                navigation.navigate("Home");
            }
        } catch (e) {
            console.error(e);
        }
    };

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
                {error ? <Text style={estilo.errorText}>{error}</Text> : null}
                <Text>Email</Text>
                <TextInput
                    activeUnderlineColor="hotpink"
                    label={"Email"}
                    placeholder={"Digite seu e-mail"}
                    value={email}
                    onChangeText={setEmail}
                    style={estilo.input}
                />
                <Text>Senha</Text>
                <TextInput
                    activeUnderlineColor="hotpink"
                    label={"Senha"}
                    placeholder={"Digite sua Senha"}
                    value={senha}
                    onChangeText={setSenha}
                    style={estilo.input}
                    secureTextEntry // Para esconder a senha
                />
                <Button mode="contained" onPress={handleLogin} buttonColor="hotpink">
                    Entrar
                </Button>
                <Button onPress={() => navigation.navigate("Register")} textColor="hotpink">
                    Registrar
                </Button>
                <Button textColor="hotpink">
                    Esqueceu a senha?
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
    errorText: {
        color: "red",
        marginBottom: 10,
    },
});
