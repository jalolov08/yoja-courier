import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
  ActivityIndicator,
} from "react-native";
import { TextInputMask } from "react-native-masked-text";
import Back from "../../components/Back/back.component";
import { useAuth } from "../../contexts/AuthContext/auth.context";
import useGetRequest from "../../hooks/useGetRequest";
import { Transaction } from "../../types/transaction.type";
import { API } from "../../../config";
import Transactions from "../../components/Transactions/transactions.component";
import styles from "./payments.style";
import axios from "axios";
import Toast from "react-native-toast-message";

export default function Payments() {
  const { authState, setAuthState } = useAuth();
  const [card, setCard] = useState("");
  const [amount, setAmount] = useState("");
  const [transactions, setTransactions] = useState<Transaction[]>();
  const { data, loading, error, refresh } = useGetRequest(
    `${API}/courier/my-transactions`
  );
  const [isLoading, setIsLoading] = useState(false);

  const onRefresh = useCallback(() => {
    refresh();
  }, [refresh]);

  useEffect(() => {
    if (data && data.transactions) {
      setTransactions(data.transactions.reverse());
    }
  }, [data]);

  const handleWithdrawal = async () => {
    if (parseFloat(amount) < 500) {
      Toast.show({
        type: "error",
        text1: "Ошибка",
        text2: "Минимальная сумма для вывода - 500 ₽",
        visibilityTime: 3000,
        autoHide: true,
      });
      return;
    }

    if (card.replace(/\s+/g, "").length !== 16) {
      Toast.show({
        type: "error",
        text1: "Ошибка",
        text2: "Номер карты должен содержать 16 цифр",
        visibilityTime: 3000,
        autoHide: true,
      });
      return;
    }

    if (parseFloat(amount) > authState?.balance?.amount) {
      Toast.show({
        type: "error",
        text1: "Ошибка",
        text2: "Недостаточно средств на счету",
        visibilityTime: 3000,
        autoHide: true,
      });
      return;
    }

    setIsLoading(true);
    try {
      const withdrawalData = {
        amount: parseFloat(amount),
        cardNumber: card.replace(/\s+/g, ""),
      };

      const response = await axios.post(
        `${API}/courier/new-withdrawal`,
        withdrawalData
      );

      console.log("Withdrawal successful:", response.data);
      Toast.show({
        type: "success",
        text1: "Средства успешно выведены",
        visibilityTime: 3000,
        autoHide: true,
      });
      const newBalance = authState?.balance?.amount - parseFloat(amount);
      setAuthState({
        ...authState,
        balance: {
          ...authState.balance,
          amount: newBalance,
        },
      });
      refresh();
      setAmount("");
      setCard("");
    } catch (error) {
      console.error("Error during withdrawal:", error);
      Toast.show({
        type: "error",
        text1: "Ошибка",
        text2: "Ошибка при выводе средств",
        visibilityTime: 3000,
        autoHide: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <Back title="Платежи" />
      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={onRefresh} />
        }
      >
        <View>
          <Text style={styles.title}>Вывод средств</Text>
          <Text style={[styles.title, { fontSize: 16, marginVertical: 8 }]}>
            Баланс: {authState?.balance?.amount} ₽
          </Text>

          <TextInput
            placeholder="Сумма вывода"
            style={styles.input}
            keyboardType="numeric"
            value={amount}
            onChangeText={(amount) => setAmount(amount)}
          />
          <TextInputMask
            placeholder="Номер карты"
            style={styles.input}
            type={"credit-card"}
            value={card}
            onChangeText={(text) => setCard(text)}
            options={{
              obfuscated: false,
              issuer: "visa-or-mastercard",
            }}
          />
          <TouchableOpacity
            style={styles.btnCont}
            onPress={handleWithdrawal}
            disabled={loading || (!amount && !card)}
          >
            {isLoading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.btnText}>Вывести</Text>
            )}
          </TouchableOpacity>
        </View>
        <Transactions
          transactions={transactions}
          loading={loading}
          error={error}
        />
      </ScrollView>
    </View>
  );
}
