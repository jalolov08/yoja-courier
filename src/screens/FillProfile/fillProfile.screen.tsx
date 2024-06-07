import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import styles from "./fillProfile.style";
import { useRoute } from "@react-navigation/native";
import useProfile from "../../hooks/useProfile";

export default function FillProfile({ navigation }) {
  const { params } = useRoute();
  const type = params?.type;
  const { saveProfile, isLoading, error } = useProfile();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [city, setCity] = useState("");

  const handleSaveProfile = async () => {
    const success = await saveProfile(firstName, lastName, city, type);
    if (success) {
      console.log("Профиль успешно сохранен");
      navigation.navigate("Tabs");
    } else {
      console.error("Ошибка сохранения профиля:", error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Идем дальше</Text>
      <Text style={styles.subTitle}>Пожалуйста, введите вашу информацию</Text>
      <View style={{ marginTop: 100 }}>
        <TextInput
          style={styles.input}
          placeholder="Имя"
          placeholderTextColor="#FFFFFF"
          value={firstName}
          onChangeText={setFirstName}
        />
        <TextInput
          style={styles.input}
          placeholder="Фамилия"
          placeholderTextColor="#FFFFFF"
          value={lastName}
          onChangeText={setLastName}
        />
        <TextInput
          style={styles.input}
          placeholder="Город"
          placeholderTextColor="#FFFFFF"
          value={city}
          onChangeText={setCity}
        />
        <TouchableOpacity
          style={[
            styles.btnCont,
            !firstName || !lastName || !city ? { opacity: 0.5 } : null,
          ]}
          onPress={handleSaveProfile}
          disabled={!firstName || !lastName || !city || isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.btnText}>Далее</Text>
          )}
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
