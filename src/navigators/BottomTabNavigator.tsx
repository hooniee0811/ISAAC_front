import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import CalendarScreen from '../screens/CalendarScreen';
import AddScheduleStackNavigator from './AddScheduleStackNavigator';
import SettingsStackNavigator from './SettingsStackNavigator';
import {StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export type BottomTabParamList = {
  Calendar: {userId: string};
  AddSchedule: {userId: string};
  Settings: {userId: string};
};

type Props = {
  userId: string;
};

const Tab = createBottomTabNavigator<BottomTabParamList>();

const BottomTabNavigator = (props: Props) => {
  return (
    <Tab.Navigator
      initialRouteName="Calendar"
      screenOptions={{
        headerShown: false,
        tabBarStyle: {backgroundColor: '#F5F7FE', borderColor: '#F5F7FE'},
      }}>
      <Tab.Screen
        name="Calendar"
        component={CalendarScreen}
        initialParams={{userId: props.userId}}
        options={{
          tabBarIcon: ({size, focused}) => (
            <View style={focused ? styles.focusedContainer : styles.container}>
              <Icon
                name="circle"
                size={12}
                color={focused ? 'black' : '#616161'}
              />
            </View>
          ),
          tabBarLabel: ({focused}) => (
            <Text style={focused ? styles.focusedLabel : styles.label}>
              Calendar
            </Text>
          ),
        }}
      />
      <Tab.Screen
        name="AddSchedule"
        component={AddScheduleStackNavigator}
        initialParams={{userId: props.userId}}
        options={{
          tabBarIcon: ({size, focused}) => (
            <View style={focused ? styles.focusedContainer : styles.container}>
              <Icon
                name="circle"
                size={12}
                color={focused ? 'black' : '#616161'}
              />
            </View>
          ),
          tabBarLabel: ({focused}) => (
            <Text style={focused ? styles.focusedLabel : styles.label}>
              Add Schedule
            </Text>
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsStackNavigator}
        initialParams={{userId: props.userId}}
        options={{
          tabBarIcon: ({size, focused}) => (
            <View style={focused ? styles.focusedContainer : styles.container}>
              <Icon
                name="circle"
                size={12}
                color={focused ? 'black' : '#616161'}
              />
            </View>
          ),
          tabBarLabel: ({focused}) => (
            <Text style={focused ? styles.focusedLabel : styles.label}>
              Settings
            </Text>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 56,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  focusedContainer: {
    width: 56,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#CED7F8',
    borderRadius: 16,
  },
  label: {
    fontFamily: 'Pretendard',
    fontSize: 12,
    fontWeight: '700',
    color: '#616161',
    // marginBottom: 5,
  },
  focusedLabel: {
    fontFamily: 'Pretendard',
    fontSize: 12,
    fontWeight: '700',
    color: 'black',
    // marginBottom: 5,
  },
});

export default BottomTabNavigator;
