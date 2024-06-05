import React, { useState } from "react";
import {
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { TextInputMask } from "react-native-masked-text";

import styles from "./login.style";
import image from "../../../assets/images/login.image.png";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useAuth } from "../../contexts/AuthContext/auth.context";

type LoginScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Login"
>;

export default function Login({
  navigation,
}: {
  navigation: LoginScreenNavigationProp;
}) {
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const { onLogin } = useAuth();

  const handleNext = async () => {
    setLoading(true);
    const res = await onLogin(phone);
    if (!res.error) {
      navigation.navigate("Verify");
    } else {
      console.log(res.data.error);
    }
    setLoading(false);
  };
  const isPhoneFilled = phone.replace(/\D/g, "").length === 11;
  return (
    <ScrollView style={styles.container}>
      <Image source={image} style={styles.image} resizeMode="cover" />
      <Text style={styles.title}>Добро пожаловать !</Text>
      <Text style={styles.subTitle}>Пожалуйста, введите ваш телефон</Text>
      <TextInputMask
        placeholderTextColor="#D7D7D7"
        placeholder="+7 (999) 999-99-99"
        style={styles.input}
        keyboardType="phone-pad"
        type={"custom"}
        options={{
          mask: "+7 (999) 999-99-99",
        }}
        value={phone}
        onChangeText={(text) => setPhone(text)}
      />
      <TouchableOpacity
        style={[
          styles.btnCont,
          { opacity: loading || !isPhoneFilled ? 0.5 : 1 },
        ]}
        onPress={handleNext}
        disabled={loading || !isPhoneFilled}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.btnText}>Далее</Text>
        )}
      </TouchableOpacity>
    </ScrollView>
  );
}
