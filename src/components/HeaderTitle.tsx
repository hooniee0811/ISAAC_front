import React from 'react';
import {StyleSheet, Text} from 'react-native';

const HeaderTitle = () => {
  return <Text style={styles.title}>ISAAC</Text>;
};

const styles = StyleSheet.create({
  title: {
    color: 'black',
    fontFamily: 'Pretendard',
    fontSize: 22,
    fontWeight: '800',
  },
});

export default HeaderTitle;
