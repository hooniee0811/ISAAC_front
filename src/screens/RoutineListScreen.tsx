import {StackScreenProps} from '@react-navigation/stack';
import React, {useEffect, useState} from 'react';
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {SettingsStackParamList} from '../navigators/SettingsStackNavigator';
import {useIsFocused, useNavigation, useRoute} from '@react-navigation/native';
import AntIcon from 'react-native-vector-icons/AntDesign';
import FontIcon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';

type Props = StackScreenProps<SettingsStackParamList, 'Routines'>;

type RoutineProps = {
  id: string;
  routine_name: string;
  routine_memo: string;
  user_id: string;
  tag_id: string;
  createdAt: Date;
  updatedAt: Date;
};

type RoutineDurationProps = {
  id: string;
  routine_dur_day: number;
  routine_dur_start_time: number;
  routine_dur_start_minute: number;
  routine_dur_end_time: number;
  routine_dur_end_minute: number;
  routine_id: string;
  user_id: string;
  createdAt: Date;
  updatedAt: Date;
};

const RoutineListScreen = () => {
  const navigation = useNavigation<Props['navigation']>();
  const route = useRoute<Props['route']>();
  const userId = route.params.userId;
  const [routines, setRoutines] = useState<RoutineProps[]>([]);
  const [routineDurations, setRoutineDurations] = useState<
    RoutineDurationProps[]
  >([]);
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const [reRender, setReRender] = useState<boolean>(true);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      axios
        .get(
          `https://api.calendar-isaac-isaac-isaac.shop/routine/list/${userId}`,
        )
        .then(res => {
          console.log(res.data.routines);
          console.log(res.data.routine_durations);
          setRoutines(res.data.routines);
          setRoutineDurations(res.data.routine_durations);
          console.log(routines);
          console.log(routineDurations);
        })
        .catch(error => {
          Alert.alert(error);
        });
    }
  }, [reRender, isFocused]);

  const deleteRoutine = (routineId: string) => {
    axios
      .get(
        `https://api.calendar-isaac-isaac-isaac.shop/routine/delete/${routineId}`,
      )
      .then(res => {
        Alert.alert(res.data.message);
        setReRender(!reRender);
      })
      .catch(error => {
        Alert.alert(error);
      });
  };

  const onAddRoutine = () => {
    navigation.navigate('AddRoutine', {userId: userId});
  };

  const onEditRoutine = (index: number) => {
    const targetRoutine = routines[index];
    const targetRoutineDurations = routineDurations.filter(
      routineDuration => routineDuration.routine_id === targetRoutine.id,
    );
    const days = targetRoutineDurations.map((targetRoutineDuration, index) => {
      return targetRoutineDuration.routine_dur_day;
    });

    navigation.navigate('EditRoutine', {
      userId: userId,
      routine: {
        id: targetRoutine.id,
        name: targetRoutine.routine_name,
        memo: targetRoutine.routine_memo,
        days: days,
        start: {
          hour: targetRoutineDurations[0].routine_dur_start_time,
          minute: targetRoutineDurations[0].routine_dur_start_minute,
        },
        end: {
          hour: targetRoutineDurations[0].routine_dur_end_time,
          minute: targetRoutineDurations[0].routine_dur_end_minute,
        },
        flexibility: 'Strict',
        tag: targetRoutine.tag_id,
        user: targetRoutine.user_id,
      },
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {routines.map((routine, index) => {
        return (
          <View style={styles.routineContainer} key={routine.id}>
            <View style={styles.routineNameContainer}>
              <Text style={styles.routineNameText}>{routine.routine_name}</Text>
              <View style={styles.routineBtnContainer}>
                <TouchableOpacity onPress={() => onEditRoutine(index)}>
                  <Text style={styles.editText}>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => deleteRoutine(routine.id)}>
                  <FontIcon name="trash-o" size={20} color="#7A7A7A" />
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.dateContainer}>
              {routineDurations.map((routineDuration, index) => {
                return (
                  <View key={routineDuration.id}>
                    {routine.id === routineDuration.routine_id && (
                      <Text style={styles.dateText}>{`${
                        dayNames[routineDuration.routine_dur_day]
                      } ${
                        routineDuration.routine_dur_start_time < 10
                          ? `0${routineDuration.routine_dur_start_time}`
                          : routineDuration.routine_dur_start_time
                      }:${
                        routineDuration.routine_dur_start_minute < 10
                          ? `0${routineDuration.routine_dur_start_minute}`
                          : routineDuration.routine_dur_start_minute
                      }~${
                        routineDuration.routine_dur_end_time < 10
                          ? `0${routineDuration.routine_dur_end_time}`
                          : routineDuration.routine_dur_end_time
                      }:${
                        routineDuration.routine_dur_end_minute < 10
                          ? `0${routineDuration.routine_dur_end_minute}`
                          : routineDuration.routine_dur_end_minute
                      }`}</Text>
                    )}
                  </View>
                );
              })}
            </View>
            <View></View>
          </View>
        );
      })}
      <TouchableOpacity style={styles.addRoutineBtn} onPress={onAddRoutine}>
        <AntIcon name="plus" size={20} color="#7A7A7A" />
        <Text style={styles.addRoutineText}>Add Routine</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 8,
    gap: 8,
    alignItems: 'center',
  },
  routineContainer: {
    width: 340,
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 12,
    backgroundColor: '#F5F7FE',
    flexWrap: 'wrap',
    marginBottom: 8,
    gap: 8,
    alignItems: 'flex-start',
  },
  routineNameContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  routineNameText: {
    fontFamily: 'Pretendard',
    fontSize: 16,
    fontWeight: '500',
    color: 'black',
  },
  routineBtnContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  editText: {
    fontFamily: 'Pretendard',
    fontSize: 12,
    fontWeight: '600',
    color: '#7A7A7A',
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
    gap: 4,
  },
  dateText: {
    backgroundColor: 'white',
    paddingHorizontal: 8,
    borderRadius: 20,
    fontFamily: 'Pretendard',
    fontSize: 10,
    fontWeight: '400',
    color: 'black',
    alignSelf: 'flex-start',
  },
  addRoutineBtn: {
    width: 340,
    backgroundColor: '#F5F7FE',
    borderRadius: 12,
    flexDirection: 'row',
    gap: 8,
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
  },
  addRoutineText: {
    fontFamily: 'Pretendard',
    fontSize: 16,
    fontWeight: '500',
    color: '#7A7A7A',
  },
});

export default RoutineListScreen;
