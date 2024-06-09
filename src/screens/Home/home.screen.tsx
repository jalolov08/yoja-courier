import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Linking,
  ActivityIndicator,
  ScrollView,
  RefreshControl,
} from "react-native";
import * as Location from "expo-location";
import useGetOrders from "../../hooks/useGetOrders";
import Header from "../../components/Header/header.component";
import Balance from "../../components/Balance/balance.component";
import { TOrder } from "../../types/order.type";
import styles from "./home.style";
import AviableOrders from "../../components/AviableOrders/aviableOrders.component";

export default function Home() {
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null
  );
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const { fetchOrders, loading, error } = useGetOrders();
  const [orders, setOrders] = useState<TOrder[]>([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  useEffect(() => {
    const getLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Разрешение на доступ к местоположению было отклонено");
        return;
      }

      try {
        const location = await Location.getCurrentPositionAsync({});
        setLocation(location);
      } catch (error) {
        setErrorMsg("Не удалось получить местоположение");
      }
    };

    getLocation();
  }, []);
  const fetchNearbyOrders = async () => {
    if (location) {
      const response = await fetchOrders(
        location.coords.latitude,
        location.coords.longitude
      );
      setOrders(response.orders);
    }
  };
  useEffect(() => {
    fetchNearbyOrders();
  }, [location]);

  const onRefresh = async () => {
    setIsRefreshing(true);
    await fetchNearbyOrders();
    setIsRefreshing(false);
  };

  if (errorMsg) {
    return (
      <View style={styles.container}>
        <Header />
        <Balance />
        <Text style={styles.error}>{errorMsg}</Text>
        <TouchableOpacity
          style={styles.btnCont}
          onPress={() => Linking.openSettings()}
        >
          <Text style={styles.btnText}>Разрешить</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Header />
      <ScrollView showsVerticalScrollIndicator={false}
     refreshControl={
      <RefreshControl
        refreshing={isRefreshing}
        onRefresh={onRefresh}
        colors={["#006970"]}
      />
    }      
      >
        <Balance />
        <Text style={styles.title}>Доступные Заказы</Text>
        {loading ? (
          <ActivityIndicator
            size="large"
            color="#006970"
            style={{ marginTop: 40 }}
          />
        ) : error ? (
          <View>
            <Text>Ошибка при получение заказов</Text>
          </View>
        ) : (
          <AviableOrders orders={orders} />
        )}
      </ScrollView>
    </View>
  );
}
