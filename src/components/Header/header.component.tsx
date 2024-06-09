import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useAuth } from "../../contexts/AuthContext/auth.context";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { API } from "../../../config";

const Header = () => {
  const { authState } = useAuth();
  return (
    <View style={styles.container}>
      <View style={styles.userInfo}>
        <Text style={styles.welcomeText}>Welcome back,</Text>
        <Text style={styles.userName}>
          {authState?.name} {authState?.surname}
        </Text>
      </View>
      <View style={styles.iconContainer}>
        <MaterialCommunityIcons name="bell" color="#111111" size={24} />
        <Image
          source={{ uri: API + `/${authState?.photoUri}` }}
          style={styles.image}
        />
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  userInfo: {
    flexDirection: "column",
    alignItems: "flex-start",
  },
  welcomeText: {
    fontSize: 14,
    color: "#555555",
  },
  userName: {
    fontSize: 18,
    color: "#111111",
    fontWeight: "500",
  },
  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
  },

  image: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginLeft: 16,
    borderWidth: 2,
    borderColor: "#ffffff",
    shadowColor: "#000000",
    shadowOpacity: 0.2,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 2,
    elevation: 2,
  },
});
