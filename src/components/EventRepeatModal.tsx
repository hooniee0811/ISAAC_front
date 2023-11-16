import React, {FC, useState} from 'react';
import {Repeat} from '../screens/AddEventScreen';
import {
  StyleSheet,
  Text,
  View,
  Modal,
  Pressable,
  TextInput,
  NativeSyntheticEvent,
  TextInputChangeEventData,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {TouchableOpacity} from 'react-native-gesture-handler';
import EventRepeatCalendarModal from './EventRepeatCalendarModal';
import Icon from 'react-native-vector-icons/AntDesign';
import {format} from 'date-fns';

type Props = {
  repeat: Repeat;
  setRepeat: React.Dispatch<React.SetStateAction<Repeat>>;
  modalVisible: boolean;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

const EventRepeatModal = (props: Props) => {
  const today = new Date();
  const [periodScale, setPeriodScale] = useState<string>(
    props.repeat === null ? '1' : String(props.repeat.scale),
  );
  const [periodUnit, setPeriodUnit] = useState<string>(
    props.repeat === null ? 'day' : props.repeat.unit,
  );
  const [endDate, setEndDate] = useState<Date>(
    props.repeat === null ? today : props.repeat.endDate,
  );
  const [calendarModalVisible, setCalendarModalVisible] =
    useState<boolean>(false);

  const onChangePeriodScale = (
    evt: NativeSyntheticEvent<TextInputChangeEventData>,
  ) => {
    if (!isNaN(Number(evt.nativeEvent.text)))
      setPeriodScale(evt.nativeEvent.text);
  };

  const toggleCalendar = () => {
    setCalendarModalVisible(true);
  };

  const dontRepeat = () => {
    props.setRepeat(null);
    props.setModalVisible(false);
  };

  const complete = () => {
    props.setRepeat({
      scale: Number(periodScale),
      unit: periodUnit,
      endDate: endDate,
    });
    props.setModalVisible(false);
  };

  return (
    <>
      <Modal
        animationType={'fade'}
        transparent={true}
        visible={props.modalVisible}
        onRequestClose={() => {
          props.setModalVisible(false);
        }}>
        <Pressable
          style={styles.modalOutSide}
          onPress={() => {
            props.setModalVisible(false);
          }}
        />
        <View style={styles.modalContainer}>
          <Text style={styles.title}>Repeat every</Text>
          <View style={styles.periodContainer}>
            <TextInput
              value={`${periodScale}`}
              style={styles.periodScaleBox}
              onChange={onChangePeriodScale}
            />
            <Picker
              selectedValue={periodUnit}
              onValueChange={(value, index) => {
                setPeriodUnit(value);
              }}
              dropdownIconColor="black"
              style={styles.picker}>
              <Picker.Item label="day(s)" value="day" />
              <Picker.Item label="week(s)" value="week" />
              <Picker.Item label="month(s)" value="month" />
              <Picker.Item label="year(s)" value="year" />
            </Picker>
          </View>
          <Text style={styles.title}>Until</Text>
          <Pressable style={styles.calendarSelector} onPress={toggleCalendar}>
            <Icon name="calendar" size={16} color="#7A7A7A" />
            <Text style={styles.calendarSelectorText}>
              {format(endDate, 'yyyy/MM/dd')}
            </Text>
          </Pressable>
          <View style={styles.btnContainer}>
            <Pressable style={styles.dontReapeatBtn} onPress={dontRepeat}>
              <Text style={styles.dontRepeatText}>Don't repeat</Text>
            </Pressable>
            <Pressable style={styles.completeBtn} onPress={complete}>
              <Text style={styles.completeText}>Complete</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <EventRepeatCalendarModal
        visible={calendarModalVisible}
        setVisible={setCalendarModalVisible}
        setEndDate={setEndDate}
      />
    </>
  );
};

const styles = StyleSheet.create({
  modalOutSide: {
    flex: 1,
    backgroundColor: 'rgba(97, 97, 97, 0.70)',
  },
  modalContainer: {
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: [{translateX: -140}, {translateY: -150}],
    backgroundColor: 'white',
    width: 280,
    height: 300,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    width: 240,
    marginBottom: 8,
    color: 'black',
    fontFamily: 'Pretendard',
    fontSize: 14,
    fontWeight: '500',
  },
  periodScaleBox: {
    borderRadius: 12,
    backgroundColor: '#F5F7FE',
    marginBottom: 8,
    textAlign: 'center',
    width: 60,
    color: 'black',
    fontFamily: 'Pretendard',
    fontSize: 14,
    fontWeight: '500',
  },
  periodContainer: {
    width: 240,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  picker: {
    width: 160,
    backgroundColor: '#F5F7FE',
    marginBottom: 8,
    marginLeft: 20,
    color: 'black',
    borderRadius: 12,
  },
  calendarSelector: {
    borderRadius: 12,
    backgroundColor: '#F5F7FE',
    marginBottom: 8,
    width: 240,
    height: 48,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 10,
  },
  calendarSelectorText: {
    fontFamily: 'Pretendard',
    fontSize: 14,
    fontWeight: '500',
    color: '#7A7A7A',
    marginLeft: 10,
  },
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
    width: 240,
  },
  completeBtn: {
    backgroundColor: '#5878E8',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    height: 48,
  },
  completeText: {
    fontFamily: 'Pretendard',
    fontSize: 14,
    fontWeight: '500',
    color: 'white',
  },
  dontReapeatBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 48,
  },
  dontRepeatText: {
    color: '#5878E8',
    fontFamily: 'Pretendard',
    fontSize: 14,
    fontWeight: '400',
  },
});

export default EventRepeatModal;
