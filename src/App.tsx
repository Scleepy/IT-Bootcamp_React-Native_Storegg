import React from 'react';
import {Provider} from 'react-redux';
import {store, persistor} from './redux/storeConfig';
import {PersistGate} from 'redux-persist/integration/react';
import Home from './screens/home/home';
import Detail from './screens/detail/detail';
import MyProducts from './screens/myProducts/myProducts';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import Minigame from 'minigame';
import {LogBox} from 'react-native';
import {add} from './redux/reducers/coins';

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);

const Stack = createNativeStackNavigator();

const App = () => {
  const onHandleCoins = (countAmount: number) => {
    store.dispatch(add(countAmount));
  };

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="Home"
              component={Home}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="MyProducts"
              component={MyProducts}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Detail"
              component={Detail}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Minigame"
              component={Minigame}
              initialParams={{onHandleCoins: onHandleCoins}}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};
export default App;
