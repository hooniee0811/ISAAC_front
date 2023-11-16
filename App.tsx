import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import React, {useState} from 'react';
import BottomTabNavigator from './src/navigators/BottomTabNavigator';
import {Text, View} from 'react-native';
import RootScreen from './src/screens/RootScreen';

function App(): JSX.Element {
  const [userId, setUserId] = useState<string>('');
  return (
    <NavigationContainer theme={{colors: {background: 'white'}}}>
      {userId === '' ? (
        <RootScreen userId={userId} setUserId={setUserId} />
      ) : (
        <BottomTabNavigator userId={userId} />
      )}
    </NavigationContainer>
  );
}

export default App;
