import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AuthStack from "./AuthStack/auth.stack";
import Tabs from "./Tabs/Tabs";
import { useAuth } from "../contexts/AuthContext/auth.context";
import SelectType from "../screens/SelectType/selectType.screen";
import FillProfile from "../screens/FillProfile/fillProfile.screen";

const Stack = createNativeStackNavigator();

export default function MainStack() {
  const { authState } = useAuth();
  const isAuth = authState?.authenticated || false;
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      {isAuth ? (
        <>
          <Stack.Screen name="SelectType" component={SelectType} />
          <Stack.Screen name="FillProfile" component={FillProfile} />
          <Stack.Screen name="Tabs" component={Tabs} />
        </>
      ) : (
        <>
          <Stack.Screen name="AuthStack" component={AuthStack} />
        </>
      )}
    </Stack.Navigator>
  );
}
