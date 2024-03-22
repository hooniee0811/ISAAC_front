import {addDays, format, subDays} from 'date-fns';
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import FIcon from 'react-native-vector-icons/Feather';
import MIcon from 'react-native-vector-icons/MaterialIcons';
import {
  Event,
  Task,
  EventDuration,
  TaskDuration,
} from './MonthlyCalendarScreen';
import {Routine, RoutineDuration} from './WeeklyCalendarScreen';
import {useIsFocused} from '@react-navigation/native';
import axios from 'axios';

type Props = {
  currentDay: Date;
  setCurrentDay: React.Dispatch<React.SetStateAction<Date>>;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  viewType: string;
  userId: string;
  showRoutines: boolean;
  setShowRoutines: React.Dispatch<React.SetStateAction<boolean>>;
};

const DailyCalendarScreen = (props: Props) => {
  const monthName = [
    'Jenuary',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  const [events, setEvents] = useState<Event[]>([]);
  const [eventDurations, setEventDurations] = useState<EventDuration[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [taskDurations, setTaskDurations] = useState<TaskDuration[]>([]);
  const [routines, setRoutines] = useState<Routine[]>([]);
  const [routineDurations, setRoutineDurations] = useState<RoutineDuration[]>(
    [],
  );
  const isFocused = useIsFocused();

  console.log(new Date(format(props.currentDay, 'yyyy-MM-dd')));

  useEffect(() => {
    if (isFocused) {
      // axios
      //   .get(
      //     `https://api.calendar-isaac-isaac-isaac.shop/calendar/daily/${
      //       props.userId
      //     }/${format(props.currentDay, 'yyyy-MM-dd')}`,
      //   )
      //   .then(res => {
      //     const data = res.data;
      //     setEvents(data.events);
      //     setEventDurations(data.event_durations);
      //     setTasks(data.tasks);
      //     setTaskDurations(data.task_durations);
      //   })
      //   .catch(error => {
      //     Alert.alert(error);
      //   });
    }
  }, [isFocused, props.currentDay]);

  const onNextDay = () => {
    props.setCurrentDay(addDays(props.currentDay, 1));
  };
  const onPreviousDay = () => {
    props.setCurrentDay(subDays(props.currentDay, 1));
  };

  return (
    <View style={styles.container}>
      <View style={styles.menuContainer}>
        <View>
          <Text style={styles.yearText}>{props.currentDay.getFullYear()}</Text>
          <View style={styles.monthContainer}>
            <Text style={styles.monthText}>
              {`${
                monthName[props.currentDay.getMonth()]
              } ${props.currentDay.getDate()}`}
            </Text>
            <TouchableOpacity style={styles.moveBtn} onPress={onPreviousDay}>
              <MIcon name="keyboard-arrow-left" size={20} color="#7A7A7A" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.moveBtn} onPress={onNextDay}>
              <MIcon name="keyboard-arrow-right" size={20} color="#7A7A7A" />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.btnContianer}>
          <TouchableOpacity
            style={styles.showRoutinesBtn}
            onPress={() => {
              props.setShowRoutines(!props.showRoutines);
            }}>
            <FIcon
              name={props.showRoutines ? 'eye' : 'eye-off'}
              color="black"
              size={14}
            />
            <Text style={styles.routinesText}>Routines</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.picker}
            onPress={() => {
              props.setOpenModal(true);
            }}>
            <Text style={styles.pickerText}>{props.viewType}</Text>
            <MIcon name="keyboard-arrow-down" size={16} color="black" />
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView>
        <View style={styles.calendarContainer}>
          {[...Array(25)].map((_, rowIndex) => (
            <View style={styles.oneHourBlock} key={rowIndex}>
              <View style={{width: '12.5%'}}>
                <Text style={styles.hoursText}>
                  {rowIndex < 10 ? `0${rowIndex}:00` : `${rowIndex}:00`}
                </Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
  },
  menuContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#7A7A7A',
  },
  yearText: {
    fontFamily: 'Pretendard',
    fontWeight: '400',
    letterSpacing: 0.1,
    fontSize: 20,
    color: 'black',
  },
  monthContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  monthText: {
    fontFamily: 'Pretendard',
    fontWeight: '600',
    letterSpacing: 0.1,
    fontSize: 24,
    color: 'black',
  },
  moveBtn: {
    backgroundColor: '#F3F3F3',
    borderRadius: 4,
  },
  btnContianer: {
    gap: 8,
    alignItems: 'flex-end',
  },
  showRoutinesBtn: {
    flexDirection: 'row',
    paddingVertical: 4,
    paddingHorizontal: 8,
    gap: 4,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 16,
    borderWidth: 1,
  },
  routinesText: {
    fontFamily: 'Pretendard',
    fontWeight: '500',
    letterSpacing: 0.1,
    fontSize: 12,
    color: 'black',
  },
  picker: {
    flexDirection: 'row',
    paddingVertical: 4,
    paddingHorizontal: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 16,
    borderWidth: 1,
  },
  pickerText: {
    fontFamily: 'Pretendard',
    fontWeight: '500',
    letterSpacing: 0.1,
    fontSize: 12,
    color: 'black',
  },
  calendarContainer: {
    // flexDirection: 'row',
    paddingTop: 8,
    height: 1700,
  },
  hoursText: {
    color: '#ADADAD',
    fontFamily: 'Pretendard',
    fontSize: 10,
    fontWeight: '400',
    height: 50,
    marginRight: 5,
  },
  timeSlot: {
    borderTopWidth: 0.5,
    borderColor: '#ADADAD',
    borderStyle: 'dotted',
    height: 50,
    width: 500,
  },
  oneHourBlock: {
    flexDirection: 'row',
    height: 50,
    borderTopWidth: 0.5,
    borderColor: '#ADADAD',
    borderStyle: 'dotted',
  },
  oneDayTimeSlot: {
    flex: 1,
  },
});

export default DailyCalendarScreen;
