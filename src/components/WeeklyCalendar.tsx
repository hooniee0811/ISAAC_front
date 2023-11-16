import {addDays, addHours, endOfWeek, startOfDay, startOfWeek} from 'date-fns';
import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Timetable from 'react-native-calendar-timetable';
import {ScrollView} from 'react-native-gesture-handler';

type Props = {
  startDateOfCalendar: Date;
  userId: string;
};

const WeeklyCalendar = (props: Props) => {
  const today = new Date();
  const dateList = week(props.startDateOfCalendar);
  const dayNames = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  console.log(dateList);

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
