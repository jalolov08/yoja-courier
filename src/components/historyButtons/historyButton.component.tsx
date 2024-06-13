import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { OrderStatus } from "../../types/order.type";

interface FilterButtonProps {
  title: string;
  onPress: () => void;
  isActive: boolean;
}

const FilterButton: React.FC<FilterButtonProps> = ({
  title,
  onPress,
  isActive,
}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text style={[styles.button, isActive && styles.activeButton]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

interface HistoryButtonProps {
  onSelectFilter: (status: OrderStatus | null) => void;
  activeFilter: OrderStatus | null;
}

const HistoryButton: React.FC<HistoryButtonProps> = ({
  onSelectFilter,
  activeFilter,
}) => {
  return (
    <View style={styles.container}>
      <FilterButton
        title="Все"
        onPress={() => onSelectFilter(null)}
        isActive={!activeFilter}
      />
      <FilterButton
        title="Активные"
        onPress={() => onSelectFilter(OrderStatus.InTransit)}
        isActive={activeFilter === OrderStatus.InTransit}
      />
      <FilterButton
        title="Завершенные"
        onPress={() => onSelectFilter(OrderStatus.Delivered)}
        isActive={activeFilter === OrderStatus.Delivered}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginTop: 20,
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#333",
    color: "#333",
  },
  activeButton: {
    backgroundColor: "#333",
    color: "#fff",
  },
});

export default HistoryButton;
