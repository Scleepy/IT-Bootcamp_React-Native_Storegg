import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import {StackNavigationProp} from 'react-navigation-stack/lib/typescript/src/vendor/types';
import GridViewIcon from '../../../assets/GridViewIcon';
import ListViewIcon from '../../../assets/ListViewIcon';
import {useProductData} from '../../../redux/productHook';
import {toggleList} from '../../../redux/reducers/view';
import {store} from '../../../redux/storeConfig';
import ProductGrid from './productGrid';
import ProductRow from './productRow';

interface Props {
  queryInput: string;
  navigation: StackNavigationProp<any>;
}

const ProductBody = ({queryInput, navigation}: Props) => {
  const products = useProductData().products;

  const [isFlatList, setIsFlatList] = useState(
    store.getState().isFlatList.isFlatList,
  );

  const switchView = () => {
    setIsFlatList(!isFlatList);
    store.dispatch(toggleList());
  };

  const filtered = products.filter(product =>
    product.title.toLowerCase().includes(queryInput),
  );

  return (
    <View style={styles.bodyContainer}>
      <View style={styles.bodyContainerHeader}>
        <Text style={styles.productHeader}>Available Products</Text>
        <TouchableOpacity onPress={switchView}>
          {isFlatList ? <ListViewIcon /> : <GridViewIcon />}
        </TouchableOpacity>
      </View>
      <View style={styles.productList}>
        {isFlatList ? (
          <FlatList
            key="#"
            data={filtered}
            renderItem={({item}) => (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('Detail', {item: item, isBuyMenu: true})
                }>
                <ProductRow
                  image={item.image}
                  title={item.title}
                  price={item.price}
                />
              </TouchableOpacity>
            )}
            numColumns={1}
            keyExtractor={item => item.id}
          />
        ) : (
          <FlatList
            columnWrapperStyle={styles.gridContainer}
            key="_"
            data={filtered}
            renderItem={({item}) => (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('Detail', {item: item, isBuyMenu: true})
                }>
                <ProductGrid
                  image={item.image}
                  title={item.title}
                  price={item.price}
                />
              </TouchableOpacity>
            )}
            keyExtractor={item => item.id}
            numColumns={2}
          />
        )}
        <View style={styles.eggMinigameContainer}>
          <TouchableOpacity
            style={styles.eggMinigame}
            onPress={() => {
              navigation.navigate('Minigame');
            }}>
            <Image
              source={require('../../../assets/egg-full.png')}
              style={styles.eggIcon}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  bodyContainer: {
    paddingTop: 10,
    backgroundColor: '#F7F7F7',
    borderRadius: 10,
    height: '90%',
    alignItems: 'center',
  },
  bodyContainerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '80%',
  },
  productHeader: {
    color: '#434242',
    fontWeight: 'bold',
    fontSize: 20,
  },
  productList: {
    paddingTop: 10,
    height: '78%',
    width: '80%',
  },
  gridContainer: {
    justifyContent: 'space-between',
    width: '100%',
  },
  eggIcon: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },
  eggMinigame: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 50,
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  eggMinigameContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingTop: 20,
  },
});
export default ProductBody;
