import { NavigationContainer } from "@react-navigation/native";
import { DrawerContentScrollView, DrawerItemList, createDrawerNavigator } from "@react-navigation/drawer";
import RegisterScreen from "../screens/RegisterScreen/RegisterScreen";
import HomeScreen from "../screens/HomeScreen/HomeScreen";
import PublicarScreen from "../screens/PublicarScreen/PublicarScreen";
import LoginScreen from "../screens/LoginScreen/LoginScreen";
import ConfigurationScreen from "../screens/ConfigurationScreen/ConfigurationScreen";
import SobreScreen from "../screens/SobreScreen/SobreScreen";
import * as React from 'react';


const Drawer = createDrawerNavigator();

{ /*function CustomDrawerContent(props) {
  const { state, ...rest } = props;
  const newState = {
    ...state,
    routeNames: state.routeNames.filter(
      routeName => routeName !== 'Login' && routeName !== 'Register'

    ),
    routes: state.routes.filter(
      route => route.name !== 'Login' && route.name !== 'Register' // Filtra o Profile
    ),
  }

  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList state={newState} {...rest} />
      
    </DrawerContentScrollView>
  );
};*/ }
 



export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Drawer.Navigator >
        <Drawer.Screen name="Login" component={LoginScreen} options={{ headerShown: false,}}/>
        <Drawer.Screen name="Register" component={RegisterScreen} options={{ headerShown: false,}}/>
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="Publicar" component={PublicarScreen} />
        <Drawer.Screen name="Configurações" component={ConfigurationScreen} />
        <Drawer.Screen name="Sobre" component={SobreScreen}/>
      </Drawer.Navigator>
    </NavigationContainer>
  );
};
