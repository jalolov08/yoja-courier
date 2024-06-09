import { View, Text, FlatList } from "react-native";
import React from "react";
import styles from "./aviableOrders.style";
import { TOrder } from "../../types/order.type";
import {
  Entypo,
  FontAwesome,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
export default function AviableOrders({ orders }: { orders: TOrder[] }) {
  const Item = ({ order }: { order: TOrder }) => (
    <View style={styles.orderCont}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Ionicons name="location" size={24} color="#006970" />
        <Text style={styles.location}>
          {order.clientPoint.city} {order.clientPoint.street}{" "}
          {order.clientPoint.apartment}
        </Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-around",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginTop: 10,
          }}
        >
          <MaterialCommunityIcons
            name="weight-kilogram"
            size={20}
            color="#006970"
          />
          <Text style={styles.text}>{order.weight}кг</Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginTop: 10,
          }}
        >
          <FontAwesome name="road" size={20} color="#006970" />
          <Text style={styles.text}>{order.distance}км</Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginTop: 10,
          }}
        >
          <Entypo name="shop" size={20} color="#006970" />
          <Text style={styles.text}>{order.points.length}</Text>
        </View>
      </View>

      <Text style={styles.price}>{order.deliveryAmount}₽</Text>
    </View>
  );
  return (
    <FlatList
      scrollEnabled={false}
      showsVerticalScrollIndicator={false}
      data={orders}
      renderItem={({ item }: { item: TOrder }) => <Item order={item} />}
      keyExtractor={(item) => item._id}
    />
  );
}
