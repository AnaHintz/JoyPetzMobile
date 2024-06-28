import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import RegisterScreen from "../screens/RegisterScreen/RegisterScreen";
import HomeScreen from "../screens/HomeScreen/HomeScreen";
import LoginScreen from "../screens/LoginScreen/LoginScreen";
import * as React from 'react';
import PublicarScreen from "../screens/PublicarScreen/PublicarScreen";
import TesteScreen from "../screens/TestesScreen/TestesScreen";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet } from "react-native";
import PerfilScreen from "../screens/ConfigurationScreen/ConfigurationScreen";


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

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Drawer.Navigator style={styles.colr}> 
        <Drawer.Screen name="Login" component={LoginScreen} options={{ headerShown: false, drawerLabel: () => null }} />
        <Drawer.Screen name="Home" component={HomeScreen} 
        options={{ drawerIcon:HomeIcon }}
         />
        <Drawer.Screen name="Doar" component={PublicarScreen}  
        options={{ drawerIcon:DoarIcon , }} />
        <Drawer.Screen name="Perfil" component={PerfilScreen} 
         options={{ drawerIcon:PerfilIcon }}/>
        <Drawer.Screen name="Teste" component={TesteScreen} options={{drawerLabel: () => null}} /> 
        <Drawer.Screen name="Register" component={RegisterScreen} options={{ headerShown: false, drawerLabel: () => null }} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  colr: {
    color: "red"
  }
})
