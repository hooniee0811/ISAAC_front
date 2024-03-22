import {startOfWeek, startOfMonth, endOfMonth, endOfWeek} from 'date-fns';
import React from 'react';
import {Modal, Pressable, View, Text, StyleSheet} from 'react-native';

type Props = {
  openModal: boolean;
  setViewType: React.Dispatch<React.SetStateAction<string>>;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const CalendarViewTypeSelectModal = (props: Props) => {
  const selectViewType = (value: string) => () => {
    const today = new Date();

    props.setViewType(value);
    props.setOpenModal(false);

    // if (value === 'Monthly') {
    //   props.setStartDateOfCalendar(startOfWeek(startOfMonth(today)));
    //   props.setEndDateOfCalendar(endOfWeek(endOfMonth(today)));
    // } else if (value === 'Weekly') {
    //   props.setStartDateOfCalendar(startOfWeek(today));
    //   props.setEndDateOfCalendar(endOfWeek(today));
    // } else if (value === 'Daily') {
    //   props.setStartDateOfCalendar(today);
    //   props.setEndDateOfCalendar(today);
    // }
  };

  return (
    <Modal
      transparent={true}
      visible={props.openModal}
      animationType={'fade'}
      onRequestClose={() => props.setOpenModal(false)}
      style={styles.modal}>
      <Pressable
        style={styles.modalOutside}
        onPress={() => props.setOpenModal(false)}
      />
      <View style={styles.modalContainer}>
        <Pressable
          style={{...styles.modalBtn, borderBottomWidth: 0.5}}
          onPress={selectViewType('Monthly')}>
          <Text style={styles.modalBtnText}>Monthly</Text>
        </Pressable>
        <Pressable
          style={{...styles.modalBtn, borderBottomWidth: 0.5}}
          onPress={selectViewType('Weekly')}>
          <Text style={styles.modalBtnText}>Weekly</Text>
        </Pressable>
        <Pressable style={styles.modalBtn} onPress={selectViewType('Daily')}>
          <Text style={styles.modalBtnText}>Daily</Text>
        </Pressable>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalOutside: {
    flex: 1,
    backgroundColor: 'rgba(97, 97, 97, 0.70)',
    alignItems: 'center',
  },
  modalContainer: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{translateX: -80}, {translateY: -80}],
    width: 160,
    height: 160,
    backgroundColor: 'white',
    borderRadius: 12,
  },
  modalBtn: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBtnText: {
    color: 'black',
    fontFamily: 'Pretendard',
  },
});

export default CalendarViewTypeSelectModal;
