import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useEffect, useState } from 'react';
import { Image } from 'react-native';

import api from '../../services/api';
import formatValue from '../../utils/formatValue';

import {
  Container,
  Header,
  HeaderTitle,
  FoodsContainer,
  FoodList,
  Food,
  FoodImageContainer,
  FoodContent,
  FoodTitle,
  FoodDescription,
  FoodPricing,
} from './styles';

interface FoodItem {
  id: number;
  name: string;
  description: string;
  price: number;
  formattedValue: string;
  thumbnail_url: string;
}

const Orders: React.FC = () => {
  const [orders, setOrders] = useState<FoodItem[]>([]);

  useEffect(() => {
    async function loadOrders(): Promise<void> {
      const response = await api.get('orders');

      setOrders([
        ...response.data.map((order: FoodItem) => {
          return {
            ...order,
            formattedValue: formatValue(order.price),
          };
        }),
      ]);
    }

    loadOrders();
  }, []);

  // useFocusEffect(
  //   useCallback(() => {
  //     async function loadOrders(): Promise<void> {
  //       const response = await api.get('orders');

  //       setOrders([
  //         ...response.data.map((order: FoodItem) => {
  //           return {
  //             ...order,
  //             formattedValue: formatValue(order.price),
  //           };
  //         }),
  //       ]);
  //     }

  //     loadOrders();
  //   }, []),
  // );

  return (
    <Container>
      <Header>
        <HeaderTitle>Meus pedidos</HeaderTitle>
      </Header>

      <FoodsContainer>
        <FoodList
          data={orders}
          keyExtractor={item => String(item.id)}
          renderItem={({ item }) => (
            <Food key={item.id} activeOpacity={0.6}>
              <FoodImageContainer>
                <Image
                  style={{ width: 88, height: 88 }}
                  source={{ uri: item.thumbnail_url }}
                />
              </FoodImageContainer>
              <FoodContent>
                <FoodTitle>{item.name}</FoodTitle>
                <FoodDescription>{item.description}</FoodDescription>
                <FoodPricing>{item.formattedValue}</FoodPricing>
              </FoodContent>
            </Food>
          )}
        />
      </FoodsContainer>
    </Container>
  );
};

export default Orders;
