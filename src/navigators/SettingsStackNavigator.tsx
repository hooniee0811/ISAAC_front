import {createStackNavigator} from '@react-navigation/stack';
import React, {FC} from 'react';
import SettingsScreen from '../screens/SettingsScreen';
import NotificationScreen from '../screens/NotificationScreen';
import ProjectListScreen from '../screens/ProjectListScreen';
import RoutineListScreen from '../screens/RoutineListScreen';
import TagListScreen from '../screens/TagListScreen';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {BottomTabParamList} from './BottomTabNavigator';
import HeaderTitle from '../components/HeaderTitle';
import AddRoutineScreen from '../screens/AddRoutineScreen';
import {useRoute} from '@react-navigation/native';

type Props = BottomTabScreenProps<BottomTabParamList, 'Settings'>;

export type SettingsStackParamList = {
  RootSettings: {userId: string};
  Notification: {userId: string};
  Routines: {userId: string};
  AddRoutine: {userId: string};
  Tags: {userId: string};
  Projects: {userId: string};
};

const Stack = createStackNavigator<SettingsStackParamList>();

const SettingsStackNavigator: FC<Props> = () => {
  const route = useRoute<Props['route']>();
  const userId = route.params.userId;

  return (
    <Stack.Navigator
      screenOptions={{
        headerTitle: () => <HeaderTitle />,
        headerTitleAlign: 'center',
      }}>
      <Stack.Screen
        name="RootSettings"
        component={SettingsScreen}
        initialParams={{userId: userId}}
      />
      <Stack.Screen
        name="Notification"
        component={NotificationScreen}
        initialParams={{userId: userId}}
      />
      <Stack.Screen
        name="Routines"
        component={RoutineListScreen}
        initialParams={{userId: userId}}
      />
      <Stack.Screen
        name="AddRoutine"
        component={AddRoutineScreen}
        initialParams={{userId: userId}}
      />
      <Stack.Screen
        name="Tags"
        component={TagListScreen}
        initialParams={{userId: userId}}
      />
      <Stack.Screen
        name="Projects"
        component={ProjectListScreen}
        initialParams={{userId: userId}}
      />
    </Stack.Navigator>
  );
};

export default SettingsStackNavigator;
