import {
  View,
  Text,
  Keyboard,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import styles from "./verify.style";
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from "react-native-confirmation-code-field";
import { useAuth } from "../../contexts/AuthContext/auth.context";
const CELL_COUNT = 4;

export default function Verify() {
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [props] = useClearByFocusCell({
    value,
    setValue,
  });
  const { onVerify } = useAuth();
  const isFilled = value.length === CELL_COUNT;
  const handleVerify = async () => {
    setLoading(true);
    Keyboard.dismiss();
    const res = await onVerify(value);
    if (res.data.token) {
      console.log(res.data.message);
    } else {
      Alert.alert(res.data.error);
      setValue("");
    }
    if (!res.data.userExist && res.data.token) {
      // navigation.navigate("FillProfile");
    }

    setLoading(false);
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Потвердите номер</Text>
      <Text style={styles.subTitle}>
        Пожалуйста, введите код, присланный на ваш номер
      </Text>
      <CodeField
        ref={ref}
        {...props}
        value={value}
        rootStyle={{ marginTop: 50 }}
        onChangeText={setValue}
        cellCount={CELL_COUNT}
        keyboardType="number-pad"
        textContentType="oneTimeCode"
        onSubmitEditing={() => Keyboard.dismiss()}
        renderCell={({ index, symbol, isFocused }) => (
          <View
            key={index}
            style={[
              styles.cell,
              {
                backgroundColor: isFocused ? "#ffffff1a" : "#ffffff0d",
              },
            ]}
          >
            <Text style={styles.cellText}>
              {symbol || (isFocused ? <Cursor /> : null)}
            </Text>
          </View>
        )}
      />
      <TouchableOpacity
        style={[styles.btnCont, { opacity: loading || !isFilled ? 0.5 : 1 }]}
        disabled={loading || !isFilled}
        onPress={handleVerify}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.btnText}>Потвердить</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}
