import React, { useEffect, useState } from "react";
import { View, Text, FlatList, ActivityIndicator } from "react-native";
import { API } from "../../../config";
import { TOrder } from "../../types/order.type";
import { Feather, FontAwesome } from "@expo/vector-icons";
import HistoryButton from "../../components/historyButtons/historyButton.component";
import { OrderStatus } from "../../types/order.type";
import styles from "./history.style";
import useGetRequest from "../../hooks/useGetRequest";

export default function History() {
  const [selectedFilter, setSelectedFilter] = useState(null);
  const { data, loading, error, refresh } = useGetRequest(
    `${API}/courier/my-orders`
  );
  const [orders, setOrders] = useState<TOrder[]>([]);

  useEffect(() => {
    if (data) {
      setOrders(data.orders);
    }
  }, [data]);

  const handleFilterSelect = (filter: OrderStatus | null) => {
    setSelectedFilter(filter);
  };

  const filteredOrders = selectedFilter
    ? orders.filter((order) => {
        if (selectedFilter === OrderStatus.Delivered) {
          return order.status === selectedFilter;
        } else {
          return order.status !== OrderStatus.Delivered;
        }
      })
    : orders;

  const renderItem = ({ item }: { item: TOrder }) => (
    <View style={styles.orderCont}>
      <Text style={styles.orderTitle}>Order {item.trackingId}</Text>
      <View style={styles.iconTextCont}>
        <Feather name="home" size={22} color="#006970" />
        <Text style={styles.location}>
          {item.clientPoint.city} {item.clientPoint.street}{" "}
          {item.clientPoint.apartment}
        </Text>
      </View>
      <View style={styles.iconTextCont}>
        <Feather name="clock" size={22} color="#006970" />
        <Text style={styles.location}>{item.status}</Text>
      </View>
      <View style={styles.iconTextCont}>
        <FontAwesome name="rouble" size={22} color="#006970" />
        <Text style={styles.location}>{item.deliveryAmount}</Text>
      </View>
    </View>
  );

  const listEmpty = () => {
    if (!loading && filteredOrders.length === 0) {
      return <Text style={styles.empty}>Нет заказов</Text>;
    } else if (loading) {
      return (
        <ActivityIndicator
          size="large"
          color="#006970"
          style={{ marginTop: 80 }}
        />
      );
    } else {
      return null;
    }
  };

  const handleRefresh = () => {
    refresh();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>История Заказов</Text>
      <HistoryButton
        onSelectFilter={handleFilterSelect}
        activeFilter={selectedFilter}
      />
      <FlatList
        data={filteredOrders}
        renderItem={renderItem}
        keyExtractor={(item) => item.trackingId.toString()}
        ListEmptyComponent={listEmpty}
        onRefresh={handleRefresh}
        refreshing={loading}
      />
    </View>
  );
}
