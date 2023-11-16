import {CompositeScreenProps, useRoute} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  TextInput,
  NativeSyntheticEvent,
  TextInputChangeEventData,
  Text,
} from 'react-native';
import {AddScheduleStackParamList} from '../navigators/AddScheduleStackNavigator';
import {StackScreenProps} from '@react-navigation/stack';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {BottomTabParamList} from '../navigators/BottomTabNavigator';
import uuid from 'react-native-uuid';
import FeaIcon from 'react-native-vector-icons/Feather';
import FontIcon from 'react-native-vector-icons/FontAwesome';
import CreateButton from '../components/CreateButton';

type Props = CompositeScreenProps<
  StackScreenProps<AddScheduleStackParamList, 'AddTask'>,
  BottomTabScreenProps<BottomTabParamList, 'AddSchedule'>
>;

type Task = {
  id: string | number[];
  order: number;
  name: string;
  duration: number;
  description: string;
  user_id: string | number[];
  tag_id: string | number[];
  proj_id: string | number[];
};

type Project = {
  id: string | number[];
  user_id: string;
  name: string;
  goal: string;
  expectedOutcome: string;
  start: Date;
  end: Date;
  details: string;
  tag: string | number[];
};

const AddTaskScreen = () => {
  const route = useRoute<Props['route']>();
  const AiTasks = route.params.tasks;

  const [tasks, setTasks] = useState<Task[]>(
    AiTasks.map((AiTask, index) => {
      return {
        ...AiTask,
        id: uuid.v4(),
        user_id: route.params.userId,
        tag_id: 'da54cea4-bf89-42dc-b54d-be2d10bbe525',
        proj_id: route.params.project.id,
      };
    }),
  );

  console.log(tasks);

  const onChangeTaskName = (
    index: number,
    evt: NativeSyntheticEvent<TextInputChangeEventData>,
  ) => {
    const cp = [...tasks];
    cp[index].name = evt.nativeEvent.text;
    setTasks(cp);
  };

  const onChangeTaskDescription = (
    index: number,
    evt: NativeSyntheticEvent<TextInputChangeEventData>,
  ) => {
    const cp = [...tasks];
    cp[index].name = evt.nativeEvent.text;
    setTasks(cp);
  };

  const submitTask = () => {};

  return (
    <ScrollView style={styles.container}>
      {tasks.map((task, index) => (
        <View style={styles.taskContainer} key={task.id}>
          <View style={styles.taskNameContainer}>
            <TextInput
              style={styles.taskNameText}
              value={task.name}
              placeholder="Task Name"
              placeholderTextColor="#C9C9C9"
              onChange={evt => onChangeTaskName(index, evt)}
            />
            <View style={styles.taskBtnContainer}>
              <FeaIcon name="arrow-up-circle" size={20} color="#7A7A7A" />
              <FeaIcon name="arrow-down-circle" size={20} color="#7A7A7A" />
              <FontIcon name="trash-o" size={20} color="#7A7A7A" />
            </View>
          </View>
          <Text style={styles.durationText}>{task.duration} hours</Text>
          <TextInput
            style={styles.descriptionText}
            value={task.description}
            placeholder="Add Description"
            placeholderTextColor="#C9C9C9"
            onChange={evt => onChangeTaskDescription(index, evt)}
            multiline={true}
          />
        </View>
      ))}
      <CreateButton title={'Create'} onCreate={submitTask} />
      <View style={{marginBottom: 40}} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 8,
    paddingHorizontal: 32,
    gap: 8,
  },
  taskContainer: {
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 12,
    backgroundColor: '#F5F7FE',
    flexWrap: 'wrap',
    marginBottom: 8,
    width: 340,
    gap: 4,
    alignItems: 'flex-start',
  },
  taskNameContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  taskNameText: {
    fontFamily: 'Pretendard',
    fontSize: 16,
    fontWeight: '500',
    color: 'black',
    height: 40,
  },
  taskBtnContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  durationText: {
    width: 60,
    textAlign: 'center',
    backgroundColor: 'white',
    paddingHorizontal: 8,
    borderRadius: 20,
    fontFamily: 'Pretendard',
    fontSize: 10,
    fontWeight: '400',
    color: 'black',
  },
  descriptionText: {
    fontFamily: 'Pretendard',
    fontSize: 12,
    fontWeight: '400',
    color: 'black',
  },
});

export default AddTaskScreen;
