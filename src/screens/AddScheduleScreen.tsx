import {
  CompositeScreenProps,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {StackScreenProps} from '@react-navigation/stack';
import React, {FC} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {AddScheduleStackParamList} from '../navigators/AddScheduleStackNavigator';
import TopAppBar from '../components/TopAppBar';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {BottomTabParamList} from '../navigators/BottomTabNavigator';
import uuid from 'react-native-uuid';

type Props = StackScreenProps<AddScheduleStackParamList, 'RootAddSchedule'>;
// type Props = CompositeScreenProps<
//   StackScreenProps<AddScheduleStackParamList, 'RootAddSchedule'>,
//   BottomTabScreenProps<BottomTabParamList, 'AddSchedule'>
// >;

const AddScheduleScreen = () => {
  const navigation = useNavigation<Props['navigation']>();
  const route = useRoute<Props['route']>();
  const userId = route.params.userId;

  const onProject = () => {
    navigation.navigate('AddProject', {userId: userId});
  };

  const onEvent = () => {
    navigation.navigate('AddEvent', {userId: userId});
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.btn} onPress={onProject}>
        <Text style={styles.title}>Add Project</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.btn} onPress={onEvent}>
        <Text style={styles.title}>Add Event</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: 'white',
    gap: 24,
  },
  btn: {
    width: 160,
    height: 120,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F7FE',
  },
  title: {
    color: 'black',
    fontFamily: 'Pretendard',
    fontSize: 24,
    fontStyle: 'normal',
    fontWeight: '600',
  },
});

export default AddScheduleScreen;
