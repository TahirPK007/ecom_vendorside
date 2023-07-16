import {View, Text, ActivityIndicator, Dimensions} from 'react-native';
import React from 'react';
import {Modal} from 'react-native';

const Loader = ({visible}) => {
  return (
    <Modal visible={visible} transparent>
      <View
        style={{
          position: 'absolute',
          backgroundColor: 'rgba(0,0,0,0.5)',
          justifyContent: 'center',
          alignItems: 'center',
          width: Dimensions.get('window').width,
          height: Dimensions.get('window').height,
        }}>
        <View
          style={{
            width: 100,
            height: 100,
            borderRadius: 10,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'white',
          }}>
          <ActivityIndicator size={'large'} />
        </View>
      </View>
    </Modal>
  );
};

export default Loader;
