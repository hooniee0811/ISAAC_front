import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';

type Props = {
  currentDay: Date;
  userId: string;
};

const DailyCalendar = (props: Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.border}></View>
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

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
  },
  border: {
    borderTopWidth: 1,
    borderColor: '#7A7A7A',
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

export default DailyCalendar;
