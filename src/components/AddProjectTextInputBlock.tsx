import React from 'react';
import {Text, View} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';

type Props = {
  header: string;
  placeholder: string;
};

const AddProjectTextInputBlock = (props: Props) => {
  return (
    <View>
      <Text>{props.header}</Text>
      <TextInput placeholder={props.placeholder} />
    </View>
  );
};

export default AddProjectTextInputBlock;
