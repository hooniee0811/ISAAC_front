import React from 'react';
import {Modal, StyleSheet, Text, View} from 'react-native';

type Props = {
  modalVisible: boolean;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

const WaitTaskModal = (props: Props) => {
  return (
    <Modal
      animationType={'slide'}
      transparent={true}
      visible={props.modalVisible}
      onRequestClose={() => {
        props.setModalVisible(false);
      }}>
      <View style={styles.container}>
        <Text style={styles.title}>Generating...</Text>
        <Text>Please wait a moment while ISAAC</Text>
        <Text>generates the tasks for you</Text>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  title: {
    fontFamily: 'Pretendard',
    fontSize: 32,
    fontWeight: '700',
    color: 'black',
  },
  desc: {
    fontFamily: 'Pretendard',
    fontSize: 16,
    fontWeight: '400',
    color: 'black',
  },
});

export default WaitTaskModal;
