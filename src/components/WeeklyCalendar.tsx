import {addDays} from 'date-fns';
import React, {useEffect, useState} from 'react';
import {Alert, StyleSheet, Text, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {EventDuration, Task, TaskDuration} from './MonthlyCalendar';
import {useIsFocused} from '@react-navigation/native';
import axios from 'axios';

type Props = {
  startDateOfCalendar: Date;
  userId: string;
};

export type Routine = {};

export type RoutineDuration = {};

const WeeklyCalendar = (props: Props) => {
  const today = new Date();
  const dateList = week(props.startDateOfCalendar);
  const dayNames = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

  const [calendar, setCalendar] = useState<Date[]>(dateList);
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
      setCalendar(dateList);
      // axios
      //   .get(
      //     `https://000.000.000.000:3000/calendar/weekly/${props.userId}/${props.startDateOfCalendar}`,
      //   )
      //   .then(res => {
      //     const data = res.data;
      //     setEvents(data.events);
      //     setEventDurations(data.event_durations);
      //     setTasks(data.tasks);
      //     setTaskDurations(data.task_durations);
      //     setRoutines(data.routines);
      //     setRoutineDurations(data.routine_durations);
      //   })
      //   .catch(error => {
      //     Alert.alert(error);
      //   });
    }
  }, [isFocused, props.startDateOfCalendar]);

  return (
    <View style={styles.container}>
      <View style={styles.dayNameContainer}>
        <View />
        {dayNames.map((dayName, index) => (
          <View style={styles.dateTextContainer} key={index}>
            <Text style={styles.dayNameText}>{dayName}</Text>
            <Text
              style={
                today.getMonth() === dateList[index].getMonth()
                  ? dateList[index].getDay() != 0 &&
                    dateList[index].getDay() != 6
                    ? styles.dateText
                    : dateList[index].getDay() === 0
                    ? styles.sundayText
                    : styles.saturdayText
                  : styles.otherMonthText
              }>
              {dateList[index].getDate()}
            </Text>
          </View>
        ))}
      </View>
      <ScrollView>
        <View style={styles.calendarContainer}>
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
        </View>
      </ScrollView>
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
  container: {
    paddingHorizontal: 16,
  },
  dayNameContainer: {
    flexDirection: 'row',
    paddingBottom: 8,
    justifyContent: 'space-around',
    borderBottomColor: '#7A7A7A',
    borderBottomWidth: 1,
  },
  dateTextContainer: {
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
    flexDirection: 'row',
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
});

export default WeeklyCalendar;
