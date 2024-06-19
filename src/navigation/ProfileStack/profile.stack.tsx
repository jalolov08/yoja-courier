import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Profile from "../../screens/Profile/profile.screen";
import Documents from "../../screens/Documents/documents.screen";
import Payments from "../../screens/Payments/payments.screen";

const Stack = createNativeStackNavigator();

export default function ProfileStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="Documents" component={Documents} />
      <Stack.Screen name="Payments" component={Payments} />
    </Stack.Navigator>
  );
}
