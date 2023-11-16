import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const ProfileBar = () => {
  return (
    <View style={styles.container}>
      <View style={styles.profileImage} />
      <View>
        <Text style={styles.userName}>Random Name</Text>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Icon name="birthday-cake" color="gray" />
          <Text style={styles.birthday}>0000.00.00</Text>
        </View>
      </View>
      <View>
        <TouchableOpacity style={styles.editBtn}>
          <Text style={styles.editText}>Edit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 108,
    padding: 30,
    backgroundColor: '#F5F7FE',
  },
  profileImage: {
    width: 60,
    height: 60,
    backgroundColor: 'gray',
    marginRight: 20,
  },
  userName: {
    color: 'black',
    fontFamily: 'Pretendard',
    fontSize: 24,
    fontStyle: 'normal',
    fontWeight: '700',
  },
  birthday: {
    color: 'black',
    fontFamily: 'Pretendard',
    fontSize: 12,
    fontStyle: 'normal',
    fontWeight: '500',
    marginLeft: 5,
  },
  editBtn: {
    width: 44,
    height: 28,
    marginLeft: 60,
    borderRadius: 20,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  editText: {
    color: 'black',
    fontFamily: 'Pretendard',
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: '500',
  },
});

export default ProfileBar;
