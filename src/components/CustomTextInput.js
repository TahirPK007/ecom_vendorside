import {View, Text, Dimensions, TextInput} from 'react-native';
import React from 'react';

const CustomTextInput = ({placeholder, value, onChangeText, type}) => {
  return (
    <View
      style={{
        width: Dimensions.get('window').width - 100,
        height: 50,
        borderWidth: 1,
        borderRadius: 10,
        alignSelf: 'center',
        marginTop: 20,
        paddingLeft: 10,
      }}>
      <TextInput
        placeholder={placeholder}
        value={value}
        keyboardType={type ? type : 'default'}
        onChangeText={txt => onChangeText(txt)}
      />
    </View>
  );
};

export default CustomTextInput;
