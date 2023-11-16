import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import ProfileBar from '../components/ProfileBar';
import {StackScreenProps} from '@react-navigation/stack';
import {SettingsStackParamList} from '../navigators/SettingsStackNavigator';
import {useNavigation, useRoute} from '@react-navigation/native';

type Props = StackScreenProps<SettingsStackParamList, 'RootSettings'>;

const SettingsScreen = () => {
  const navigation = useNavigation<Props['navigation']>();
  const route = useRoute<Props['route']>();
  const userId = route.params.userId;

  const onNotification = () => {
    navigation.navigate('Notification', {userId: userId});
  };
  const onProjects = () => {
    navigation.navigate('Projects', {userId: userId});
  };
  const onRoutines = () => {
    navigation.navigate('Routines', {userId: userId});
  };
  const onTags = () => {
    navigation.navigate('Tags', {userId: userId});
  };

  return (
    <>
      <ProfileBar />
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.titleContainer}
          onPress={onNotification}>
          <Text style={styles.title}>Notification</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.titleContainer} onPress={onProjects}>
          <Text style={styles.title}>Projects</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.titleContainer} onPress={onRoutines}>
          <Text style={styles.title}>Routines</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.titleContainer} onPress={onTags}>
          <Text style={styles.title}>Tags</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  titleContainer: {
    width: 412,
    height: 72,
    justifyContent: 'center',
    borderBottomColor: '#C9C9C9',
    borderBottomWidth: 0.2,
  },
  title: {
    color: 'black',
    fontFamily: 'Pretendard',
    fontSize: 20,
    fontStyle: 'normal',
    fontWeight: '600',
    marginLeft: 30,
  },
});

export default SettingsScreen;
