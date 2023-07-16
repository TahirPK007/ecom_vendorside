import {View, Text, TouchableOpacity, Image} from 'react-native';
import React, {useState} from 'react';
import Products from '../tabs/Products';
import Orders from '../tabs/Orders';
import {useNavigation} from '@react-navigation/native';

const Main = () => {
  const navigation = useNavigation();
  const [selectedtab, setselectedtab] = useState(0);

  return (
    <View style={{flex: 1}}>
      {selectedtab == 0 ? <Products /> : <Orders />}
      <View
        style={{
          backgroundColor: 'white',
          position: 'absolute',
          bottom: 0,
          width: '100%',
          elevation: 5,
          height: 80,
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-evenly',
        }}>
        <TouchableOpacity
          onPress={() => {
            setselectedtab(0);
          }}>
          <Image
            style={{
              height: 30,
              width: 30,
              tintColor: selectedtab == 0 ? 'orange' : 'black',
            }}
            source={require('../images/products.png')}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('AddProducts', {type: 'new'});
          }}>
          <Image
            style={{height: 50, width: 50, tintColor: 'orange'}}
            source={require('../images/add.png')}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setselectedtab(1);
          }}>
          <Image
            style={{
              height: 30,
              width: 30,
              tintColor: selectedtab == 1 ? 'orange' : 'black',
            }}
            source={require('../images/order.png')}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Main;
