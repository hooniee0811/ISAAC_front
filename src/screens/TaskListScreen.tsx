import {useIsFocused, useNavigation, useRoute} from '@react-navigation/native';
import {StackScreenProps} from '@react-navigation/stack';
import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {
  Alert,
  NativeSyntheticEvent,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TextInputChangeEventData,
  TouchableOpacity,
  View,
} from 'react-native';
import {SettingsStackParamList} from '../navigators/SettingsStackNavigator';
import CreateButton from '../components/CreateButton';
import FeaIcon from 'react-native-vector-icons/Feather';
import FontIcon from 'react-native-vector-icons/FontAwesome';
import uuid from 'react-native-uuid';
import {format} from 'date-fns';

type Props = StackScreenProps<SettingsStackParamList, 'Tasks'>;

type Task = {
  id: string | number[];
  task_order: number;
  task_name: string;
  task_time_required: number;
  task_description: string;
  user_id: string;
  tag_id: string;
  proj_id: string;
};

type TaskData = {
  id: string | number[];
  task_order: number;
  task_name: string;
  task_time_required: number;
  task_description: string;
  createdAt: Date;
  updatedAt: Date;
  user_id: string;
  tag_id: string;
  proj_id: string;
};

type TaskDurationData = {
  id: number;
  task_dur_start_date: Date;
  task_dur_end_date: Date;
  createdAt: Date;
  updatedAt: Date;
  user_id: string;
  task_id: string;
};

type TaskDuration = {
  id: number;
  task_dur_start_date: Date;
  task_dur_end_date: Date;
  user_id: string;
  task_id: string;
};

const TaskListScreen = () => {
  const navigation = useNavigation<Props['navigation']>();
  const route = useRoute<Props['route']>();
  const projectId = route.params.projectId;
  const isFocused = useIsFocused();

  const [tasks, setTasks] = useState<Task[]>([]);
  const [taskDurations, setTaskDurations] = useState<TaskDurationData[]>([]);

  useEffect(() => {
    if (isFocused) {
      axios
        .get(
          `https://api.calendar-isaac-isaac-isaac.shop/task/list/${projectId}`,
        )
        .then(res => {
          console.log(res.data.tasks);
          console.log(res.data.task_durations);
          setTasks(
            res.data.tasks.map((task: TaskData, index: number) => {
              return {
                id: task.id,
                task_order: task.task_order,
                task_name: task.task_name,
                task_time_required: task.task_time_required,
                task_description: task.task_description,
                user_id: task.user_id,
                tag_id: task.tag_id,
                proj_id: task.proj_id,
              };
            }),
          );
          setTaskDurations(res.data.task_durations);
        })
        .catch(error => {
          Alert.alert(error);
        });
    }
  }, [isFocused]);

  console.log(tasks);

  const onChangeTaskName = (
    index: number,
    evt: NativeSyntheticEvent<TextInputChangeEventData>,
  ) => {
    const cp = [...tasks];
    cp[index].task_name = evt.nativeEvent.text;
    setTasks(cp);
  };

  const onChangeTaskDescription = (
    index: number,
    evt: NativeSyntheticEvent<TextInputChangeEventData>,
  ) => {
    const cp = [...tasks];
    cp[index].task_name = evt.nativeEvent.text;
    setTasks(cp);
  };

  const onChangeTaskDuration = (
    index: number,
    evt: NativeSyntheticEvent<TextInputChangeEventData>,
  ) => {
    const cp = [...tasks];
    if (!isNaN(Number(evt.nativeEvent.text))) {
      cp[index].task_time_required = Number(evt.nativeEvent.text);
    }
    setTasks(cp);
  };

  const goUp = (index: number) => {
    const cp = [...tasks];
    const tmp = cp[index];
    cp[index] = cp[index - 1];
    cp[index].task_order = tmp.task_order;
    cp[index - 1] = tmp;
    cp[index - 1].task_order = tmp.task_order - 1;
    setTasks(cp);
  };

  const goDown = (index: number) => {
    const cp = [...tasks];
    const tmp = cp[index];
    cp[index] = cp[index + 1];
    cp[index].task_order = tmp.task_order;
    cp[index + 1] = tmp;
    cp[index + 1].task_order = tmp.task_order + 1;
    setTasks(cp);
  };

  const deleteTask = (index: number) => {
    const cp = [...tasks];
    cp.splice(index, 1);
    let i;
    for (i = index; i < cp.length; i++) {
      cp[i].task_order = cp[i].task_order - 1;
    }
    setTasks(cp);
  };

  const onAddTask = () => {
    const cp = [...tasks];
    cp.push({
      task_order: cp.length + 1,
      task_name: '',
      task_time_required: 0,
      task_description: '',
      id: uuid.v4(),
      user_id: route.params.userId,
      tag_id: 'da54cea4-bf89-42dc-b54d-be2d10bbe525',
      proj_id: projectId,
    });
    setTasks(cp);
  };

  const updateTask = () => {
    axios
      .post('https://api.calendar-isaac-isaac-isaac.shop/project/edittasks', {
        tasks: tasks,
        projectId: projectId,
      })
      .then(response => {
        if (response.data.message) {
          Alert.alert(response.data.message);
          // navigation.popToTop();
        } else {
          Alert.alert(response.data.error);
        }
      })
      .catch(error => {
        Alert.alert(error);
      });
  };
  const [editDuration, setEditDuration] = useState<boolean>(false);
  const activateTextInput = () => {
    setEditDuration(true);
  };
  const deActivateTextInput = () => {
    setEditDuration(false);
  };

  return (
    <ScrollView style={styles.container}>
      {tasks.map((task, index) => (
        <View key={JSON.stringify(task.id)} style={styles.taskContainer}>
          <View style={styles.taskNameContainer}>
            <TextInput
              style={styles.taskNameText}
              value={task.task_name}
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
          <View style={styles.dateContainer}>
            <TouchableOpacity onPress={activateTextInput}>
              {editDuration ? (
                <TextInput
                  value={`${task.task_time_required}`}
                  onChange={evt => onChangeTaskDuration(index, evt)}
                  onBlur={deActivateTextInput}
                />
              ) : (
                <Text style={styles.timeText}>
                  {task.task_time_required} hours
                </Text>
              )}
            </TouchableOpacity>
            {taskDurations.map((taskDuration, index) => (
              <View key={taskDuration.id}>
                {task.id === taskDuration.task_id && (
                  <Text style={styles.durationText}>{`${format(
                    new Date(taskDuration.task_dur_start_date),
                    'yy.MM.dd HH:mm',
                  )}~${format(
                    new Date(taskDuration.task_dur_end_date),
                    'yy.MM.dd HH:mm',
                  )}`}</Text>
                )}
              </View>
            ))}
          </View>
          <TextInput
            style={styles.descriptionText}
            value={task.task_description}
            placeholder="Add Description"
            placeholderTextColor="#C9C9C9"
            onChange={evt => onChangeTaskDescription(index, evt)}
            multiline={true}
          />
        </View>
      ))}
      <TouchableOpacity style={styles.addTaskBtn} onPress={onAddTask}>
        <FeaIcon name="check-circle" size={20} color="#7A7A7A" />
        <Text style={styles.addTaskText}>Add Task</Text>
      </TouchableOpacity>
      <CreateButton title={'Save'} onCreate={updateTask} />
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
  timeText: {
    textAlign: 'center',
    backgroundColor: 'white',
    paddingHorizontal: 8,
    borderRadius: 20,
    fontFamily: 'Pretendard',
    fontSize: 10,
    fontWeight: '400',
    color: 'black',
    marginRight: 10,
  },
  durationText: {
    textAlign: 'center',
    backgroundColor: 'white',
    paddingHorizontal: 8,
    borderRadius: 20,
    fontFamily: 'Pretendard',
    fontSize: 10,
    fontWeight: '400',
    color: 'black',
    marginRight: 4,
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
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

export default TaskListScreen;
