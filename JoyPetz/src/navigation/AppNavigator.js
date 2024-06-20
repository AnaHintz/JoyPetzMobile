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
      <Drawer.Navigator >
        <Drawer.Screen name="Home" component={HomeScreen} 
        options={{ drawerIcon:HomeIcon }}
         />
        <Drawer.Screen name="Doar" component={PublicarScreen}  
        options={{ drawerIcon:DoarIcon }} />
        <Drawer.Screen name="Perfil" component={ConfigurationScreen} 
         options={{ drawerIcon:PerfilIcon }}/>
        <Drawer.Screen name="Teste" component={TesteScreen}  /> 
        <Drawer.Screen name="Login" component={LoginScreen} options={{ headerShown: false, }} />
        <Drawer.Screen name="Register" component={RegisterScreen} options={{ headerShown: false, }} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};
