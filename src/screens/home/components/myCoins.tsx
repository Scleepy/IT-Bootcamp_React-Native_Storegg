import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import {RootState} from '../../../redux/storeConfig';

const MyCoins = () => {
  let coins = useSelector((state: RootState) => state.coin.coins);

  return (
    <View style={styles.coinContainer}>
      <Text style={styles.coinAmount}>{coins.toFixed(2)}</Text>
      <Text>{'My Coins'}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  coinContainer: {
    borderWidth: 1,
    borderColor: '#F7F7F7',
    backgroundColor: '#F7F7F7',
    borderRadius: 5,
    paddingLeft: 20,
    paddingRight: 15,
    justifyContent: 'flex-end',
  },
  coinAmount: {
    color: '#645CBB',
    fontWeight: 'bold',
    fontSize: 25,
  },
});

export default MyCoins;
