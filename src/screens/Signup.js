import {View, Text, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import CustomTextInput from '../components/CustomTextInput';
import CustomButton from '../components/CustomButton';
import {useNavigation} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import uuid from 'react-native-uuid';
import {Alert} from 'react-native';
import Loader from '../components/Loader';

const Signup = () => {
  const navigation = useNavigation();
  const [name, setname] = useState('');
  const [email, setemail] = useState('');
  const [mobile, setmobile] = useState('');
  const [password, setpassword] = useState('');
  const [confirmPassword, setconfirmPassword] = useState('');

  const [visible, setvisible] = useState(false);

  const registerVendor = () => {
    setvisible(true);
    const userid = uuid.v4();
    firestore()
      .collection('vendors')
      .doc(userid)
      .set({
        name: name,
        email: email,
        mobile: mobile,
        password: password,
        confirmPassword: confirmPassword,
        userid: userid,
      })
      .then(res => {
        setvisible(false);
        console.log('user created');
        navigation.goBack();
      })
      .catch(error => {
        setvisible(false);
        console.log(error);
      });
  };

  const validate = () => {
    let valid = true;
    if (name == '') {
      valid = false;
    }
    if (password !== confirmPassword) {
      valid = false;
    }
    return valid;
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
          Sign Up
        </Text>
        <CustomTextInput
          placeholder={'Enter Your Name'}
          value={name}
          onChangeText={txt => setname(txt)}
        />

        <CustomTextInput
          placeholder={'Enter Your Email'}
          value={email}
          onChangeText={txt => setemail(txt)}
        />
        <CustomTextInput
          placeholder={'Enter Your Mobile'}
          type={'number-pad'}
          value={mobile}
          onChangeText={txt => setmobile(txt)}
        />
        <CustomTextInput
          placeholder={'Enter Your Password'}
          value={password}
          onChangeText={txt => setpassword(txt)}
        />
        <CustomTextInput
          placeholder={'Enter Your Confirm Password'}
          value={confirmPassword}
          onChangeText={txt => setconfirmPassword(txt)}
        />
        <CustomButton
          title={'Sign Up'}
          onClick={() => {
            if (validate()) {
              registerVendor();
            } else {
              Alert.alert('Pls Check Entered Data');
            }
          }}
        />
      </View>
      <Loader visible={visible} />
    </View>
  );
};

export default Signup;
