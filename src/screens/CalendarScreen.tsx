import React, {useEffect, useState} from 'react';
import TopAppBar from '../components/TopAppBar';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {endOfMonth, endOfWeek, startOfMonth, startOfWeek} from 'date-fns';
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
import MonthlyCalendarScreen from './MonthlyCalendarScreen';
import WeeklyCalendarScreen from './WeeklyCalendarScreen';
import DailyCalendarScreen from './DailyCalendarScreen';

type Props = BottomTabScreenProps<BottomTabParamList, 'Calendar'>;

const CalendarScreen = () => {
  const route = useRoute<Props['route']>();
  const userId = route.params.userId;
  const today = new Date();

  const [currentMonth, setCurrentMonth] = useState<Date>(today);
  const [currentWeek, setCurrentWeek] = useState<Date>(today);
  const [currentDay, setCurrentDay] = useState<Date>(today);

  const [viewType, setViewType] = useState<string>('Monthly');
  const [year, setYear] = useState<number>(currentMonth.getFullYear());
  const [month, setMonth] = useState<number>(currentMonth.getMonth());
  const [date, setDate] = useState<number>(currentDay.getDate());
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [showRoutines, setShowRoutines] = useState<boolean>(true);

  return (
    <GestureHandlerRootView>
      <TopAppBar />
      {viewType === 'Monthly' && (
        <MonthlyCalendarScreen
          currentMonth={currentMonth}
          setCurrentMonth={setCurrentMonth}
          setOpenModal={setOpenModal}
          viewType={viewType}
          userId={userId}
        />
      )}
      {viewType === 'Weekly' && (
        <WeeklyCalendarScreen
          currentWeek={currentWeek}
          setCurrentWeek={setCurrentWeek}
          setOpenModal={setOpenModal}
          viewType={viewType}
          userId={userId}
          showRoutines={showRoutines}
          setShowRoutines={setShowRoutines}
        />
      )}
      {viewType === 'Daily' && (
        <DailyCalendarScreen
          currentDay={currentDay}
          setCurrentDay={setCurrentDay}
          setOpenModal={setOpenModal}
          viewType={viewType}
          userId={userId}
          showRoutines={showRoutines}
          setShowRoutines={setShowRoutines}
        />
      )}
      {/* {viewType === 'Monthly' && (
        <MonthlyCalendarMenuBar
          currentMonth={currentMonth}
          setCurrentMonth={setCurrentMonth}
          year={currentMonth.getFullYear()}
          month={currentMonth.getMonth()}
          setOpenModal={setOpenModal}
          viewType={viewType}
        />
      )}
      {viewType === 'Weekly' && (
        <WeeklyCalendarMenuBar
          currentWeek={currentWeek}
          setCurrentWeek={setCurrentWeek}
          year={currentWeek.getFullYear()}
          month={currentWeek.getMonth()}
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
      )} */}
      <CalendarViewTypeSelectModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        setViewType={setViewType}
      />
      {/* {viewType === 'Monthly' && (
        <MonthlyCanlendar
          startDateOfCalendar={startDateOfMonthlyCalendar}
          endDateOfCalendar={endDateOfMonthlyCalendar}
          year={year}
          month={month}
          userId={userId}
        />
      )}
      {viewType === 'Weekly' && (
        <WeeklyCalendar
          startDateOfCalendar={startDateOfWeeklyCalendar}
          userId={userId}
        />
      )}
      {viewType === 'Daily' && (
        <DailyCalendar currentDay={currentDay} userId={userId} />
      )} */}
    </GestureHandlerRootView>
  );
};

export default CalendarScreen;
