import {
  View,
  Text,
  FlatList,
  Image,
  Modal,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';

const Orders = () => {
  const [orders, setorders] = useState([]);
  const [visible, setvisible] = useState(false);
  const [id, setid] = useState('');
  console.log(orders, 'orderss');
  useEffect(() => {
    getOrders();
  }, []);

  const getOrders = async () => {
    const userId = await AsyncStorage.getItem('userid');
    firestore()
      .collection('orders')
      .where('userid', '==', userId)
      .get()
      .then(snapshot => {
        setorders(snapshot.docs);
      });
  };

  const changeStatus = status => {
    firestore().collection('orders').doc(id).update({
      status: status,
    });
  };

  return (
    <View style={{flex: 1}}>
      <FlatList
        data={orders}
        renderItem={({item, index}) => {
          return (
            <View
              style={{
                width: '90%',
                flexDirection: 'row',
                alignSelf: 'center',
                height: 100,
                marginTop: 20,
                backgroundColor: 'white',
                alignItems: 'center',
                paddingLeft: 10,
              }}>
              <Image
                source={{uri: item._data.productImage}}
                style={{width: 70, height: 70, borderRadius: 10}}
              />
              <View style={{marginLeft: 10, width: '50%'}}>
                <Text style={{fontSize: 18, color: 'black'}}>
                  {item._data.productname}
                </Text>
                <Text style={{fontSize: 15, color: 'black'}}>
                  {item._data.productdesc}
                </Text>
              </View>
              <Text
                style={{color: 'green', fontSize: 18}}
                onPress={() => {
                  setvisible(true);
                  setid(item._data.orderId);
                }}>
                {item._data.status}
              </Text>
            </View>
          );
        }}
      />
      <Modal visible={visible} transparent>
        <View
          style={{
            flex: 1,
            backgroundColor: 'rgba(0,0,0,0.5)',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View
            style={{
              backgroundColor: 'white',
              borderRadius: 10,
              width: '90%',
              paddingBottom: 20,
            }}>
            <FlatList
              data={['Reject', 'Dispatch', 'Order Placed', 'Completed']}
              renderItem={({item, index}) => {
                return (
                  <TouchableOpacity
                    style={{
                      width: '100%',
                      height: 50,
                      justifyContent: 'center',
                      borderBottomWidth: 1,
                      paddingLeft: 20,
                    }}
                    onPress={() => {
                      changeStatus(
                        index == 0
                          ? 'Rejected'
                          : index == 1
                          ? 'Dispatched'
                          : index == 2
                          ? 'Order Place'
                          : 'Completed',
                      );
                      setvisible(false);
                    }}>
                    <Text>{item}</Text>
                  </TouchableOpacity>
                );
              }}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Orders;
