import React, {useEffect, useState} from 'react';
import TopAppBar from '../components/TopAppBar';
import {Alert, Modal, Pressable, StyleSheet, Text, View} from 'react-native';
import {
  GestureHandlerRootView,
  TouchableOpacity,
} from 'react-native-gesture-handler';
import {
  addMonths,
  endOfMonth,
  endOfWeek,
  startOfMonth,
  startOfWeek,
} from 'date-fns';
import MonthlyCanlendar from '../components/MonthlyCalendar';
import CalendarViewTypeSelectModal from '../components/CalendarViewTypeSelectModal';
import WeeklyCalendar from '../components/WeeklyCalendar';
import MonthlyCalendarMenuBar from '../components/MonthlyCalendarMenuBar';
import WeeklyCalendarMenuBar from '../components/WeeklyCalendarMenuBar';
import DailyCalendarMenuBar from '../components/DailyCalendarMenuBar';
import DailyCalendar from '../components/DailyCalendar';
import axios from 'axios';
import {useRoute} from '@react-navigation/native';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {BottomTabParamList} from '../navigators/BottomTabNavigator';

type Props = BottomTabScreenProps<BottomTabParamList, 'Calendar'>;

const CalendarScreen = () => {
  const route = useRoute<Props['route']>();
  const userId = route.params.userId;
  const today = new Date();

  const [currentMonth, setCurrentMonth] = useState<Date>(today);
  const [startDateOfCalendar, setStartDateOfCalendar] = useState<Date>(
    startOfWeek(startOfMonth(currentMonth)),
  );
  const [endDateOfCalendar, setEndDateOfCalendar] = useState<Date>(
    endOfWeek(endOfMonth(currentMonth)),
  );
  const [viewType, setViewType] = useState<string>('Monthly');
  const [year, setYear] = useState<number>(currentMonth.getFullYear());
  const [month, setMonth] = useState<number>(currentMonth.getMonth());
  const [date, setDate] = useState<number>(today.getDate());
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [showRoutines, setShowRoutines] = useState<boolean>(true);

  return (
    <GestureHandlerRootView>
      <TopAppBar />
      {viewType === 'Monthly' && (
        <MonthlyCalendarMenuBar
          year={year}
          month={month}
          setOpenModal={setOpenModal}
          viewType={viewType}
        />
      )}
      {viewType === 'Weekly' && (
        <WeeklyCalendarMenuBar
          year={year}
          month={month}
          showRoutines={showRoutines}
          setShowRoutines={setShowRoutines}
          setOpenModal={setOpenModal}
          viewType={viewType}
        />
      )}
      {viewType === 'Daily' && (
        <DailyCalendarMenuBar
          year={year}
          month={month}
          date={date}
          showRoutines={showRoutines}
          setShowRoutines={setShowRoutines}
          setOpenModal={setOpenModal}
          viewType={viewType}
        />
      )}
      <CalendarViewTypeSelectModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        setViewType={setViewType}
        setYear={setYear}
        setMonth={setMonth}
        setStartDateOfCalendar={setStartDateOfCalendar}
        setEndDateOfCalendar={setEndDateOfCalendar}
      />
      {viewType === 'Monthly' && (
        <MonthlyCanlendar
          startDateOfCalendar={startDateOfCalendar}
          endDateOfCalendar={endDateOfCalendar}
          userId={userId}
        />
      )}
      {viewType === 'Weekly' && (
        <WeeklyCalendar
          startDateOfCalendar={startDateOfCalendar}
          userId={userId}
        />
      )}
      {viewType === 'Daily' && (
        <DailyCalendar
          startDateOfCalendar={startDateOfCalendar}
          userId={userId}
        />
      )}
    </GestureHandlerRootView>
  );
};

export default CalendarScreen;
