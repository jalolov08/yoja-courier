import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../../screens/Home/home.screen";
import SelectType from "../../screens/SelectType/selectType.screen";
import OrderDetails from "../../screens/OrderDetails/orderDetails.screen";

const Stack = createNativeStackNavigator();

export default function HomeStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="OrderDetails" component={OrderDetails} />

    </Stack.Navigator>
  );
}
