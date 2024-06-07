import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import {
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import styles from "./selectType.style";
import { CourierType } from "../../types/courier.enum";


const SelectType = ({ navigation }) => {
  const [selectedType, setSelectedType] = useState<CourierType | null>(null);
  const [showButton, setShowButton] = useState<boolean>(false);

  const handleSelect = (type: CourierType) => {
    setSelectedType(type);
    setShowButton(true);
  };
  const handleNext = () => {
    navigation.navigate("FillProfile", { type: selectedType });
  };
  const renderSelect = (type: CourierType, icon: JSX.Element, text: string) => (
    <TouchableOpacity
      style={[styles.select, selectedType === type && styles.selected]}
      onPress={() => handleSelect(type)}
    >
      {React.cloneElement(icon, {
        color: selectedType === type ? "#092325" : "#A8DADC",
      })}
      <Text
        style={[
          styles.selectText,
          selectedType === type && styles.selectedText,
        ]}
      >
        {text}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Давайте начнем</Text>
      <Text style={styles.subTitle}>
        Пожалуйста, выберите желаемый способ доставки
      </Text>
      <View style={styles.selectCont}>
        {renderSelect(
          CourierType.PEDESTRIAN,
          <MaterialIcons name="backpack" size={60} />,
          "Пеший"
        )}
        {renderSelect(
          CourierType.CYCLE_MOTO,
          <MaterialCommunityIcons name="bike" size={60} />,
          "Вело/Мото"
        )}
        {renderSelect(
          CourierType.AUTO,
          <Ionicons name="car" size={60} />,
          "Авто"
        )}
        {renderSelect(
          CourierType.TRUCK,
          <MaterialCommunityIcons name="truck" size={60} />,
          "Грузовой"
        )}
      </View>
      {showButton && (
        <TouchableOpacity style={styles.btnCont} onPress={handleNext}>
          <Text style={styles.btnText}>Далее</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default SelectType;
