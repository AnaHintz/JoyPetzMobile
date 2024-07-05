import { createContext, useContext, useEffect, useState } from "react";
import { useColorScheme } from "react-native";
 
export const ThemeContext = createContext();
 
export const ThemeProvider =({children}) => {
    const scheme = useColorScheme();
    const [isDarkTheme, setIsDarkTheme] = useState(scheme === 'dark');
 
    useEffect(() => {
        setIsDarkTheme(scheme === 'dark')
    }, [scheme]);
 
    function toggleTheme() {
        setIsDarkTheme(!isDarkTheme);
    }
    return(
        <ThemeContext.Provider
        value={{isDarkTheme, toggleTheme}}
        >
            {children}
        </ThemeContext.Provider>
    )
}
 
export const useTheme = () => useContext(ThemeContext);