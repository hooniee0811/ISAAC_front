import {createStackNavigator} from '@react-navigation/stack';
import React, {FC} from 'react';
import AddScheduleScreen from '../screens/AddScheduleScreen';
import AddEventScreen from '../screens/AddEventScreen';
import AddProjectScreen, {ProjectProp} from '../screens/AddProjectScreen';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {BottomTabParamList} from './BottomTabNavigator';
import HeaderTitle from '../components/HeaderTitle';
import AddTaskScreen from '../screens/AddTaskScreen';
import {useRoute} from '@react-navigation/native';

type Props = BottomTabScreenProps<BottomTabParamList, 'AddSchedule'>;

export type AiTask = {
  order: number;
  name: string;
  duration: number;
  description: string;
};

export type AddScheduleStackParamList = {
  RootAddSchedule: {userId: string};
  AddProject: {userId: string};
  AddTask: {userId: string; project: string; tasks: AiTask[]};
  AddEvent: {userId: string};
};

const Stack = createStackNavigator<AddScheduleStackParamList>();

const AddScheduleStackNavigator: FC<Props> = () => {
  const route = useRoute<Props['route']>();
  const userId = route.params.userId;

  return (
    <Stack.Navigator
      screenOptions={{
        headerTitle: () => <HeaderTitle />,
        headerTitleAlign: 'center',
      }}>
      <Stack.Screen
        name="RootAddSchedule"
        component={AddScheduleScreen}
        initialParams={{userId: userId}}
      />
      <Stack.Screen
        name="AddProject"
        component={AddProjectScreen}
        initialParams={{userId: userId}}
      />
      <Stack.Screen
        name="AddTask"
        component={AddTaskScreen}
        initialParams={{userId: userId}}
      />
      <Stack.Screen
        name="AddEvent"
        component={AddEventScreen}
        initialParams={{userId: userId}}
      />
    </Stack.Navigator>
  );
};

export default AddScheduleStackNavigator;
