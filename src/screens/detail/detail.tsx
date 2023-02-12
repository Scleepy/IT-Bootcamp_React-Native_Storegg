import React, {useState} from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  Image,
  ActivityIndicator,
  ScrollView,
  Pressable,
  Modal,
} from 'react-native';
import ArrowLeft from '../../assets/ArrowLeft';
import {add, deduct} from '../../redux/reducers/coins';
import {addProduct, removeProduct} from '../../redux/reducers/myProducts';
import {store} from '../../redux/storeConfig';

interface Props {
  navigation: any;
  route: any;
}

const Detail = ({navigation, route}: Props) => {
  const {item, isBuyMenu} = route.params;
  const [isLoading, setIsLoading] = useState(true);
  const [visible, setVisible] = useState(false);

  const [status, setStatus] = useState('');
  const [message, setMessage] = useState('');

  let coins = store.getState().coin.coins;

  const buyItem = () => {
    if (coins - item.price >= 0) {
      setStatus('Success!');
      setMessage(
        item.title +
          ' was bought successfully! Your current balance is: ' +
          (coins - item.price).toFixed(2).toString() +
          '.',
      );

      let currentId = store.getState().myProduct.currentId;

      const insertItem = {
        price: item.price,
        id: currentId,
        image: item.image,
        title: item.title,
        description: item.description,
      };

      store.dispatch(addProduct(insertItem));
      store.dispatch(deduct(item.price));
    } else {
      setStatus('Failed!');
      setMessage(
        'Insufficient balance! Your current balance is: ' +
          coins.toFixed(2).toString(),
      );
    }

    setVisible(true);
  };

  const sellItem = () => {
    setStatus('Success!');
    setMessage(
      item.title +
        ' was sold successfully! Your current balance is: ' +
        (coins + item.price).toFixed(2).toString() +
        '.',
    );

    store.dispatch(removeProduct(item));
    store.dispatch(add(item.price));

    setVisible(true);
  };

  const closeModal = () => {
    setVisible(false);
    navigation.navigate('Home');
  };

  return (
    <View style={styles.detailContainer}>
      <View style={styles.detailOuterContainer}>
        <View style={styles.detailBackHeader}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <ArrowLeft />
          </TouchableOpacity>
          <Text style={styles.detailBackHeaderText}>
            {item.title.substring(0, 25) + '...'}
          </Text>
        </View>
        <View style={styles.productContainer}>
          <ScrollView style={styles.scrollViewContainer}>
            <Image
              source={{
                uri: item.image,
              }}
              onLoadEnd={() => setIsLoading(false)}
              style={styles.imageAttribute}
            />
            {isLoading && (
              <View>
                <ActivityIndicator size="large" />
              </View>
            )}

            <View style={styles.productContent}>
              <Text style={styles.bigTitle}>{item.title}</Text>
              <Text style={styles.productTitleSmall}>Price</Text>
              <Text style={styles.productText}>{item.price} Coins</Text>
              <Text style={styles.productTitleSmall}>Description</Text>
              <Text style={styles.productText}>{item.description}</Text>
            </View>

            {isBuyMenu ? (
              <Pressable style={styles.buyButton} onPress={() => buyItem()}>
                <Text style={styles.buyText}>Buy</Text>
              </Pressable>
            ) : (
              <Pressable style={styles.sellButton} onPress={() => sellItem()}>
                <Text style={styles.sellText}>Sell</Text>
              </Pressable>
            )}
          </ScrollView>

          <Modal visible={visible} transparent={true}>
            <View style={styles.backgroundDim}>
              <View style={styles.modalBox}>
                <View style={styles.innerModal}>
                  <View>
                    <Text style={styles.bigTitle}>{status}</Text>
                    <Text style={styles.productText}>{message}</Text>
                  </View>
                  <Pressable
                    style={styles.okButton}
                    onPress={() => closeModal()}>
                    <Text style={styles.sellText}>Ok</Text>
                  </Pressable>
                </View>
              </View>
            </View>
          </Modal>
        </View>
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
    backgroundColor: '#F7F7F7',
    paddingTop: 10,
    width: '100%',
    height: '100%',
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
    height: '94%',
  },
  imageAttribute: {
    height: 350,
    width: '100%',
    resizeMode: 'contain',
  },
  productContent: {
    borderTopWidth: 1,
    borderTopColor: '#434242',
    paddingTop: 10,
    paddingBottom: 50,
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
    backgroundColor: '#F7F7F7',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
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
    color: '#F7F7F7',
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
    backgroundColor: '#F7F7F7',
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

export default Detail;
