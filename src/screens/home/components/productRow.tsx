import React, {useState} from 'react';
import {View, Text, Image, StyleSheet, ActivityIndicator} from 'react-native';

interface Product {
  title: string;
  price: number;
  image: string;
}

const ProductRow = ({image, title, price}: Product) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <View style={styles.rowContainer}>
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
        <Text style={styles.itemTitle}>{title}</Text>
        <Text style={styles.itemPrice}>{price} Coins</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  rowContainer: {
    marginTop: 15,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  imageContainer: {
    width: 60,
    height: 60,
  },
  textContainer: {
    paddingLeft: 10,
    width: '70%',
  },
  itemTitle: {
    color: '#434242',
    fontWeight: 'bold',
  },
  itemPrice: {
    color: '#434242',
  },
});
export default ProductRow;
