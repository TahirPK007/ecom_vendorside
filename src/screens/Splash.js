import {View, Text, StatusBar} from 'react-native';
import React, {useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Splash = () => {
  const navigation = useNavigation();

  const checkLogin = async () => {
    const userid = await AsyncStorage.getItem('userid');
    if (userid != null) {
      navigation.navigate('Main');
    } else {
      navigation.navigate('Login');
    }
  };

  useEffect(() => {
    setTimeout(() => {
      checkLogin();
    }, 2000);
  }, []);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'orange',
      }}>
      <StatusBar backgroundColor={'orange'} barStyle={'light-content'} />
      <Text style={{fontSize: 30, color: 'white', fontWeight: 'bold'}}>
        Vendor App
      </Text>
    </View>
  );
};

export default Splash;
