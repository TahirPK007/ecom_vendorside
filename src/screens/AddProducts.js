import {View, Text, Switch} from 'react-native';
import React, {useState} from 'react';
import CustomTextInput from '../components/CustomTextInput';
import CustomButton from '../components/CustomButton';
import {Image} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import ImagePicker from 'react-native-image-picker';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import Loader from '../components/Loader';
import {useNavigation, useRoute} from '@react-navigation/native';

const AddProducts = () => {
  const route = useRoute();
  const [productName, setproductName] = useState(
    route.params.type == 'edit' ? route.params.data._data.productname : '',
  );
  const [productDesc, setproductDesc] = useState(
    route.params.type == 'edit' ? route.params.data._data.productdesc : '',
  );
  const [productPrice, setproductPrice] = useState(
    route.params.type == 'edit' ? route.params.data._data.price : '',
  );
  const [discountPrice, setdiscountPrice] = useState(
    route.params.type == 'edit' ? route.params.data._data.discountprice : '',
  );
  const [inStock, setinStock] = useState(
    route.params.type == 'edit' ? route.params.data._data.instock : true,
  );
  const [filePath, setFilePath] = useState({
    fileName: '',
    uri:
      route.params.type == 'edit' ? route.params.data._data.productImage : '',
  });
  const [visible, setvisible] = useState(false);

  const navigation = useNavigation();

  const chooseFile = type => {
    let options = {
      mediaType: type,
      maxWidth: 300,
      maxHeight: 550,
      quality: 1,
      includeBase64: true,
    };
    launchImageLibrary(options, response => {
      if (response.didCancel) {
        alert('User cancelled camera picker');
        return;
      } else if (response.errorCode == 'camera_unavailable') {
        alert('Camera not available on device');
        return;
      } else if (response.errorCode == 'permission') {
        alert('Permission not satisfied');
        return;
      } else if (response.errorCode == 'others') {
        alert(response.errorMessage);
        return;
      }
      setFilePath(response.assets[0]);
    });
  };

  const saveProducts = async () => {
    setvisible(true);
    const name = await AsyncStorage.getItem('name');
    const userid = await AsyncStorage.getItem('userid');
    const productid = uuid.v4();
    let url = '';
    if (filePath.fileName != '') {
      const reference = storage().ref(filePath.fileName);
      const pathToFile = filePath.uri;
      await reference.putFile(pathToFile);
      //uploading image to storage
      url = await storage().ref(filePath.fileName).getDownloadURL();
    }

    if (route.params.type == 'edit') {
      firestore()
        .collection('products')
        .doc(route.params.data._data.productid)
        .set({
          productid: route.params.data._data.productid,
          userid: userid,
          addedby: name,
          productname: productName,
          productdesc: productDesc,
          price: productPrice,
          discountprice: discountPrice,
          productImage:
            filePath.fileName == ''
              ? route.params.data._data.productImage
              : url,
          instock: inStock,
        })
        .then(res => {
          setvisible(false);
          console.log('successfully added product');
          navigation.goBack();
        })
        .catch(error => {
          setvisible(false);
          console.log('error occured while saving product');
        });
    } else {
      firestore()
        .collection('products')
        .doc(productid)
        .set({
          productid: productid,
          userid: userid,
          addedby: name,
          productname: productName,
          productdesc: productDesc,
          price: productPrice,
          discountprice: discountPrice,
          productImage: url,
          instock: inStock,
        })
        .then(res => {
          setvisible(false);
          console.log('successfully added product');
          navigation.goBack();
        })
        .catch(error => {
          setvisible(false);
          console.log('error occured while saving product');
        });
    }
  };

  return (
    <View style={{flex: 1}}>
      <Loader visible={visible} />
      <View
        style={{
          width: '90%',
          height: 200,
          borderWidth: 1,
          alignSelf: 'center',
          marginTop: 30,
          borderRadius: 10,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <TouchableOpacity
          style={{width: '100%', height: '100%'}}
          onPress={() => chooseFile('photo')}>
          <Image
            style={{width: 400, height: 200, borderRadius: 10}}
            source={{uri: filePath.uri}}
          />
        </TouchableOpacity>
      </View>
      <CustomTextInput
        placeholder={'Product Name'}
        value={productName}
        onChangeText={txt => setproductName(txt)}
      />
      <CustomTextInput
        placeholder={'Product Description'}
        value={productDesc}
        onChangeText={txt => setproductDesc(txt)}
      />
      <CustomTextInput
        placeholder={'Product Price'}
        value={productPrice}
        onChangeText={txt => setproductPrice(txt)}
      />
      <CustomTextInput
        placeholder={'Discount Price'}
        value={discountPrice}
        onChangeText={txt => setdiscountPrice(txt)}
      />
      <View
        style={{
          width: '90%',
          alignSelf: 'center',
          marginTop: 20,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingLeft: 30,
          paddingRight: 30,
        }}>
        <Text>In Stock</Text>
        <Switch
          value={inStock}
          onChange={() => {
            setinStock(!inStock);
          }}
        />
      </View>
      <CustomButton
        title={'Save Product'}
        onClick={() => {
          saveProducts();
        }}
      />
    </View>
  );
};

export default AddProducts;
