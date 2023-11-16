import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import FIcon from 'react-native-vector-icons/Feather';
import MIcon from 'react-native-vector-icons/MaterialIcons';

type Props = {
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

  return (
    <View style={styles.menuContainer}>
      <View>
        <Text style={styles.yearText}>{props.year}</Text>
        <Text style={styles.monthText}>{monthName[props.month]}</Text>
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
  monthText: {
    fontFamily: 'Pretendard',
    fontWeight: '600',
    letterSpacing: 0.1,
    fontSize: 24,
    color: 'black',
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
