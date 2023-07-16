import {View, Text, Dimensions, TouchableOpacity} from 'react-native';
import React from 'react';

const CustomButton = ({title, onClick}) => {
  return (
    <TouchableOpacity
      style={{
        height: 50,
        backgroundColor: 'orange',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        width: Dimensions.get('window').width - 100,
        marginTop: 40,
        borderRadius: 10,
      }}
      onPress={() => {
        onClick();
      }}>
      <Text style={{color: 'white'}}>{title}</Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
