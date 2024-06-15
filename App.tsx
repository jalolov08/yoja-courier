import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import MainStack from "./src/navigation";
import { AuthProvider } from "./src/contexts/AuthContext/auth.context";
import Toast from "react-native-toast-message";

export default function App() {
  return (
    <>
      <AuthProvider>
        <NavigationContainer>
          <SafeAreaView style={styles.container}>
            <StatusBar style="auto" />
            <MainStack />
          </SafeAreaView>
        </NavigationContainer>
      </AuthProvider>
      <Toast />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
