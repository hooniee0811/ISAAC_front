import {useIsFocused} from '@react-navigation/native';
import axios from 'axios';
import {
  startOfWeek,
  startOfMonth,
  endOfWeek,
  endOfMonth,
  addMonths,
  subMonths,
  addDays,
  setMinutes,
  setHours,
} from 'date-fns';
import React, {useEffect, useState} from 'react';
import {Alert, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import MIcon from 'react-native-vector-icons/MaterialIcons';

type Props = {
  currentMonth: Date;
  setCurrentMonth: React.Dispatch<React.SetStateAction<Date>>;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  viewType: string;
  userId: string;
};

export type Event = {
  id: string;
  event_name: string;
  event_memo: string;
  createdAt: Date;
  updatedAt: Date;
  user_id: string;
  tag_id: string;
};

export type EventDuration = {
  id: number;
  event_dur_start_date: Date;
  event_dur_end_date: Date;
  createdAt: Date;
  updatedAt: Date;
  user_id: string;
  event_id: string;
};

export type Task = {
  id: string;
  task_order: number;
  task_name: string;
  task_time_required: number;
  task_description: string;
  createdAt: Date;
  updatedAt: Date;
  user_id: string;
  tag_id: string;
  proj_id: string;
};

export type TaskDuration = {
  id: number;
  task_dur_start_date: Date;
  task_dur_end_date: Date;
  createdAt: Date;
  updatedAt: Date;
  user_id: string;
  task_id: string;
};

const MonthlyCalendarScreen = (props: Props) => {
  const [startDateOfMonthlyCalendar, setStartDateOfMonthlyCalendar] =
    useState<Date>(startOfWeek(startOfMonth(props.currentMonth)));
  const [endDateOfMonthlyCalendar, setEndDateOfMonthlyCalendar] =
    useState<Date>(endOfWeek(endOfMonth(props.currentMonth)));
  const [calendar, setCalendar] = useState<Date[][]>(
    month(startDateOfMonthlyCalendar, endDateOfMonthlyCalendar),
  );
  const [events, setEvents] = useState<Event[]>([]);
  const [eventDurations, setEventDurations] = useState<EventDuration[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [taskDurations, setTaskDurations] = useState<TaskDuration[]>([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      setStartDateOfMonthlyCalendar(
        startOfWeek(startOfMonth(props.currentMonth)),
      );
      setEndDateOfMonthlyCalendar(endOfWeek(endOfMonth(props.currentMonth)));
    }
  }, [isFocused, props.currentMonth]);

  useEffect(() => {
    setCalendar(month(startDateOfMonthlyCalendar, endDateOfMonthlyCalendar));
    axios
      .get(
        `https://api.calendar-isaac-isaac-isaac.shop/calendar/monthly/${props.userId}/${startDateOfMonthlyCalendar}/${endDateOfMonthlyCalendar}`,
      )
      .then(res => {
        const data = res.data;
        setEvents(data.events);
        setEventDurations(data.event_durations);
        setTasks(data.tasks);
        setTaskDurations(data.task_durations);
      })
      .catch(error => {
        Alert.alert(error);
      });
  }, [startDateOfMonthlyCalendar]);

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
  const dayNames = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

  const onNextMonth = () => {
    props.setCurrentMonth(addMonths(props.currentMonth, 1));
  };
  const onPreviousMonth = () => {
    props.setCurrentMonth(subMonths(props.currentMonth, 1));
  };

  return (
    <View>
      <View style={styles.menuContainer}>
        <View>
          <Text style={styles.yearText}>
            {props.currentMonth.getFullYear()}
          </Text>
          <View style={styles.monthContainer}>
            <Text style={styles.monthText}>
              {monthName[props.currentMonth.getMonth()]}
            </Text>
            <TouchableOpacity style={styles.moveBtn} onPress={onPreviousMonth}>
              <MIcon name="keyboard-arrow-left" size={20} color="#7A7A7A" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.moveBtn} onPress={onNextMonth}>
              <MIcon name="keyboard-arrow-right" size={20} color="#7A7A7A" />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.btnContianer}>
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
          {dayNames.map((dayName, index) => (
            <View key={index}>
              <Text style={styles.dayNameText}>{dayName}</Text>
            </View>
          ))}
        </View>
        <View style={styles.calendarContainer}>
          {calendar.map((week, index) => (
            <View key={index} style={styles.weekContianer}>
              {week.map((day, index) => (
                <View key={index} style={styles.dayContainer}>
                  <Text
                    style={
                      props.currentMonth.getMonth() === day.getMonth()
                        ? day.getDay() != 0 && day.getDay() != 6
                          ? styles.dateText
                          : day.getDay() === 0
                          ? styles.sundayText
                          : styles.saturdayText
                        : styles.otherMonthText
                    }>
                    {day.getDate()}
                  </Text>
                  {eventDurations.map((eventDuration, index) => (
                    <View key={eventDuration.id}>
                      {setMinutes(
                        setHours(
                          new Date(eventDuration.event_dur_start_date),
                          0,
                        ),
                        0,
                      ) <= day &&
                        new Date(eventDuration.event_dur_end_date) >= day && (
                          <Text style={styles.eventText}>
                            {events[index].event_name}
                          </Text>
                        )}
                    </View>
                  ))}
                  {taskDurations.map((taskDuration, index) => (
                    <View key={taskDuration.id}>
                      {setMinutes(
                        setHours(new Date(taskDuration.task_dur_start_date), 0),
                        0,
                      ) <= day &&
                        new Date(taskDuration.task_dur_end_date) >= day && (
                          <Text style={styles.taskText}>
                            {
                              tasks.find(
                                task => task.id === taskDuration.task_id,
                              ).task_name
                            }
                          </Text>
                        )}
                    </View>
                  ))}
                </View>
              ))}
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};

const month = (startDateOfCalendar: Date, endDateOfCalendar: Date) => {
  let month = [];
  let date = startDateOfCalendar;

  while (date.getTime() < endDateOfCalendar.getTime()) {
    let week: Date[] = [];
    [...Array(7)].map((_, index) => {
      week.push(addDays(date, index));
    });
    month.push(week);
    date = addDays(date, 7);
  }

  return month;
};

const styles = StyleSheet.create({
  menuContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
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
    // width: 120,
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
    justifyContent: 'flex-end',
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
    justifyContent: 'space-around',
    height: 30,
  },
  dayNameText: {
    fontFamily: 'Pretendard',
    fontSize: 14,
    fontWeight: '400',
    color: '#7A7A7A',
  },
  calendarContainer: {
    height: '100%',
    borderTopWidth: 1,
    borderTopColor: '#7A7A7A',
    paddingTop: 4,
  },
  weekContianer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  dayContainer: {
    width: 50,
    height: 80,
    backgroundColor: '#F5F7FE',
    borderRadius: 4,
    alignItems: 'center',
    overflow: 'hidden',
  },
  dateText: {
    fontFamily: 'Pretendard',
    fontSize: 12,
    fontWeight: '600',
    color: 'black',
  },
  otherMonthText: {
    fontFamily: 'Pretendard',
    fontSize: 12,
    fontWeight: '600',
    color: '#C9C9C9',
  },
  sundayText: {
    fontFamily: 'Pretendard',
    fontSize: 12,
    fontWeight: '600',
    color: '#E12222',
  },
  saturdayText: {
    fontFamily: 'Pretendard',
    fontSize: 12,
    fontWeight: '600',
    color: '#224CE1',
  },
  eventText: {
    width: 50,
    fontFamily: 'Pretendard',
    fontSize: 10,
    fontWeight: '300',
    letterSpacing: 0.1,
    color: 'black',
    borderLeftColor: '#B1BFF4',
    borderLeftWidth: 2,
    paddingLeft: 4,
    marginBottom: 2,
  },
  taskText: {
    width: 50,
    fontFamily: 'Pretendard',
    fontSize: 10,
    fontWeight: '300',
    letterSpacing: 0.1,
    color: 'black',
    borderTopColor: '#B1BFF4',
    borderBottomColor: '#B1BFF4',
    borderTopWidth: 2,
    borderBottomWidth: 2,
    paddingLeft: 4,
    marginBottom: 2,
  },
});

export default MonthlyCalendarScreen;
