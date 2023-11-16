import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';

type Props = {
  title: string;
  onCreate: () => void;
};

const CreateButton = (props: Props) => {
  return (
    <TouchableOpacity style={styles.createBtn} onPress={props.onCreate}>
      <Text style={styles.createText}>{props.title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  createBtn: {
    width: 340,
    padding: 5,
    borderRadius: 12,
    backgroundColor: '#5878E8',
    alignItems: 'center',
  },
  createText: {
    color: 'white',
    fontFamily: 'Pretendard',
    fontSize: 24,
    fontWeight: '900',
  },
});

export default CreateButton;
