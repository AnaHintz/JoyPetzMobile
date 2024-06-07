import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import ContatoScreen from "../screens/ContatoScreen/ContatoScreen";
import RegisterScreen from "../screens/RegisterScreen/RegisterScreen";
import HomeScreen from "../screens/HomeScreen/HomeScreen";
import PublicarScreen from "../screens/PublicarScreen/PublicarScreen";
import QSScreen from "../screens/QuemSomosScreen/QSScreen";
import LoginScreen from "../screens/LoginScreen/LoginScreen";

const Drawer = createDrawerNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer> 
            <Drawer.Navigator>
              <Drawer.Screen name="Login" component={LoginScreen} options={{ headerShown: false, drawerLabel: () => null, title: null,}}/>
              <Drawer.Screen name="Register" component={RegisterScreen} options={{ headerShown: false,}}/>
              <Drawer.Screen name="Home" component={HomeScreen} />
              <Drawer.Screen name="Publicar" component={PublicarScreen} />
              <Drawer.Screen name="Contato" component={ContatoScreen} />
              <Drawer.Screen name="Quem Somos" component={QSScreen} />
            </Drawer.Navigator>
    </NavigationContainer>
  );
};
