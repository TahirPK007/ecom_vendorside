import {
  View,
  Text,
  FlatList,
  Dimensions,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';
import {useIsFocused} from '@react-navigation/native';
import {useNavigation} from '@react-navigation/native';

const Products = () => {
  const [productList, setproductList] = useState([]);
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const getProducts = async () => {
    const userid = await AsyncStorage.getItem('userid');
    firestore()
      .collection('products')
      .where('userid', '==', userid)
      .get()
      .then(snapshot => {
        console.log(snapshot.docs[0].data());
        if (snapshot.docs != []) {
          setproductList(snapshot.docs);
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  const deleteItem = item => {
    firestore()
      .collection('products')
      .doc(item._data.productid)
      .delete()
      .then(() => {
        console.log('User deleted!');
        getProducts();
      });
  };
  useEffect(() => {
    getProducts();
  }, [isFocused]);

  return (
    <View style={{flex: 1}}>
      <View>
        <FlatList
          data={productList}
          renderItem={({item, index}) => {
            return (
              <View
                style={{
                  width: '90%',
                  height: 100,
                  flexDirection: 'row',
                  marginTop: 10,
                  paddingLeft: 20,
                  paddingRight: 20,
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Image
                    source={{uri: item._data.productImage}}
                    style={{height: 100, width: 100, borderRadius: 10}}
                  />
                  <View style={{marginLeft: 10}}>
                    <Text
                      style={{color: 'black', fontSize: 18, fontWeight: '600'}}>
                      {item._data.price}
                    </Text>
                    <Text style={{color: 'black'}}>
                      {item._data.productdesc}
                    </Text>
                    <Text style={{color: 'green'}}>{item._data.price}</Text>
                  </View>
                </View>

                <View>
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate('AddProducts', {
                        data: item,
                        type: 'edit',
                      });
                    }}>
                    <Image
                      style={{height: 30, width: 30}}
                      source={require('../images/edit.png')}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      deleteItem(item);
                      getProducts();
                    }}>
                    <Image
                      style={{height: 30, width: 30, marginTop: 20}}
                      source={require('../images/delete.png')}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            );
          }}
        />
      </View>
    </View>
  );
};

export default Products;
