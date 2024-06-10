import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  Pressable,
} from "react-native";
import {
  TOrder,
  Point,
  OrderSellerProduct,
  OrderProduct,
} from "../../types/order.type";
import styles from "./orderDetails.style";
import Back from "../../components/Back/back.component";
import { FontAwesome } from "@expo/vector-icons";
import useGetRequest from "../../hooks/useGetRequest";
import { API } from "../../../config";

export default function OrderDetails({ route }) {
  const { order }: { order: TOrder } = route.params;
  const allPoints: Point[] = [...order.points, order.clientPoint];
  const { data, loading, error } = useGetRequest(
    `${API}/order/${order._id}/products`
  );
  const [products, setProducts] = useState<OrderSellerProduct[]>();
  useEffect(() => {
    if (data) {
      setProducts(data.sellerProducts);
    }
  }, [data]);

  const renderItem = ({ item }: { item: Point }) => (
    <View style={styles.pointContainer}>
      <FontAwesome name="map-marker" size={24} color="#28B877" />
      <Text style={styles.pointText}>
        {item.city} {item.street} {item.apartment} эт.{item.floor}
      </Text>
    </View>
  );
  const renderProductItem = ({ item }: { item: OrderProduct }) => (
    <View style={styles.productCont}>
      <Image
        source={{ uri: API + `/${item.photoUri}` }}
        style={styles.productImage}
      />
      <View>
        <Text style={styles.productName}>{item.title}</Text>
        <Text style={styles.productQuantity}>
          {item.selectedOption} , {item.quantity} шт
        </Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Back title="Детали доставки" />
      <ScrollView
        style={{ paddingHorizontal: 24 }}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.pointTitle}>Точки сбора</Text>
        <FlatList
          data={allPoints}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
        />
        <View style={{ marginVertical: 10 }}>
          <Text style={styles.label}>Получатель</Text>
          <Text style={styles.text}>{order.clientName}</Text>
        </View>
        <View style={{ marginVertical: 10 }}>
          <Text style={styles.label}>Телефон получателя</Text>
          <Text style={styles.text}>{order.clientPhone}</Text>
        </View>
        <View style={{ marginVertical: 10 }}>
          <Text style={styles.label}>Стоимость доставки</Text>
          <Text style={styles.text}>{order.deliveryAmount}₽</Text>
        </View>
        <View style={{ marginVertical: 10 }}>
          <Text style={styles.label}>Дистанция</Text>
          <Text style={styles.text}>{order.distance}км</Text>
        </View>
        <View style={{ marginVertical: 10 }}>
          <Text style={styles.label}>Вес</Text>
          <Text style={styles.text}>{order.weight}кг</Text>
        </View>
        <Text style={styles.pointTitle}>Товары</Text>
      <View style={{marginBottom:100}}>
      {loading ? (
          <ActivityIndicator
            size="large"
            color="#006970"
            style={{ marginTop: 40 }}
          />
        ) : (
          products?.map((sellerProduct, index) => (
            <View key={index} style={{ marginVertical: 10 }}>
              <View style={styles.sellerCont}>
                <Image
                  source={{ uri: API + `/${sellerProduct.photoUri}` }}
                  style={styles.sellerImage}
                />
                <Text style={styles.sellerName}>{sellerProduct.name}</Text>
              </View>
              <FlatList
                data={sellerProduct.products}
                renderItem={renderProductItem}
                keyExtractor={(item, index) => index.toString()}
              />
            </View>
          ))
        )}
      </View>
      </ScrollView>
      <Pressable style={styles.mapBtnCont}>
        <Text style={styles.mapBtnText}>Карта</Text>
      </Pressable>
      <Pressable style={styles.takeBtnCont}>
        <Text style={styles.takeBtnText}>Взять</Text>
      </Pressable>
    </View>
  );
}
