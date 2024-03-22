import {addDays, startOfWeek, subDays} from 'date-fns';
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import FIcon from 'react-native-vector-icons/Feather';
import MIcon from 'react-native-vector-icons/MaterialIcons';
import {
  Event,
  Task,
  EventDuration,
  TaskDuration,
} from './MonthlyCalendarScreen';
import {useIsFocused} from '@react-navigation/native';

export type Routine = {};

export type RoutineDuration = {};

type Props = {
  currentWeek: Date;
  setCurrentWeek: React.Dispatch<React.SetStateAction<Date>>;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  viewType: string;
  userId: string;
  showRoutines: boolean;
  setShowRoutines: React.Dispatch<React.SetStateAction<boolean>>;
};

const WeeklyCalendarScreen = (props: Props) => {
  const [startDateOfWeeklyCalendar, setStartDateOfWeeklyCalendar] =
    useState<Date>(startOfWeek(props.currentWeek));
  const [calendar, setCalendar] = useState<Date[]>(
    week(startDateOfWeeklyCalendar),
  );
  const [events, setEvents] = useState<Event[]>([]);
  const [eventDurations, setEventDurations] = useState<EventDuration[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [taskDurations, setTaskDurations] = useState<TaskDuration[]>([]);
  const [routines, setRoutines] = useState<Routine[]>([]);
  const [routineDurations, setRoutineDurations] = useState<RoutineDuration[]>(
    [],
  );
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      setStartDateOfWeeklyCalendar(startOfWeek(props.currentWeek));
    }
  }, [isFocused, props.currentWeek]);

  useEffect(() => {
    setCalendar(week(startDateOfWeeklyCalendar));
    //   axios
    //     .get(
    //       `http://172.20.125.25:3000/calendar/monthly/${props.userId}/${props.startDateOfCalendar}/${props.endDateOfCalendar}`,
    //     )
    //     .then(res => {
    //       const data = res.data;
    //       setEvents(data.events);
    //       setEventDurations(data.event_durations);
    //       setTasks(data.tasks);
    //       setTaskDurations(data.task_durations);
    //     })
    //     .catch(error => {
    //       Alert.alert(error);
    //     });
  }, [startDateOfWeeklyCalendar]);

  const monthName = [
    'January',
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
  const dayNames = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  const today = new Date();

  const test = {
    name: 'test',
    start: new Date('2024-01-01 08:00'),
    end: new Date('2024-01-01 10:00'),
  };

  const onNextWeek = () => {
    props.setCurrentWeek(addDays(props.currentWeek, 7));
  };
  const onPreviousWeek = () => {
    props.setCurrentWeek(subDays(props.currentWeek, 7));
  };

  return (
    <View>
      <View style={styles.menuContainer}>
        <View>
          <Text style={styles.yearText}>{props.currentWeek.getFullYear()}</Text>
          <View style={styles.monthContainer}>
            <Text style={styles.monthText}>
              {monthName[props.currentWeek.getMonth()]}
            </Text>
            <TouchableOpacity style={styles.moveBtn} onPress={onPreviousWeek}>
              <MIcon name="keyboard-arrow-left" size={20} color="#7A7A7A" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.moveBtn} onPress={onNextWeek}>
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
      <View style={styles.container}>
        <View style={styles.dayNameContainer}>
          <View style={{flex: 1}} />
          {calendar.map((day, index) => (
            <View style={styles.dateTextContainer} key={index}>
              <Text style={styles.dayNameText}>{dayNames[index]}</Text>
              <Text
                style={
                  props.currentWeek.getMonth() === day.getMonth()
                    ? day.getDay() != 0 && day.getDay() != 6
                      ? styles.dateText
                      : day.getDay() === 0
                      ? styles.sundayText
                      : styles.saturdayText
                    : styles.otherMonthText
                }>
                {day.getDate()}
              </Text>
            </View>
          ))}
        </View>
        <ScrollView>
          {/* <View style={styles.calendarContainer}>
            <View>
              {[...Array(25)].map((_, index) => (
                <Text style={styles.hoursText} key={index}>
                  {index < 10 ? `0${index}:00` : `${index}:00`}
                </Text>
              ))}
            </View>
            <View style={{paddingTop: 8}}>
              {[...Array(25)].map((_, index) => (
                <View style={styles.timeSlot} key={index}></View>
              ))}
            </View>
          </View> */}
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
    </View>
  );
};

const week = (startDateOfCalendar: Date) => {
  let week: Date[] = [];
  [...Array(7)].map((_, index) => {
    week.push(addDays(startDateOfCalendar, index));
  });
  return week;
};

const styles = StyleSheet.create({
  menuContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    zIndex: 1,
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
  container: {
    paddingHorizontal: 16,
  },
  dayNameContainer: {
    flexDirection: 'row',
    paddingBottom: 8,
    // justifyContent: 'space-around',
    borderBottomColor: '#7A7A7A',
    borderBottomWidth: 1,
  },
  dateTextContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dayNameText: {
    fontFamily: 'Pretendard',
    fontSize: 14,
    fontWeight: '400',
    color: '#7A7A7A',
  },
  dateText: {
    fontFamily: 'Pretendard',
    fontSize: 14,
    fontWeight: '600',
    color: 'black',
  },
  otherMonthText: {
    fontFamily: 'Pretendard',
    fontSize: 14,
    fontWeight: '600',
    color: '#C9C9C9',
  },
  sundayText: {
    fontFamily: 'Pretendard',
    fontSize: 14,
    fontWeight: '600',
    color: '#E12222',
  },
  saturdayText: {
    fontFamily: 'Pretendard',
    fontSize: 14,
    fontWeight: '600',
    color: '#224CE1',
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

export default WeeklyCalendarScreen;
