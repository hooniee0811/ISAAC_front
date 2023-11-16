import React from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

const TopAppBar = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>ISAAC</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  iconContainer: {
    width: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    justifyContent: 'flex-start',
  },
  title: {
    color: 'black',
    fontFamily: 'Pretendard',
    fontSize: 22,
    fontWeight: '800',
  },
});

export default TopAppBar;
