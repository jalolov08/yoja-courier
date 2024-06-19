import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import { Transaction, TransactionType } from "../../types/transaction.type";

type TransactionsProps = {
  transactions: Transaction[] | undefined;
  loading: boolean;
  error: string | null;
};

const Transactions: React.FC<TransactionsProps> = ({
  transactions,
  loading,
  error,
}) => {
  const renderItem = ({ item }: { item: Transaction }) => {
    const createdAtDate = new Date(item.createdAt);

    const formattedDate = `${createdAtDate.toLocaleDateString()} ${createdAtDate.toLocaleTimeString()}`;

    const amountTextColor =
      item.type === TransactionType.CREDIT ? "#4CAF50" : "#E57373";

    return (
      <View style={styles.item}>
        <Text style={{ ...styles.amount, color: amountTextColor }}>
          {item.type === TransactionType.CREDIT ? "+" : "-"}
          {item.amount}₽
        </Text>
        <Text style={styles.description}>{item.description}</Text>
        <Text style={styles.date}>{formattedDate}</Text>
      </View>
    );
  };

  if (loading) {
    return (
      <ActivityIndicator
        size="large"
        color="#091425"
        style={{ marginTop: 40 }}
      />
    );
  }

  if (error) {
    return <Text>Ошибка при получение транзакций.</Text>;
  }

  return (
    <FlatList
      contentContainerStyle={{ paddingBottom: 40 }}
      scrollEnabled={false}
      showsVerticalScrollIndicator={false}
      data={transactions}
      renderItem={renderItem}
      keyExtractor={(item) => item._id}
    />
  );
};

export default Transactions;

const styles = StyleSheet.create({
  item: {
    backgroundColor: "#F0F5F5",
    padding: 14,
    marginVertical: 8,
    height: 90,
    borderRadius: 5,
  },
  amount: {
    fontSize: 18,
    fontWeight: "500",
    color: "#111111",
  },
  description: {
    fontSize: 14,
    fontWeight: "500",
    color: "#111111",
  },
  date: {
    fontSize: 11,
    fontWeight: "500",
    color: "#777",
  },
  error:{
    fontSize: 14,
    fontWeight: "500",
    color: "#FF4343",
  }
});
