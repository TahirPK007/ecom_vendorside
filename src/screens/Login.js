import {View, Text, Image, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import CustomTextInput from '../components/CustomTextInput';
import CustomButton from '../components/CustomButton';
import {useNavigation} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const loginUser = () => {
    firestore()
      .collection('vendors')
      .where('email', '==', email)
      .get()
      .then(snapshot => {
        if (snapshot.docs != []) {
          if (snapshot.docs[0].data().password == password) {
            goToNextScreen(snapshot.docs[0].data());
          }
        }
      });
  };

  const goToNextScreen = async data => {
    await AsyncStorage.setItem('name', data.name);
    await AsyncStorage.setItem('email', data.email);
    await AsyncStorage.setItem('mobile', data.mobile);
    await AsyncStorage.setItem('userid', data.userid);
    navigation.navigate('Main');
  };
  return (
    <View style={{flex: 1}}>
      <Image
        style={{height: 250, width: '100%'}}
        source={require('../images/banner.jpg')}
      />

      <View
        style={{
          width: '95%',
          height: '100%',
          backgroundColor: 'white',
          position: 'absolute',
          top: 200,
          elevation: 5,
          borderTopLeftRadius: 40,
          borderTopRightRadius: 40,
          alignSelf: 'center',
        }}>
        <Text
          style={{
            alignSelf: 'center',
            fontSize: 30,
            fontWeight: '500',
            color: 'orange',
            marginTop: 20,
          }}>
          Login
        </Text>
        <CustomTextInput
          placeholder={'Enter Your Email'}
          value={email}
          onChangeText={txt => setEmail(txt)}
        />
        <CustomTextInput
          placeholder={'Enter Your Password'}
          value={password}
          onChangeText={txt => setPassword(txt)}
        />

        <CustomButton
          title={'Login'}
          onClick={() => {
            loginUser();
          }}
        />
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: 60,
            justifyContent: 'center',
          }}>
          <Text style={{color: 'black'}}>Don't Have Account?</Text>
          <Text
            style={{
              marginLeft: 10,
              color: 'orange',
              fontSize: 20,
              fontWeight: '600',
            }}
            onPress={() => {
              navigation.navigate('Signup');
            }}>
            Create Account?
          </Text>
        </View>
      </View>
    </View>
  );
};
export default Login;
