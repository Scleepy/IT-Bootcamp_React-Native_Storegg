import React, {useState} from 'react';
import {Text, TouchableOpacity, View, StyleSheet, FlatList} from 'react-native';
import ArrowLeft from '../../assets/ArrowLeft';
import {store} from '../../redux/storeConfig';
import ProductRow from '../home/components/productRow';

interface Props {
  navigation: any;
}

const MyProducts = ({navigation}: Props) => {
  myProducts = store.getState().myProduct.myProducts;

  return (
    <View style={styles.detailContainer}>
      <View style={styles.detailOuterContainer}>
        <View style={styles.detailBackHeader}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <ArrowLeft />
          </TouchableOpacity>
          <Text style={styles.detailBackHeaderText}>My Products</Text>
        </View>

        <FlatList
          data={myProducts}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('Detail', {item: item, isBuyMenu: false})
              }>
              <ProductRow
                image={item.image}
                title={item.title}
                price={item.price}
              />
            </TouchableOpacity>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  detailBackHeader: {
    flexDirection: 'row',
    paddingBottom: 15,
  },
  detailContainer: {
    backgroundColor: '#FFFBF5',
    paddingTop: 10,
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center',
  },
  detailOuterContainer: {
    width: '90%',
  },
  detailBackHeaderText: {
    color: '#434242',
    fontWeight: 'bold',
    fontSize: 20,
  },
  productContainer: {
    width: '100%',
    alignItems: 'center',
    height: '93%',
  },
  imageAttribute: {
    height: 350,
    width: '100%',
  },
  productContent: {
    borderTopWidth: 1,
    borderTopColor: '#434242',
    paddingTop: 10,
    paddingBottom: 40,
    width: '100%',
  },
  bigTitle: {
    textAlign: 'justify',
    color: '#434242',
    fontWeight: 'bold',
    fontSize: 22,
  },
  productTitleSmall: {
    paddingTop: 10,
    color: '#434242',
    fontWeight: 'bold',
    fontSize: 20,
  },
  productText: {
    textAlign: 'justify',
    color: '#434242',
    fontSize: 16,
  },
  sellButton: {
    width: '100%',
    height: 50,
    borderRadius: 8,
    backgroundColor: '#FFFBF5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buyButton: {
    width: '100%',
    height: 50,
    borderRadius: 8,
    backgroundColor: '#A084DC',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buyText: {
    color: '#FFFBF5',
    fontWeight: 'bold',
    fontSize: 20,
  },
  sellText: {
    color: '#A084DC',
    fontWeight: 'bold',
    fontSize: 20,
  },
  scrollViewContainer: {
    width: '100%',
  },
  backgroundDim: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalBox: {
    backgroundColor: '#FFFBF5',
    height: 200,
    width: '90%',
    borderRadius: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  innerModal: {
    height: 180,
    width: '85%',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  okButton: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
});

export default MyProducts;
