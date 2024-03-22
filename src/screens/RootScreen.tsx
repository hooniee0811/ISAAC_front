import axios from 'axios';
import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  NativeSyntheticEvent,
  TextInputChangeEventData,
  Alert,
} from 'react-native';
import uuid from 'react-native-uuid';
// import signInWithGoogle from '../images/SignInWithGoogle.png'

type Props = {
  userId: string;
  setUserId: React.Dispatch<React.SetStateAction<string>>;
};

const RootScreen = (props: Props) => {
  const [id, setId] = useState<string>('');
  const [pw, setPw] = useState<string>('');

  const onChangeId = (evt: NativeSyntheticEvent<TextInputChangeEventData>) => {
    setId(evt.nativeEvent.text);
  };
  const onChangePw = (evt: NativeSyntheticEvent<TextInputChangeEventData>) => {
    setPw(evt.nativeEvent.text);
  };
  const login = () => {
    // axios
    //   .post('https://api.calendar-isaac-isaac-isaac.shop/user/signin', {
    //     loginId: id,
    //     password: pw,
    //   })
    //   .then(response => {
    //     if (response.data.userId) {
    //       props.setUserId(response.data.userId);
    //     } else {
    //       Alert.alert(response.data.message);
    //     }
    //   })
    //   .catch(error => {
    //     Alert.alert(error);
    //   });

    props.setUserId('9199f5db-1d16-45a6-a2df-6272bca46163');
  };

  const signUp = () => {
    axios
      .post('https://api.calendar-isaac-isaac-isaac.shop/user/signup', {
        user_id: uuid.v4(),
        loginId: id,
        password: pw,
        default_tag_id: uuid.v4(),
        routine_default_tag_id: uuid.v4(),
      })
      .then(response => {
        if (response.data.userId) {
          props.setUserId(response.data.userId);
        } else {
          Alert.alert(response.data.message);
        }
      })
      .catch(error => {
        Alert.alert(error);
      });

    // props.setUserId('9199f5db-1d16-45a6-a2df-6272bca46163');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>ISAAC</Text>
      <Text style={styles.description}>일정에서 자유로워지다</Text>
      {/* <TouchableOpacity style={styles.signInBtn}>
        <Image
          source={require('../images/GoogleLogo.png')}
          style={styles.googleLogo}
        />
        <Text style={styles.signInText}>Sign in with Google</Text>
      </TouchableOpacity> */}
      <TextInput
        style={styles.textInput}
        placeholder="ID"
        placeholderTextColor={'black'}
        value={id}
        onChange={onChangeId}
        multiline={true}
      />
      <TextInput
        style={styles.textInput}
        placeholder="PW"
        placeholderTextColor={'black'}
        value={pw}
        onChange={onChangePw}
        multiline={true}
      />
      <TouchableOpacity style={styles.createBtn} onPress={login}>
        <Text style={styles.createText}>Log In</Text>
      </TouchableOpacity>
      <View style={styles.bottomTextContainer}>
        <Text style={styles.versionText}>ver 1.0.0</Text>
        <Text style={styles.versionText}>Team ISAAC</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  logo: {
    color: 'black',
    fontFamily: 'Pretendard',
    fontSize: 48,
    fontWeight: '900',
    letterSpacing: 4,
  },
  description: {
    color: 'black',
    fontFamily: 'Pretendard',
    fontSize: 20,
    fontWeight: '300',
    letterSpacing: 1,
    marginBottom: 48,
  },
  versionText: {
    color: 'black',
    fontFamily: 'Pretendard',
    fontSize: 20,
    fontWeight: '300',
    letterSpacing: 1,
  },
  bottomTextContainer: {
    position: 'absolute',
    bottom: 20,
    alignItems: 'center',
  },
  // signInBtn: {
  //   flexDirection: 'row',
  //   height: 60,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   backgroundColor: '#C9C9C9',
  //   gap: 8,
  //   borderRadius: 30,
  //   padding: 12,
  //   marginTop: 48,
  // },
  // googleLogo: {
  //   width: 40,
  //   height: 40,
  // },
  // signInText: {
  //   color: 'black',
  //   fontFamily: 'Pretendard',
  //   fontSize: 18,
  //   fontWeight: '400',
  // },
  textInput: {
    width: 240,
    padding: 10,
    borderRadius: 12,
    backgroundColor: '#F5F7FE',
    color: 'black',
    fontFamily: 'Pretendard',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  createBtn: {
    width: 240,
    padding: 10,
    borderRadius: 12,
    backgroundColor: '#5878E8',
    alignItems: 'center',
  },
  createText: {
    color: 'white',
    fontFamily: 'Pretendard',
    fontSize: 20,
    fontWeight: '700',
  },
});

export default RootScreen;
