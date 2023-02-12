import React, {useState} from 'react';
import {View, Text, Image, StyleSheet, ActivityIndicator} from 'react-native';

interface Product {
  title: string;
  price: number;
  image: string;
}

const ProductGrid = ({image, title, price}: Product) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <View style={styles.gridContainer}>
      <Image
        source={{
          uri: image,
        }}
        onLoadEnd={() => setIsLoading(false)}
        style={styles.imageContainer}
      />
      {isLoading && (
        <View>
          <ActivityIndicator size="large" />
        </View>
      )}
      <View style={styles.textContainer}>
        <Text style={styles.itemTitle}>{title.substring(0, 23) + '...'}</Text>
        <Text style={styles.itemPrice}>{price} Coins</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  gridContainer: {
    width: 145,
    height: 155,
    marginTop: 15,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  imageContainer: {
    width: 70,
    height: 80,
  },
  textContainer: {
    width: '90%',
  },
  itemTitle: {
    color: '#434242',
    fontWeight: 'bold',
  },
  itemPrice: {
    color: '#434242',
  },
});
export default ProductGrid;
