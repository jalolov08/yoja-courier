import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import styles from "./profile.style";
import { useAuth } from "../../contexts/AuthContext/auth.context";
import { API } from "../../../config";
import { Entypo } from "@expo/vector-icons";

export default function Profile({ navigation }) {
  const { authState } = useAuth();

  const getStatusText = (status: string) => {
    return status === "inactive" ? "Неактивен" : "Активен";
  };

  const sections = [
    { icon: "credit-card", text: "Платежи", route: "Payments" },
    { icon: "documents", text: "Документы", route: "Documents" },
    { icon: "cog", text: "Настройки", route: "Settings" },
    { icon: "lifebuoy", text: "Поддержка", route: "Support" },
    { icon: "info", text: "О нас", route: "About" },
  ];

  return (
    <View style={styles.container}>
      <View style={{ alignItems: "center", justifyContent: "center" }}>
        <Image
          source={{ uri: API + `/${authState?.photoUri}` }}
          style={styles.image}
        />
        <Text style={styles.name}>
          {authState?.name} {authState?.surname}
        </Text>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={[styles.name, { fontSize: 14, marginTop: 0 }]}>
            Статус: {getStatusText(authState?.status)}
          </Text>
        </View>
        <View style={styles.line}></View>
      </View>
      {sections.map((section, index) => (
        <TouchableOpacity
          key={index}
          style={styles.listItem}
          onPress={() => navigation.navigate(section.route)}
        >
          <Entypo name={section.icon} size={26} color="#B0B0B0" />
          <Text style={styles.listText}>{section.text}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}
