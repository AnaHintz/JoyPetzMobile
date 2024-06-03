import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import ContatoScreen from "../screens/ContatoScreen/ContatoScreen";
import LoginScreen from "../screens/LoginScreen/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen/RegisterScreen";
import HomeScreen from "../screens/HomeScreen/HomeScreen";
import PublicarScreen from "../screens/PublicarScreen/PublicarScreen";
import QSScreen from "../screens/QuemSomosScreen/QSScreen";

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Joypetz">
          {() => (
            <Drawer.Navigator>
              <Drawer.Screen name="Login" component={LoginScreen} options={{ headerShown: false,}}/>
              <Drawer.Screen name="Register" component={RegisterScreen} options={{ headerShown: false,}}/>
              <Drawer.Screen name="Home" component={HomeScreen} />
              <Drawer.Screen name="Publicar" component={PublicarScreen} />
              <Drawer.Screen name="Contato" component={ContatoScreen} />
              <Drawer.Screen name="Quem Somos" component={QSScreen} />
            </Drawer.Navigator>
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

