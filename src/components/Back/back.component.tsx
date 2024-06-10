import React from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import { Entypo } from "@expo/vector-icons";
import PropTypes from "prop-types";
import { useNavigation } from "@react-navigation/native";

interface BackProps {
  title: string;
  style?: ViewStyle;
}

const Back: React.FC<BackProps> = ({ title, style }) => {
  const navigation = useNavigation();
  return (
    <View style={[styles.container, style]}>
      <Pressable onPress={() => navigation.goBack()}>
        <Entypo name="chevron-thin-left" size={24} color="#111111" />
      </Pressable>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

export default Back;

const styles = StyleSheet.create({
  container: {
    height: 50,
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    borderRadius: 8,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  title: {
    fontSize: 20,
    fontWeight: "500",
    color: "#111111",
    marginLeft: 12,
  },
});
