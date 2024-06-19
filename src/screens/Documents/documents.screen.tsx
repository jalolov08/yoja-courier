import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Modal,
  Pressable,
  Alert,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import styles from "./documents.style";
import Back from "../../components/Back/back.component";
import selfie from "../../../assets/images/selfie.png";
import * as ImagePicker from "expo-image-picker";
import axios from "axios"; 
import { API } from "../../../config";
import Toast from "react-native-toast-message";
import { useAuth } from "../../contexts/AuthContext/auth.context";

export default function Documents() {
  const { authState, setAuthState } = useAuth();
  const [modalVisible, setModalVisible] = useState(false);
  const [image, setImage] = useState<ImagePicker.ImagePickerResult | null>(
    null
  );
  const [loading, setLoading] = useState(false);
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

  const handleSendDoc = async () => {
    setLoading(true);
    try {
      if (!image) {
        return;
      }

      const formData = new FormData();
      formData.append("doc", {
        uri: image?.assets[0].uri,
        type: "image/jpeg",
        name: "selfie.jpg",
      });

      const response = await axios.post(`${API}/courier/verify-doc`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Document sent successfully:", response.data);
      setLoading(false);
      setImage(null);
      Toast.show({
        type: "success",
        text1: "Успешно",
        text2: "Документ успешно загружен",
      });
      setAuthState({ ...authState, status: "inactive" });
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Ошибка",
        text2: "Ошибка при загруке документа",
      });
      setLoading(false);
      console.error("Error sending document:", error);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      <Back title="Документы" />
      <View style={styles.container}>
        <Image
          source={selfie}
          style={{ width: 200, height: 200, alignSelf: "center" }}
          resizeMode="cover"
        />
        <Text style={styles.instructions}>
          Для верификации и активации вашего профиля в качестве курьера
          необходимо сделать селфи, на котором будет видно ваше лицо и паспорт.
          Важно знать, что верификация обнуляется каждые 8 часов в целях
          обеспечения безопасности.
        </Text>
        {image && (
          <Image source={{ uri: image?.assets[0].uri }} style={styles.image} />
        )}

        <TouchableOpacity
          style={styles.btnCont}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.btnText}>
            {image ? "Заменить" : "Выбрать фото"}
          </Text>
        </TouchableOpacity>
        {image && (
          <TouchableOpacity
            style={[styles.btnCont, { backgroundColor: "#fff" }]}
            onPress={handleSendDoc}
          >
            {loading ? (
              <ActivityIndicator color="#091425" />
            ) : (
              <Text style={[styles.btnText, { color: "#091425" }]}>
                Отправить
              </Text>
            )}
          </TouchableOpacity>
        )}
      </View>

      <Modal
        animationType="fade"
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
    </View>
  );
}
