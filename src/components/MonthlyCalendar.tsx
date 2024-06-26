import axios from 'axios';
import {addDays, setHours, setMinutes} from 'date-fns';
import React, {useEffect, useState} from 'react';
import {Text, StyleSheet, View, Alert} from 'react-native';
import {useIsFocused} from '@react-navigation/native';

type Props = {
  startDateOfCalendar: Date;
  endDateOfCalendar: Date;
  year: number;
  month: number;
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

const MonthlyCanlendar = (props: Props) => {
  const weekList = month(props.startDateOfCalendar, props.endDateOfCalendar);
  const dayNames = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

  const [calendar, setCalendar] = useState<Date[][]>(
    month(props.startDateOfCalendar, props.endDateOfCalendar),
  );
  const [events, setEvents] = useState<Event[]>([]);
  const [eventDurations, setEventDurations] = useState<EventDuration[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [taskDurations, setTaskDurations] = useState<TaskDuration[]>([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      setCalendar(month(props.startDateOfCalendar, props.endDateOfCalendar));
      axios
        .get(
          `https://api.calendar-isaac-isaac-isaac.shop/calendar/monthly/${props.userId}/${props.startDateOfCalendar}/${props.endDateOfCalendar}`,
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
    }
  }, [isFocused, props.startDateOfCalendar]);

  useEffect(() => {
    console.log(calendar);
  }, [calendar]);

  return (
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
                    props.month === day.getMonth()
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
                      setHours(new Date(eventDuration.event_dur_start_date), 0),
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
                            tasks.find(task => task.id === taskDuration.task_id)
                              .task_name
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

export default MonthlyCanlendar;
