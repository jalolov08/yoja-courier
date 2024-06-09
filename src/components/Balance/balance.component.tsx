import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { useAuth } from "../../contexts/AuthContext/auth.context";
import { Entypo } from "@expo/vector-icons";

const Balance = () => {
  const { authState } = useAuth();
  const [isHidden, setIsHidden] = useState(true);

  const handleToggleBalanceVisibility = () => {
    setIsHidden(!isHidden);
  };

  const balanceAmount = isHidden ? "****" : `${authState?.balance?.amount} ₽`;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Баланс</Text>
      <View style={styles.balanceContainer}>
        <Text style={styles.balanceText}>{balanceAmount}</Text>
        <TouchableOpacity onPress={handleToggleBalanceVisibility}>
          <Entypo
            name={isHidden ? "eye" : "eye-with-line"}
            size={26}
            color="#111111b3"
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Balance;

const styles = StyleSheet.create({
  container: {
    height: 100,
    borderRadius: 10,
    backgroundColor: "#F0F0F0",
    marginTop: 20,
    padding: 20,
    justifyContent: "center",
  },
  title: {
    fontSize: 18,
    color: "#111111",
    fontWeight: "700",
    marginBottom: 10,
  },
  balanceContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  balanceText: {
    fontSize: 36,
    color: "#009688",
    marginRight: 10,
    fontWeight: "bold",
  },
  icon: {
    marginTop: -5,
  },
});
