import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import RegisterScreen from "../screens/RegisterScreen/RegisterScreen";
import HomeScreen from "../screens/HomeScreen/HomeScreen";
import LoginScreen from "../screens/LoginScreen/LoginScreen";
import ConfigurationScreen from "../screens/ConfigurationScreen/ConfigurationScreen";
import * as React from 'react';
import PublicarScreen from "../screens/PublicarScreen/PublicarScreen";
import TesteScreen from "../screens/TestesScreen/TestesScreen";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, View, Text } from "react-native";
import { Appbar } from 'react-native-paper';

const HomeIcon = ({ focused, color, size }) => (
  <Ionicons name="home" size={size} color="hotpink" />
);
const DoarIcon = ({ focused, color, size }) => (
  <Ionicons name="heart" size={size} color="hotpink" />
);
const PerfilIcon = ({ focused, color, size }) => (
  <Ionicons name="person" size={size} color="hotpink" />
);

const Drawer = createDrawerNavigator();

// Função CustomHeader ajustada para alinhar o título à direita
const CustomHeader = ({ navigation, title }) => {
  return (
    <Appbar.Header style={styles.header}>
      <Appbar.Action icon="menu" onPress={() => navigation.toggleDrawer()} />
      <View style={styles.spacer} />
      <Text style={styles.title}>{title}</Text>
    </Appbar.Header>
  );
};

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Drawer.Navigator>
        <Drawer.Screen
          name="Home"
          component={HomeScreen}
          options={{
            drawerIcon: HomeIcon,
            header: ({ navigation }) => <CustomHeader navigation={navigation} title="Home" />,
          }}
        />
        <Drawer.Screen
          name="Doar"
          component={PublicarScreen}
          options={{
            drawerIcon: DoarIcon,
            header: ({ navigation }) => <CustomHeader navigation={navigation} title="Doar" />,
          }}
        />
        <Drawer.Screen
          name="Perfil"
          component={ConfigurationScreen}
          options={{
            drawerIcon: PerfilIcon,
            header: ({ navigation }) => <CustomHeader navigation={navigation} title="Perfil" />,
          }}
        />
        <Drawer.Screen
          name="Teste"
          component={TesteScreen}
          options={{
            header: ({ navigation }) => <CustomHeader navigation={navigation} title="Teste" />,
          }}
        />
        <Drawer.Screen
          name="Login"
          component={LoginScreen}
          options={{
            headerShown: false,
          }}
        />
        <Drawer.Screen
          name="Register"
          component={RegisterScreen}
          options={{
            headerShown: false,
          }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  spacer: {
    flex: 1,
  },
  title: {
    textAlign: 'right', // Alinhando o título à direita
    paddingRight: 10, // Adicionando espaço à direita
    fontSize: 20,
    fontWeight: 'bold',
    color: 'hotpink',
  },
});
