/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import AppNavigator from "./src/navigation/AppNavigator";
import { AuthProvider } from "./src/context/AuthContext";

function App() {
    return (
    <AuthProvider>
      <AppNavigator />
    </AuthProvider>
  );
}

export default App;
