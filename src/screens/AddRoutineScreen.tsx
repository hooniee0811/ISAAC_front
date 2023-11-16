import {
  Alert,
  NativeSyntheticEvent,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TextInputChangeEventData,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import MatIcon from 'react-native-vector-icons/MaterialIcons';
import SimIcon from 'react-native-vector-icons/SimpleLineIcons';
import MatComIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import FonIcon from 'react-native-vector-icons/FontAwesome';
import AntIcon from 'react-native-vector-icons/AntDesign';
import uuid from 'react-native-uuid';
import CreateButton from '../components/CreateButton';
import DatePicker from 'react-native-date-picker';
import {useNavigation, useRoute} from '@react-navigation/native';
import {StackScreenProps} from '@react-navigation/stack';
import {SettingsStackParamList} from '../navigators/SettingsStackNavigator';
import axios from 'axios';

type Props = StackScreenProps<SettingsStackParamList, 'AddRoutine'>;

type Routine = {
  id: string | number[];
  name: string;
  memo: string;
  days: number[];
  start: {
    hour: number;
    minute: number;
  };
  end: {
    hour: number;
    minute: number;
  };
  flexibility: string;
  tag: string | number[];
  user: string | number[];
};

const AddRoutineScreen = () => {
  const navigation = useNavigation<Props['navigation']>();
  const route = useRoute<Props['route']>();
  const userId = route.params.userId;

  const [routine, setRoutine] = useState<Routine>({
    id: uuid.v4(),
    name: '',
    memo: '',
    days: [],
    start: {
      hour: 8,
      minute: 0,
    },
    end: {
      hour: 9,
      minute: 0,
    },
    flexibility: 'Strict',
    tag: '012b077b-5b86-409e-8f08-6682f6bb62df',
    user: userId,
  });

  //fetch (useEffect)
  const tag = {
    name: 'Default Routine',
    color: '#646E68',
  };
  const [openStartTimePicker, setOpenStartTimePicker] =
    useState<boolean>(false);
  const [openEndTimePicker, setOpenEndTimePicker] = useState<boolean>(false);

  const onConfirmStartTime = (date: Date) => {
    const cp = {...routine};
    cp.start = {
      hour: date.getHours(),
      minute: date.getMinutes(),
    };
    setRoutine(cp);
  };

  const onConfirmEndTime = (date: Date) => {
    const cp = {...routine};
    cp.end = {
      hour: date.getHours(),
      minute: date.getMinutes(),
    };
    setRoutine(cp);
  };

  const dayNames = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

  const onChangeRoutineName = (
    evt: NativeSyntheticEvent<TextInputChangeEventData>,
  ) => {
    const cp = {...routine};
    cp.name = evt.nativeEvent.text;
    setRoutine(cp);
  };
  const onPressDayName = (num: number) => () => {
    const cp = {...routine};

    if (cp.days.includes(num)) {
      cp.days = cp.days.filter(e => e !== num);
    } else {
      cp.days.push(num);
    }
    setRoutine(cp);
  };
  const onChangeMemo = (
    evt: NativeSyntheticEvent<TextInputChangeEventData>,
  ) => {
    const cp = {...routine};
    cp.memo = evt.nativeEvent.text;
    setRoutine(cp);
  };
  const onFlexibiltyStrict = () => {
    const cp = {...routine};
    cp.flexibility = 'Strict';
    setRoutine(cp);
  };
  const onFlexibiltyModerate = () => {
    const cp = {...routine};
    cp.flexibility = 'Moderate';
    setRoutine(cp);
  };
  const onFlexibiltyFlexible = () => {
    const cp = {...routine};
    cp.flexibility = 'Flexible';
    setRoutine(cp);
  };

  const onCreate = () => {
    //check if end-time is later than start-time
    if (routine.name === '') {
      Alert.alert('일정 제목을 입력해주세요');
    } else if (routine.end.hour < routine.start.hour) {
      Alert.alert('종료 시간이 시작 시간보다 빠릅니다!');
    } else if (
      routine.end.hour === routine.start.hour &&
      routine.end.minute < routine.start.minute
    ) {
      Alert.alert('종료 시간이 시작 시간보다 빠릅니다!');
    } else {
      axios
        .post('http://192.168.35.93:3000/routine/create', {
          routine: routine,
        })
        .then(response => {
          Alert.alert(response.data.message);
          console.log(routine);
          navigation.popToTop();
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
            placeholder="Routine Name"
            placeholderTextColor={'#C9C9C9'}
            value={routine.name}
            onChange={onChangeRoutineName}
            multiline={true}
          />
        </View>
        <View style={styles.baseTextInputBox}>
          <AntIcon name="clockcircleo" size={24} color="#7A7A7A" />
          <View style={{flex: 1}}>
            <TouchableOpacity
              style={styles.timeContainer}
              onPress={() => setOpenStartTimePicker(true)}>
              <Text style={styles.startAtText}>Starts at</Text>
              <Text style={styles.timeText}>
                {routine.start.hour < 10
                  ? `0${routine.start.hour}`
                  : routine.start.hour}
                {':'}
                {routine.start.minute < 10
                  ? `0${routine.start.minute}`
                  : routine.start.minute}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.timeContainer}
              onPress={() => setOpenEndTimePicker(true)}>
              <Text style={styles.startAtText}>Ends at</Text>
              <Text style={styles.timeText}>
                {routine.end.hour < 10
                  ? `0${routine.end.hour}`
                  : routine.end.hour}
                {':'}
                {routine.end.minute < 10
                  ? `0${routine.end.minute}`
                  : routine.end.minute}
              </Text>
            </TouchableOpacity>
            <View style={styles.dayNameContainer}>
              {dayNames.map((dayName, index) => (
                <TouchableOpacity
                  key={index}
                  style={
                    routine.days.includes(index)
                      ? styles.dayNameBtnSelected
                      : styles.dayNameBtn
                  }
                  onPress={onPressDayName(index)}>
                  <Text style={styles.bodyText}>{dayName}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>
        <View style={styles.baseTextInputBox}>
          <SimIcon name="note" size={24} color="#7A7A7A" />
          <TextInput
            style={styles.memoInput}
            placeholder="Memo"
            placeholderTextColor={'#C9C9C9'}
            value={routine.memo}
            onChange={onChangeMemo}
            multiline={true}
          />
        </View>
        <View style={styles.baseTextInputBox}>
          <View style={styles.flexibilityHeader}>
            <MatComIcon name="circle-outline" size={16} color="black" />
            <Text style={styles.HeaderText}>Flexibility</Text>
          </View>
          <View style={styles.flexibilitybody}>
            <TouchableOpacity
              style={styles.flexibilityBtn}
              onPress={onFlexibiltyStrict}>
              <MatComIcon
                name={
                  routine.flexibility === 'Strict'
                    ? 'circle-slice-8'
                    : 'circle-outline'
                }
                size={16}
                color={routine.flexibility === 'Strict' ? '#5878E8' : '#7A7A7A'}
              />
              <Text style={styles.bodyText}>Strict</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.flexibilityBtn}
              onPress={onFlexibiltyModerate}>
              <MatComIcon
                name={
                  routine.flexibility === 'Moderate'
                    ? 'circle-slice-8'
                    : 'circle-outline'
                }
                size={16}
                color={
                  routine.flexibility === 'Moderate' ? '#5878E8' : '#7A7A7A'
                }
              />
              <Text style={styles.bodyText}>Moderate</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.flexibilityBtn}
              onPress={onFlexibiltyFlexible}>
              <MatComIcon
                name={
                  routine.flexibility === 'Flexible'
                    ? 'circle-slice-8'
                    : 'circle-outline'
                }
                size={16}
                color={
                  routine.flexibility === 'Flexible' ? '#5878E8' : '#7A7A7A'
                }
              />
              <Text style={styles.bodyText}>Flexible</Text>
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity style={styles.baseTextInputBox}>
          <FonIcon name="circle" size={16} color={tag.color} />
          <Text style={styles.HeaderText}>{tag.name}</Text>
        </TouchableOpacity>
        <CreateButton title={'Create'} onCreate={onCreate} />
      </View>
      <DatePicker
        modal
        open={openStartTimePicker}
        mode="time"
        date={new Date()}
        onConfirm={date => {
          setOpenStartTimePicker(false);
          onConfirmStartTime(date);
        }}
        onCancel={() => {
          setOpenStartTimePicker(false);
        }}
      />
      <DatePicker
        modal
        open={openEndTimePicker}
        mode="time"
        date={new Date()}
        onConfirm={date => {
          setOpenEndTimePicker(false);
          onConfirmEndTime(date);
        }}
        onCancel={() => {
          setOpenEndTimePicker(false);
        }}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    alignItems: 'center',
    gap: 4,
    paddingVertical: 10,
    paddingHorizontal: 32,
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
  dayNameContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  dayNameBtn: {
    borderRadius: 8,
    width: 28,
    height: 28,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  dayNameBtnSelected: {
    borderRadius: 12,
    backgroundColor: '#93A8F0',
    width: 28,
    height: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
    marginBottom: 12,
  },
  startAtText: {
    color: '#7A7A7A',
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
    marginRight: 120,
  },
  memoInput: {
    color: 'black',
    fontFamily: 'Pretendard',
    fontSize: 14,
    fontWeight: '500',
    flex: 1,
  },
  flexibilityBox: {
    width: 320,
    padding: 10,
    borderRadius: 12,
    backgroundColor: '#F5F7FE',
    flexWrap: 'wrap',
    alignItems: 'center',
    marginBottom: 24,
    gap: 10,
  },
  flexibilityHeader: {
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: 12,
  },
  HeaderText: {
    color: 'black',
    fontFamily: 'Pretendard',
    fontSize: 14,
    fontWeight: '500',
    flex: 1,
  },
  flexibilitybody: {
    flexDirection: 'row',
    gap: 12,
    justifyContent: 'flex-start',
    marginBottom: 16,
  },
  bodyText: {
    color: 'black',
    fontFamily: 'Pretendard',
    fontSize: 12,
    fontWeight: '400',
  },
  flexibilityBtn: {
    flexDirection: 'row',
    paddingLeft: 8,
    gap: 8,
  },
});

export default AddRoutineScreen;
