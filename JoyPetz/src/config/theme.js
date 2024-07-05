import { MD3LightTheme, MD3DarkTheme } from "react-native-paper";
import { DarkTheme, DefaultTheme } from "@react-navigation/native";
 
const CombinedLightTheme = {
     ...MD3LightTheme
}
 
const CombinedDarkTheme = {
    ...MD3DarkTheme,
}
export const NavigationDarkTheme = {
    ...DarkTheme,
}
export const NavigationLightTheme = {
    ...DefaultTheme,
}
export { CombinedDarkTheme, CombinedLightTheme }