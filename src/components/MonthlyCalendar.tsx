import axios from 'axios';
import {
  addDays,
  endOfMonth,
  endOfWeek,
  setHours,
  setMinutes,
  startOfMonth,
  startOfWeek,
  subDays,
} from 'date-fns';
import React, {useEffect, useState} from 'react';
import {Text, StyleSheet, View, Alert} from 'react-native';
import {useIsFocused} from '@react-navigation/native';

type Props = {
  startDateOfCalendar: Date;
  endDateOfCalendar: Date;
  userId: string;
};

type Event = {
  id: string;
  event_name: string;
  event_memo: string;
  createdAt: Date;
  updatedAt: Date;
  user_id: string;
  tag_id: string;
};

type EventDuration = {
  id: number;
  event_dur_start_date: Date;
  event_dur_end_date: Date;
  createdAt: Date;
  updatedAt: Date;
  user_id: string;
  event_id: string;
};

const MonthlyCanlendar = (props: Props) => {
  const today = new Date();
  const weekList = month(props.startDateOfCalendar, props.endDateOfCalendar);
  const dayNames = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

  const [calendar, setCalendar] = useState<Date[][]>(weekList);
  const [events, setEvents] = useState<Event[]>([]);
  const [eventDurations, setEventDurations] = useState<EventDuration[]>([]);
  const isFocused = useIsFocused();

  const onPress = () => {};

  useEffect(() => {
    axios
      .get(`http://192.168.35.93:3000/calendar/monthly/${props.userId}/2023/11`)
      .then(res => {
        setEvents(res.data.events);
        setEventDurations(res.data.event_durations);
        console.log(res.data.events);
        console.log(res.data.event_durations);
        console.log(calendar);
        console.log(setMinutes(setHours(new Date(), 0), 0));
      })
      .catch(error => {
        // Alert.alert(error);
      });
  }, [isFocused]);

  return (
    <View style={styles.container}>
      <View style={styles.dayNameContainer}>
        {dayNames.map((dayName, index) => (
          <Text key={index} style={styles.dayNameText}>
            {dayName}
          </Text>
        ))}
      </View>
      <View style={styles.calendarContainer}>
        {calendar.map((week, index) => (
          <View key={index} style={styles.weekContianer}>
            {week.map((day, index) => (
              <View key={index} style={styles.dayContainer}>
                <Text
                  style={
                    today.getMonth() === day.getMonth()
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
                  <View>
                    {setMinutes(
                      setHours(new Date(eventDuration.event_dur_start_date), 0),
                      0,
                    ) <= day &&
                      new Date(eventDuration.event_dur_end_date) >= day && (
                        <Text style={styles.eventText} key={eventDuration.id}>
                          {events[index].event_name}
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
  },
});

export default MonthlyCanlendar;
