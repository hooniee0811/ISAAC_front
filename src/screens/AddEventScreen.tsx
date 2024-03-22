import {StackScreenProps} from '@react-navigation/stack';
import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  NativeSyntheticEvent,
  TextInputChangeEventData,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import {AddScheduleStackParamList} from '../navigators/AddScheduleStackNavigator';
import {
  CompositeScreenProps,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import uuid from 'react-native-uuid';
import MatIcon from 'react-native-vector-icons/MaterialIcons';
import AntIcon from 'react-native-vector-icons/AntDesign';
import FeaIcon from 'react-native-vector-icons/Feather';
import FonIcon from 'react-native-vector-icons/FontAwesome';
import SimIcon from 'react-native-vector-icons/SimpleLineIcons';
import CreateButton from '../components/CreateButton';
import EventRepeatModal from '../components/EventRepeatModal';
import DatePicker from 'react-native-date-picker';
import {BottomTabParamList} from '../navigators/BottomTabNavigator';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {addDays, addMonths, addWeeks, addYears, format} from 'date-fns';
import axios from 'axios';

// type Props = StackScreenProps<AddScheduleStackParamList, 'AddEvent'>;
type Props = CompositeScreenProps<
  StackScreenProps<AddScheduleStackParamList, 'AddEvent'>,
  BottomTabScreenProps<BottomTabParamList, 'AddSchedule'>
>;

export type Repeat = null | {
  scale: number;
  unit: string;
  endDate: Date;
};

export type Event = {
  id: string | number[];
  name: string;
  memo: string;
  durations: {start: Date; end: Date}[];
  tag: null | string | number[];
  user_id: string;
};

const AddEventScreen = () => {
  const navigation = useNavigation<Props['navigation']>();
  const route = useRoute<Props['route']>();
  const userId = route.params.userId;

  const today = new Date();

  const [event, setEvent] = useState<Event>({
    id: uuid.v4(),
    name: '',
    memo: '',
    durations: [],
    tag: 'da54cea4-bf89-42dc-b54d-be2d10bbe525',
    user_id: userId,
  });
  const [start, setStart] = useState<Date>(
    new Date(today.getFullYear(), today.getMonth(), today.getDate(), 8),
  );
  const [end, setEnd] = useState<Date>(
    new Date(today.getFullYear(), today.getMonth(), today.getDate(), 9),
  );
  const [repeat, setRepeat] = useState<Repeat>(null);
  const [allDay, setAllDay] = useState<boolean>(false);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [openStartDatePicker, setOpenStartDatePicker] =
    useState<boolean>(false);
  const [openEndDatePicker, setOpenEndDatePicker] = useState<boolean>(false);

  //fetch (useEffect)
  const tag = {
    name: 'Default',
    color: '#B1BFF4',
  };

  const onChangeEventName = (
    evt: NativeSyntheticEvent<TextInputChangeEventData>,
  ) => {
    const cp = {...event};
    cp.name = evt.nativeEvent.text;
    setEvent(cp);
  };

  const onPressStartDate = () => {
    if (!allDay) {
      setOpenStartDatePicker(true);
    }
  };

  const onPressEndDate = () => {
    if (!allDay) {
      setOpenEndDatePicker(true);
    }
  };

  const onConfirmStartDate = (date: Date) => {
    setStart(date);
  };

  const onConfirmEndDate = (date: Date) => {
    setEnd(date);
  };

  const onAllDay = () => {
    if (!allDay) {
      start.setHours(0);
      start.setMinutes(0);

      end.setHours(23);
      end.setMinutes(59);
    }
    allDay ? setAllDay(false) : setAllDay(true);
  };

  const onChangeMemo = (
    evt: NativeSyntheticEvent<TextInputChangeEventData>,
  ) => {
    const cp = {...event};
    cp.memo = evt.nativeEvent.text;
    setEvent(cp);
  };

  const onRepeat = () => {
    setModalVisible(true);
  };

  const createEvent = () => {
    // check if end-time is later than start-time
    if (event.name === '') {
      Alert.alert('일정 제목을 입력해주세요');
    } else if (end < start) {
      Alert.alert('종료 시간이 시작 시간보다 빠릅니다!');
    } else if (
      repeat &&
      (addDays(repeat.endDate, 1) < start || addDays(repeat.endDate, 1) < end)
    ) {
      Alert.alert('반복 종료날짜가 일정보다 빠릅니다!');
    } else {
      const cp = {...event};
      if (repeat) {
        let tmpStart = start;
        let tmpEnd = end;
        while (tmpEnd <= addDays(repeat.endDate, 1)) {
          cp.durations.push({start: tmpStart, end: tmpEnd});
          if (repeat.unit === 'day') {
            tmpStart = addDays(tmpStart, repeat.scale);
            tmpEnd = addDays(tmpEnd, repeat.scale);
          } else if (repeat.unit === 'week') {
            tmpStart = addWeeks(tmpStart, repeat.scale);
            tmpEnd = addWeeks(tmpEnd, repeat.scale);
          } else if (repeat.unit === 'month') {
            tmpStart = addMonths(tmpStart, repeat.scale);
            tmpEnd = addMonths(tmpEnd, repeat.scale);
          } else if (repeat.unit === 'year') {
            tmpStart = addYears(tmpStart, repeat.scale);
            tmpEnd = addYears(tmpEnd, repeat.scale);
          }
        }
      } else {
        cp.durations.push({start: start, end: end});
      }
      setEvent(cp);
      axios
        .post('https://api.calendar-isaac-isaac-isaac.shop/event/create', {
          event: event,
        })
        .then(response => {
          Alert.alert(response.data.message);
          navigation.popToTop();
          navigation.navigate('Calendar', {userId: userId});
          return response.data;
        })
        .catch(error => {
          Alert.alert(error);
        });
    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.baseTextInputBox}>
          <MatIcon name="title" size={24} color="#7A7A7A" />
          <TextInput
            style={styles.eventNameInput}
            placeholder="Event Name"
            placeholderTextColor={'#C9C9C9'}
            value={event.name}
            onChange={onChangeEventName}
            multiline={true}
          />
        </View>
        <TouchableOpacity
          style={{...styles.baseTextInputBox, marginBottom: 5}}
          onPress={onPressStartDate}>
          <AntIcon name="clockcircleo" size={24} color="#7A7A7A" />
          <Text style={styles.startAtText}>Starts at</Text>
          <Text style={styles.smallText}>
            {allDay
              ? format(start, 'MM/dd(EEE)')
              : format(start, 'MM/dd(EEE)   HH:mm')}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{...styles.baseTextInputBox, marginBottom: 8}}
          onPress={onPressEndDate}>
          <AntIcon name="clockcircleo" size={24} color="#7A7A7A" />
          <Text style={styles.startAtText}>Ends at{'  '}</Text>
          <Text style={styles.smallText}>
            {allDay
              ? format(end, 'MM/dd(EEE)')
              : format(end, 'MM/dd(EEE)   HH:mm')}
          </Text>
        </TouchableOpacity>
        <View style={styles.smallBoxContainer}>
          <TouchableOpacity style={styles.smallBox} onPress={onAllDay}>
            <FonIcon
              name={allDay ? 'toggle-on' : 'toggle-off'}
              size={16}
              color={allDay ? '#5878E8' : '#7A7A7A'}
            />
            <Text style={styles.smallText}>All Day</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.smallBox} onPress={onRepeat}>
            <FeaIcon
              name="repeat"
              size={16}
              color={repeat === null ? '#7A7A7A' : '#5878E8'}
            />
            <Text style={styles.smallText}>Repeated</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.baseTextInputBox}>
          <SimIcon name="note" size={24} color="#7A7A7A" />
          <TextInput
            style={styles.memoInput}
            placeholder="Memo"
            placeholderTextColor={'#C9C9C9'}
            value={event.memo}
            onChange={onChangeMemo}
            multiline={true}
          />
        </View>
        <TouchableOpacity style={styles.baseTextInputBox}>
          <FonIcon name="circle" size={16} color={tag.color} />
          <Text style={styles.smallText}>{tag.name}</Text>
        </TouchableOpacity>
        <CreateButton title={'Create'} onCreate={createEvent} />
      </View>
      <EventRepeatModal
        repeat={repeat}
        setRepeat={setRepeat}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
      <DatePicker
        modal
        open={openStartDatePicker}
        date={start}
        onConfirm={date => {
          setOpenStartDatePicker(false);
          onConfirmStartDate(date);
        }}
        onCancel={() => {
          setOpenStartDatePicker(false);
        }}
      />
      <DatePicker
        modal
        open={openEndDatePicker}
        date={end}
        onConfirm={date => {
          setOpenEndDatePicker(false);
          onConfirmEndDate(date);
        }}
        onCancel={() => {
          setOpenEndDatePicker(false);
        }}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    gap: 4,
    padding: 10,
    alignItems: 'center',
  },
  baseTextInputBox: {
    flexDirection: 'row',
    width: 340,
    padding: 10,
    borderRadius: 12,
    backgroundColor: '#F5F7FE',
    flexWrap: 'wrap',
    alignItems: 'center',
    marginBottom: 24,
    gap: 10,
  },
  eventNameInput: {
    fontFamily: 'Pretendard',
    fontSize: 20,
    color: 'black',
    fontWeight: '600',
    flex: 1,
  },
  startAtText: {
    color: '#7A7A7A',
    fontFamily: 'Pretendard',
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: '400',
    marginRight: 50,
  },
  smallText: {
    color: 'black',
    fontFamily: 'Pretendard',
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: '400',
  },
  timeText: {
    color: 'black',
    fontFamily: 'Pretendard',
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: '400',
  },
  smallBoxContainer: {
    flexDirection: 'row',
    width: 340,
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  smallBox: {
    flexDirection: 'row',
    width: 145,
    height: 36,
    borderRadius: 12,
    backgroundColor: '#F5F7FE',
    alignItems: 'center',
    paddingLeft: 10,
    gap: 10,
  },
  memoInput: {
    color: 'black',
    fontFamily: 'Pretendard',
    fontSize: 14,
    fontWeight: '500',
    flex: 1,
  },
});

export default AddEventScreen;
