import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import FIcon from 'react-native-vector-icons/Feather';
import MIcon from 'react-native-vector-icons/MaterialIcons';
import MatIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {addMonths, format, subMonths} from 'date-fns';

type Props = {
  currentMonth: Date;
  setCurrentMonth: React.Dispatch<React.SetStateAction<Date>>;
  year: number;
  month: number;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  viewType: string;
};

const MonthlyCalendarMenuBar = (props: Props) => {
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

  const onNextMonth = () => {
    props.setCurrentMonth(addMonths(props.currentMonth, 1));
  };
  const onPreviousMonth = () => {
    props.setCurrentMonth(subMonths(props.currentMonth, 1));
  };

  return (
    <View style={styles.menuContainer}>
      <View>
        <Text style={styles.yearText}>{props.year}</Text>
        <View style={styles.monthContainer}>
          <Text style={styles.monthText}>{monthName[props.month]}</Text>
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
  );
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
});

export default MonthlyCalendarMenuBar;
