import {
  CompositeScreenProps,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  TextInput,
  NativeSyntheticEvent,
  TextInputChangeEventData,
  Text,
  Alert,
} from 'react-native';
import {AddScheduleStackParamList} from '../navigators/AddScheduleStackNavigator';
import {StackScreenProps} from '@react-navigation/stack';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {BottomTabParamList} from '../navigators/BottomTabNavigator';
import uuid from 'react-native-uuid';
import FeaIcon from 'react-native-vector-icons/Feather';
import FontIcon from 'react-native-vector-icons/FontAwesome';
import CreateButton from '../components/CreateButton';
import axios from 'axios';
import {addDays} from 'date-fns';
import {TouchableOpacity} from 'react-native-gesture-handler';

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
};

const AddTaskScreen = () => {
  const navigation = useNavigation<Props['navigation']>();
  const route = useRoute<Props['route']>();
  const AiTasks = route.params.tasks;
  const projectProp = route.params.project;

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
  const [project, setProject] = useState<Project>({
    id: projectProp.id,
    user_id: projectProp.user_id,
    name: projectProp.name,
    goal: projectProp.goal,
    expectedOutcome: projectProp.expectedOutcome,
    start: new Date(projectProp.start),
    end: new Date(projectProp.end),
    details: projectProp.details,
  });

  console.log(tasks);
  console.log(project);
  // console.log(projectProp.start);
  // console.log(project.start);

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

  const onChangeTaskDuration = (
    index: number,
    evt: NativeSyntheticEvent<TextInputChangeEventData>,
  ) => {
    const cp = [...tasks];
    if (!isNaN(Number(evt.nativeEvent.text))) {
      cp[index].duration = Number(evt.nativeEvent.text);
    }
    setTasks(cp);
  };

  const goUp = (index: number) => {
    const cp = [...tasks];
    const tmp = cp[index];
    cp[index] = cp[index - 1];
    cp[index].order = tmp.order;
    cp[index - 1] = tmp;
    cp[index - 1].order = tmp.order - 1;
    setTasks(cp);
  };

  const goDown = (index: number) => {
    const cp = [...tasks];
    const tmp = cp[index];
    cp[index] = cp[index + 1];
    cp[index].order = tmp.order;
    cp[index + 1] = tmp;
    cp[index + 1].order = tmp.order + 1;
    setTasks(cp);
  };

  const deleteTask = (index: number) => {
    const cp = [...tasks];
    cp.splice(index, 1);
    let i;
    for (i = index; i < cp.length; i++) {
      cp[i].order = cp[i].order - 1;
    }
    setTasks(cp);
  };

  const onAddTask = () => {
    const cp = [...tasks];
    cp.push({
      order: cp.length + 1,
      name: '',
      duration: 0,
      description: '',
      id: uuid.v4(),
      user_id: route.params.userId,
      tag_id: 'da54cea4-bf89-42dc-b54d-be2d10bbe525',
      proj_id: route.params.project.id,
    });
    setTasks(cp);
  };

  const submitTask = () => {
    axios
      .post('https://api.calendar-isaac-isaac-isaac.shop/project/create', {
        project: project,
        tasks: tasks,
      })
      .then(response => {
        if (response.data.message) {
          Alert.alert(response.data.message);
          navigation.popToTop();
        } else {
          Alert.alert(response.data.error);
        }
      })
      .catch(error => {
        Alert.alert(error);
      });
  };

  return (
    <ScrollView style={styles.container}>
      {tasks.map((task, index) => {
        const [editDuration, setEditDuration] = useState<boolean>(false);
        const activateTextInput = () => {
          setEditDuration(true);
        };
        const deActivateTextInput = () => {
          setEditDuration(false);
        };
        return (
          <View key={JSON.stringify(task.id)} style={styles.taskContainer}>
            <View style={styles.taskNameContainer}>
              <TextInput
                style={styles.taskNameText}
                value={task.name}
                placeholder="Task Name"
                placeholderTextColor="#C9C9C9"
                onChange={evt => onChangeTaskName(index, evt)}
              />
              <View style={styles.taskBtnContainer}>
                <TouchableOpacity onPress={() => goUp(index)}>
                  <FeaIcon name="arrow-up-circle" size={20} color="#7A7A7A" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => goDown(index)}>
                  <FeaIcon name="arrow-down-circle" size={20} color="#7A7A7A" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => deleteTask(index)}>
                  <FontIcon name="trash-o" size={20} color="#7A7A7A" />
                </TouchableOpacity>
              </View>
            </View>
            <TouchableOpacity onPress={activateTextInput}>
              {editDuration ? (
                <TextInput
                  value={`${task.duration}`}
                  onChange={evt => onChangeTaskDuration(index, evt)}
                  onBlur={deActivateTextInput}
                />
              ) : (
                <Text style={styles.durationText}>{task.duration} hours</Text>
              )}
            </TouchableOpacity>
            <TextInput
              style={styles.descriptionText}
              value={task.description}
              placeholder="Add Description"
              placeholderTextColor="#C9C9C9"
              onChange={evt => onChangeTaskDescription(index, evt)}
              multiline={true}
            />
          </View>
        );
      })}
      <TouchableOpacity style={styles.addTaskBtn} onPress={onAddTask}>
        <FeaIcon name="check-circle" size={20} color="#7A7A7A" />
        <Text style={styles.addTaskText}>Add Task</Text>
      </TouchableOpacity>
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
  addTaskBtn: {
    width: 340,
    backgroundColor: '#F5F7FE',
    borderRadius: 12,
    flexDirection: 'row',
    gap: 8,
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    marginBottom: 18,
  },
  addTaskText: {
    fontFamily: 'Pretendard',
    fontSize: 16,
    fontWeight: '500',
    color: '#7A7A7A',
  },
});

export default AddTaskScreen;
