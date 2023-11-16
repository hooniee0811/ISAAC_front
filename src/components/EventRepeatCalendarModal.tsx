import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Pressable,
} from 'react-native';
import {DateData, Calendar} from 'react-native-calendars';

type Props = {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  setEndDate: React.Dispatch<React.SetStateAction<Date>>;
};

const EventRepeatCalendarModal = (props: Props) => {
  const [selectedDate, setSelectedDate] = useState('');

  const handleDayPress = (day: DateData) => {
    setSelectedDate(day.dateString);
  };

  const handleConfirm = () => {
    props.setEndDate(new Date(selectedDate));
    props.setVisible(false);
  };

  return (
    <>
      <Modal
        visible={props.visible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => props.setVisible(false)}>
        <View style={styles.Container}>
          <Pressable
            style={styles.modalOutside}
            onPress={() => {
              props.setVisible(false);
            }}
          />
          <View style={styles.modaContainer}>
            <Calendar
              onDayPress={handleDayPress}
              markedDates={{
                [selectedDate]: {
                  selected: true,
                },
              }}
              theme={{
                selectedDayBackgroundColor: '#5878E8',
              }}
            />
            <View style={styles.btnContainer}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => {
                  props.setVisible(false);
                }}>
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.confirmButton}
                onPress={handleConfirm}>
                <Text style={styles.confirmText}>Next</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  Container: {
    flex: 1,
    justifyContent: 'center',
  },
  modalOutside: {
    flex: 1,
    backgroundColor: 'rgba(97, 97, 97, 0.70)',
  },
  modaContainer: {
    backgroundColor: 'white',
  },
  btnContainer: {
    flexDirection: 'row',
    marginTop: 5,
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingBottom: 10,
    justifyContent: 'space-between',
  },
  cancelButton: {
    backgroundColor: 'white',
    padding: 10,
    alignItems: 'center',
  },
  confirmButton: {
    padding: 10,
    backgroundColor: '#5878E8',
    alignItems: 'center',
    borderRadius: 12,
  },
  cancelText: {
    color: '#5878E8',
    fontFamily: 'Pretendard',
    fontSize: 14,
    fontWeight: '500',
  },
  confirmText: {
    fontFamily: 'Pretendard',
    fontSize: 14,
    fontWeight: '500',
    color: 'white',
  },
});

export default EventRepeatCalendarModal;
