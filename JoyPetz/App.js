import AppNavigator from "./src/navigation/AppNavigator";
import { ThemeProvider } from './src/contexts/ThemeContext';


{/* <PublicarScreen />*/ }

export default function App() {
  return (

    <ThemeProvider>
      <AppNavigator />
    </ThemeProvider>);
}

