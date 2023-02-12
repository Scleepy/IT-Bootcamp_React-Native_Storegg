import React, {useState} from 'react';
import {Text, StyleSheet, View, TouchableOpacity} from 'react-native';
import MyCoins from './components/myCoins';
import ProductBody from './components/productBody';
import SearchBox from './components/search';

const Home = ({navigation}: {navigation: any}) => {
  const [query, setQuery] = useState('');

  const onHandleInput = (inputText: string) => {
    setQuery(inputText.toLowerCase());
  };

  return (
    <View style={styles.outerContainer}>
      <View style={styles.appContainer}>
        <SearchBox onHandleInput={onHandleInput} />
        <View style={styles.myProductCoinContainer}>
          <TouchableOpacity
            style={styles.productButton}
            onPress={() => navigation.navigate('MyProducts')}>
            <Text style={styles.productButtonText}>My Products</Text>
          </TouchableOpacity>
          <MyCoins />
        </View>
      </View>
      <View style={styles.bodyContainer}>
        <ProductBody queryInput={query} navigation={navigation} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    backgroundColor: '#A084DC',
  },
  appContainer: {
    paddingTop: 20,
    backgroundColor: '#A084DC',
    justifyContent: 'center',
    alignItems: 'center',
    height: '20%',
  },
  productButton: {
    backgroundColor: '#F7F7F7',
    padding: 10,
    borderRadius: 5,
    height: '70%',
  },
  productButtonText: {
    color: '#191919',
    fontSize: 13,
  },
  myProductCoinContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    paddingTop: 15,
  },
  bodyContainer: {
    width: '100%',
  },
});

export default Home;
