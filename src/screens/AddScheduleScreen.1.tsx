import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {Props, styles} from './AddScheduleScreen';

// type Props = CompositeScreenProps<
//   StackScreenProps<AddScheduleStackParamList, 'RootAddSchedule'>,
//   BottomTabScreenProps<BottomTabParamList, 'AddSchedule'>
// >;
export const AddScheduleScreen = () => {
  const navigation = useNavigation<Props['navigation']>();

  const onProject = () => {
    navigation.navigate('AddProject');
  };

  const onEvent = () => {
    navigation.navigate('AddEvent');
  };

  console.log(uuid.v4());

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
