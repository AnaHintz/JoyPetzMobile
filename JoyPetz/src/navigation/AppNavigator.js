import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import RegisterScreen from "../screens/RegisterScreen/RegisterScreen";
import HomeScreen from "../screens/HomeScreen/HomeScreen";
import LoginScreen from "../screens/LoginScreen/LoginScreen";
import * as React from 'react';
import PublicarScreen from "../screens/PublicarScreen/PublicarScreen";
import TesteScreen from "../screens/TestesScreen/TestesScreen";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, View, Text, Image } from "react-native";
import { Appbar, Provider as PaperProvider } from 'react-native-paper';
import PerfilScreen from "../screens/ConfigurationScreen/ConfigurationScreen";

import { CombinedDarkTheme, CombinedLightTheme, NavigationDarkTheme, NavigationLightTheme } from "../config/theme";
import { useTheme } from "../contexts/ThemeContext";

import logo from '../../assets/joypetz.png';

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

const CustomHeader = ({ navigation, title, isLogo }) => {
  return (
    <Appbar.Header style={styles.header}>
      <Appbar.Action icon="menu" onPress={() => navigation.toggleDrawer()} />
      <View style={styles.spacer} />
      {isLogo ? (
        <Image source={logo} style={styles.logo} />
      ) : (
        <Text style={styles.title}>{title}</Text>
      )}
    </Appbar.Header>
  );
};

export default function AppNavigator() {
  const { isDarkTheme } = useTheme();
  const theme = isDarkTheme ? CombinedDarkTheme : CombinedLightTheme;
  const themeNavigation = isDarkTheme ? NavigationDarkTheme : NavigationLightTheme;

  return (
    <PaperProvider theme={theme}>
      <NavigationContainer theme={themeNavigation}>
        <Drawer.Navigator>
          <Drawer.Screen
            name="Login"
            component={LoginScreen}
            options={{
              headerShown: false, drawerLabel: () => null,
            }}
          />
          <Drawer.Screen
            name="Home"
            component={HomeScreen}
            options={{
              drawerIcon: HomeIcon,
              header: ({ navigation }) => <CustomHeader navigation={navigation} isLogo={true} />,
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
            component={PerfilScreen}
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
              drawerLabel: () => null,
            }}
          />
          <Drawer.Screen
            name="Register"
            component={RegisterScreen}
            options={{
              headerShown: false, drawerLabel: () => null,
            }}
          />
        </Drawer.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  spacer: {
    flex: 1,
  },
  title: {
    textAlign: 'right',
    paddingRight: 10,
    fontSize: 30,
    fontWeight: 'bold',
    color: 'hotpink',
  },
  logo: {
    width: 55,
    height: 55,
    resizeMode: 'contain',
    marginRight: 10,
    marginTop: 10,
  },
});
