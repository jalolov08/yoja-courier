import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AuthStack from "./AuthStack/auth.stack";

const Stack = createNativeStackNavigator();

export default function MainStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="AuthStack" component={AuthStack} />
    </Stack.Navigator>
  );
}
