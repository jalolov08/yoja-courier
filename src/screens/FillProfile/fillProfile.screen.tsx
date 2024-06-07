import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Image,
  Modal,
  Pressable,
} from "react-native";
import styles from "./fillProfile.style";
import { useRoute } from "@react-navigation/native";
import useProfile from "../../hooks/useProfile";
import * as ImagePicker from "expo-image-picker";
import { Feather } from "@expo/vector-icons";

export default function FillProfile({ navigation }) {
  const { params } = useRoute();
  const type = params?.type;
  const { saveProfile, isLoading, error } = useProfile();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [city, setCity] = useState("");
  const [image, setImage] = useState<ImagePicker.ImagePickerResult | null>(
    null
  );

  const [modalVisible, setModalVisible] = useState(false);

  const handleSaveProfile = async () => {
    const formData = new FormData();
    formData.append("name", firstName);
    formData.append("surname", lastName);
    formData.append("city", city);
    formData.append("type", type);
    formData.append("photo", {
      uri: image.assets[0].uri,
      type: "image/jpeg",
      name: "photo.jpg",
    });

    const success = await saveProfile(formData);
    if (success) {
      console.log("Профиль успешно сохранен");
      navigation.navigate("Tabs");
    } else {
      console.error("Ошибка сохранения профиля:", error);
    }
  };

  const pickImage = async (source: "gallery" | "camera") => {
    let result;
    if (source === "gallery") {
      result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
      });
    } else if (source === "camera") {
      result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
      });
    }

    if (result && result.assets && result.assets.length > 0) {
      setImage(result);
      setModalVisible(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Идем дальше</Text>
      <Text style={styles.subTitle}>Пожалуйста, введите вашу информацию</Text>
      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        style={styles.image}
      >
        {image ? (
          <Image source={{ uri: image?.assets[0].uri }} style={styles.image} />
        ) : (
          <>
            <Feather name="user" color="#A8DADC" size={50} />
            <Text style={styles.imageText}>Загрузите фото </Text>
          </>
        )}
      </TouchableOpacity>

      <View style={{ marginTop: 50 }}>
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
            !image || !firstName || !lastName || !city
              ? { opacity: 0.5 }
              : null,
          ]}
          onPress={handleSaveProfile}
          disabled={!firstName || !image || !lastName || !city || isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.btnText}>Далее</Text>
          )}
        </TouchableOpacity>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Pressable
              style={[styles.modalItem, styles.modalItemFirst]}
              onPress={() => {
                pickImage("gallery");
              }}
            >
              <Text style={styles.modalText}>Выбрать из галереи</Text>
            </Pressable>
            <Pressable
              style={styles.modalItem}
              onPress={() => {
                pickImage("camera");
              }}
            >
              <Text style={styles.modalText}>Сделать фото</Text>
            </Pressable>
            <Pressable
              style={styles.modalCancel}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.modalCancelText}>Отмена</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}
