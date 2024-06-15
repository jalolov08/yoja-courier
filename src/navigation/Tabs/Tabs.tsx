import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { tabs } from "../../constants/tabs.constant";
import { Feather } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
const Tab = createBottomTabNavigator();

const styles = StyleSheet.create({
  tabBarContainer: {
    height: 80,
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    elevation: 10,
    shadowColor: "#000000",
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowOffset: {
      width: 0,
      height: -3,
    },
  },
  tabBarLabel: {
    fontSize: 12,
    color: "#C0C5C2",
    marginBottom: 15,
    fontWeight: "500",
  },
});
const visibleRoutes = ["SelectType" , "OrderDetails" , "Documents"];

const getTabBarVisibility = (route: string) => {
  const routeName = getFocusedRouteNameFromRoute(route);
  if (visibleRoutes.includes(routeName)) {
    return "none";
  } else {
    return "flex";
  }
};

export default function Tabs() {
  return (
    <Tab.Navigator>
      {tabs.map((tab) => (
        <Tab.Screen
          key={tab.name}
          name={tab.name}
          component={tab.component}
          options={({ route }) => ({
            headerShown: false,
            tabBarStyle: [
              styles.tabBarContainer,
              { display: getTabBarVisibility(route) },
            ],
            tabBarLabel: ({ focused }) => (
              <Text
                style={[
                  styles.tabBarLabel,
                  { color: focused ? "#006970" : "#C0C5C2" },
                ]}
              >
                {tab.name}
              </Text>
            ),
            tabBarIcon: ({ focused }) => (
              <Feather
                name={tab.icon}
                size={27}
                color={focused ? "#006970" : "#C0C5C2"}
              />
            ),
          })}
        />
      ))}
    </Tab.Navigator>
  );
}
