import {StackScreenProps} from '@react-navigation/stack';
import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  NativeSyntheticEvent,
  TextInputChangeEventData,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {AddScheduleStackParamList} from '../navigators/AddScheduleStackNavigator';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {
  CompositeScreenProps,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {BottomTabParamList} from '../navigators/BottomTabNavigator';
import uuid from 'react-native-uuid';
import AntIcon from 'react-native-vector-icons/AntDesign';
import {format} from 'date-fns';
import ProjectDatePicker from '../components/ProjectDatePicker';
import CreateButton from '../components/CreateButton';
import axios from 'axios';

type Props = CompositeScreenProps<
  StackScreenProps<AddScheduleStackParamList, 'AddProject'>,
  BottomTabScreenProps<BottomTabParamList, 'AddSchedule'>
>;

export type ProjectProp = {
  id: string | number[];
  user_id: string;
  name: string;
  goal: string;
  expectedOutcome: string;
  start: string;
  end: string;
  details: string;
  tag: string | number[];
};

const AddProjectScreen = () => {
  const navigation = useNavigation<Props['navigation']>();
  const route = useRoute<Props['route']>();
  const userId = route.params.userId;

  const task = [
    {
      order: 1,
      name: '데이터 모델링',
      duration: 15,
      description:
        '데이터 모델러가 앱의 기능에 필요한 데이터 구조를 설계합니다. 이 과정에서 필요한 데이터의 종류, 데이 터 간의 관계 등을 정의합니다.',
    },
    {
      order: 2,
      name: 'UI 디자인',
      duration: 20,
      description:
        '디자이너가 사용자 인터페이스를 디자인합니다. 앱의 사용성을 높이기 위해 사용자 경험을 중심으로 디자인을 진행하며, 로그인 화면, 일정 생성 화면, 캘린더 화면 등을 디자인합니다.',
    },
    {
      order: 3,
      name: '프론트엔드 개발',
      duration: 60,
      description:
        '개발자가 UI 디자인을 바탕으로 프론트엔드를 개발합니다. 사용자가 직접적으로 상호작용하는 앱의 모든 화면을 구현합니다.',
    },
    {
      order: 4,
      name: '백엔드 개발',
      duration: 60,
      description:
        '개발자가 데이터 모델링을 바탕으로 백엔드를 개발합니다. 사용자의 요청을 처리하고, 데이터를 저장하고, 필요한 정보를 제공하는 등의 역할을 합니다.',
    },
    {
      order: 5,
      name: 'DB 구축',
      duration: 20,
      description:
        '데이터 모델러가 백엔드 개발을 위해 필요한 데이터베이스를 구축합니다. 데이터 모델링에서 정의한 구조를 바탕으로 데이터베이스를 설계하고, 필요한 데이터를 입력합니다.',
    },
    {
      order: 6,
      name: '테스트 및 디버깅',
      duration: 25,
      description:
        '개발자가 앱의 기능을 테스트하고, 문제가 발생하는 경우 디버깅을 통해 문제를 해결합니다. 이 과정을 통 해 앱의 안정성을 확보합니다.',
    },
  ];

  const today = new Date();

  const [project, setProject] = useState<ProjectProp>({
    id: uuid.v4(),
    user_id: userId,
    name: '',
    goal: '',
    expectedOutcome: '',
    start: JSON.stringify(today),
    end: JSON.stringify(today),
    details: '',
    tag: 'da54cea4-bf89-42dc-b54d-be2d10bbe525',
  });
  const [start, setStart] = useState<Date>(today);
  const [end, setEnd] = useState<Date>(today);
  const [openStartDatePicker, setOpenStartDatePicker] =
    useState<boolean>(false);
  const [openEndDatePicker, setOpenEndDatePicker] = useState<boolean>(false);

  const onChangeProjectName = (
    evt: NativeSyntheticEvent<TextInputChangeEventData>,
  ) => {
    const cp = {...project};
    cp.name = evt.nativeEvent.text;
    setProject(cp);
  };
  const onChangeProjectGoal = (
    evt: NativeSyntheticEvent<TextInputChangeEventData>,
  ) => {
    const cp = {...project};
    cp.goal = evt.nativeEvent.text;
    setProject(cp);
  };
  const onChangeProjectExpectedOutcome = (
    evt: NativeSyntheticEvent<TextInputChangeEventData>,
  ) => {
    const cp = {...project};
    cp.expectedOutcome = evt.nativeEvent.text;
    setProject(cp);
  };
  const onChangeProjectDetails = (
    evt: NativeSyntheticEvent<TextInputChangeEventData>,
  ) => {
    const cp = {...project};
    cp.details = evt.nativeEvent.text;
    setProject(cp);
  };
  const onPressStart = () => {
    setOpenStartDatePicker(true);
  };
  const onPressEnd = () => {
    setOpenEndDatePicker(true);
  };
  const submitProject = () => {
    const prj = {
      id: uuid.v4(),
      user_id: userId,
      name: '캘린더 앱 개발',
      goal: '창업 대회 제출 용 앱 프로토타입 개발',
      expectedOutcome:
        '로그인 기능과 일정 생성 기능, 그리고 monthly, weekly, daily calendar에 일정을 표시해주는 기능이 포함된 앱',
      start: JSON.stringify(new Date('2023-11-22')),
      end: JSON.stringify(new Date('2023-12-20')),
      details:
        '하루에 프로젝트에 사용할 수 있는 시간은 최대 5시간. 데이터 모델링과 UI 디자인 작업, 프론트엔드 및 백엔드 개발, DB 구축까지 필요함. 디자이너 1명, 데이터 모델러 1명, 개발자 3명이 작업할 예정.',
      tag: 'da54cea4-bf89-42dc-b54d-be2d10bbe525',
    };
    // if (project.name === '') {
    //   Alert.alert('프로젝트 제목을 입력해주세요');
    // } else if (project.goal === '') {
    //   Alert.alert('프로젝트 제목을 입력해주세요');
    // } else if (project.expectedOutcome === '') {
    //   Alert.alert('프로젝트 예상 결과를 입력해주세요');
    // } else if (project.details === '') {
    //   Alert.alert('프로젝트 세부 사항을 입력해주세요');
    // } else if (end < start) {
    //   Alert.alert('프로젝트 종료 시간이 시작 시간보다 빠릅니다!');
    // } else {
    const cp = {...project};
    cp.start = JSON.stringify(start);
    cp.end = JSON.stringify(end);
    setProject(cp);
    console.log(project);
    navigation.navigate('AddTask', {userId: userId, project: prj, tasks: task});
    // }
  };

  const chatGPT = async (messages, parameters = {}) => {
    const apikey = 'API_KEY';
    if (messages[0].constructor === String)
      return await chatGPT([['user', messages[0]]]);
    messages = messages.map(line => ({role: line[0], content: line[1].trim()}));
    console.log(1);
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apikey}`,
      },
      body: JSON.stringify({model: 'gpt-4', messages, ...parameters}),
    });
    const data = await response.json();
    if (data?.error?.message) throw new Error(data.error.message);
    return data.choices[0].message.content.trim();
  };

  async function generateTasksWithAI() {
    var inputText = `project name: ${project.name}, project goal: ${project.goal}, expected outcome: ${project.expectedOutcome}, project starts at: 2023.11.22, project ends at: 2023.12.20, project details: 하루에 프로젝트에 사용할 수 있는 시간은 최대 5시간. 데이터 모델링과 UI 디자인 작업, 프론트엔드 및 백엔드 개발, DB 구축까지 필요함. 디자이너 1명, 데이터 모델러 1명, 개발자 3명이 작업할 예정.`;
    inputText = `DESC::${inputText}`;
    let response;
    try {
      response = await chatGPT(
        [
          [
            'system',
            `The assistant's job is to generate and schedule specific tasks of a project. Name, goal, expected outcome, start date, end date, and details of project will be provided as an input. Response JSONArray like [{order: number, name: string, duration: number, description: string},{order: number, name: string, duration: number, description: string},...]. name and description is to be in korean, and description must include the specific process and information about the task. duration means how long the task takes, and its unit is to be hours. Return only JSON Array. Remove pre-text and post-text.`,
          ],
          // [
          //   'user',
          //   'DESC::project name: 학과 홍보 영상 제작, project goal: 학과 설명회에서 시연할 홍보 영상 제작, expected outcome: 학과 소개와 학과 행사 소개 위주의 4~5분 분량의 더빙 및 자막 작업된 영상, project starts at: 2023.11.14, project ends at: 2023.11.20, project details: 학부 행사 영상은 기존에 학과사무실에서 촬영된 영상을 활용. 더빙은 편집이 일부 완성되면 목요일~금요일 중으로 다른 인원이 진행하기로 함. 영상효과는 많이 사용하지 않고 기존 영상 활용 위주로 편집 진행.',
          // ],
          // [
          //   'assistant',
          //   '[{order: 1, name: "...", duration: 3, description: "..."}, {order: 2, name: "...", duration: 3.5, description: "..."}, {order: 3, name: "...", duration: 5, description: "..."}, ...]',
          // ],
          // [
          //   'user',
          //   'DESC::project name: 캘린더 앱 개발, project goal: 창업 대회 제출 용 앱 프로토타입 개발, expected outcome: 로그인 기능과 일정 생성 기능, 그리고 monthly, weekly, daily calendar에 일정을 표시해주는 기능이 포함된 앱, project starts at: 2023.11.22, project ends at: 2023.12.20, project details: 하루에 프로젝트에 사용할 수 있는 시간은 최대 5시간. 데이터 모델링과 UI 디자인 작업, 프론트엔드 및 백엔드 개발, DB 구축까지 필요함. 디자이너 1명, 데이터 모델러 1명, 개발자 3명이 작업할 예정.',
          // ],
          // [
          //   'assistant',
          //   '[{order: 1, name: "...", duration: 2, description: "..."}, {order: 2, name: "...", duration: 7, description: "..."}, {order: 3, name: "...", duration: 4.5, description: "..."}, ...]',
          // ],
          // ['user', 'DESC::project name: 캘린더 앱 개발, project goal: 창업 대회 제출 용 앱 프로토타입 개발, expected outcome: 로그인 기능과 일정 생성 기능, 그리고 monthly, weekly, daily calendar에 일정을 표시해주는 기능이 포함된 앱, project starts at: 2023.11.22, project ends at: 2023.12.20, project details: 하루에 프로젝트에 사용할 수 있는 시간은 최대 5시간. 데이터 모델링과 UI 디자인 작업, 프론트엔드 및 백엔드 개발, DB 구축까지 필요함. 디자이너 1명, 데이터 모델러 1명, 개발자 3명이 작업할 예정.'],
          // [
          //   'assistant',
          //   '{reasonForRecommendation:"....",colorlist:["#000000","#000000","#000000","#000000","#000000"]}',
          // ],
          ['user', inputText],
        ],
        {temperature: 0},
      );
      console.log(response);
    } catch (e) {
      console.log(e.message);
      return;
    }
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.baseTextInputBox}>
          <Text style={styles.titleText}>Project Name</Text>
          <TextInput
            style={styles.inputText}
            placeholder="Name of project"
            placeholderTextColor={'#C9C9C9'}
            multiline={true}
            value={project.name}
            onChange={onChangeProjectName}
          />
        </View>
        <View style={styles.baseTextInputBox}>
          <Text style={styles.titleText}>Project Goal</Text>
          <TextInput
            style={styles.inputText}
            placeholder="Name of project"
            placeholderTextColor={'#C9C9C9'}
            multiline={true}
            value={project.goal}
            onChange={onChangeProjectGoal}
          />
        </View>
        <View style={styles.baseTextInputBox}>
          <Text style={styles.titleText}>Expected Outcome</Text>
          <TextInput
            style={styles.inputText}
            placeholder="Outcome of project that you want"
            placeholderTextColor={'#C9C9C9'}
            multiline={true}
            value={project.expectedOutcome}
            onChange={onChangeProjectExpectedOutcome}
          />
        </View>
        <View style={styles.baseTextInputBox}>
          <Text style={styles.titleText}>Project starts at</Text>
          <TouchableOpacity style={styles.datePickerBtn} onPress={onPressStart}>
            <AntIcon name="calendar" size={16} color="#7A7A7A" />
            <Text style={styles.dateText}>{format(start, 'yyyy/MM/dd')}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.baseTextInputBox}>
          <Text style={styles.titleText}>Project ends at</Text>
          <TouchableOpacity style={styles.datePickerBtn} onPress={onPressEnd}>
            <AntIcon name="calendar" size={16} color="#7A7A7A" />
            <Text style={styles.dateText}>{format(end, 'yyyy/MM/dd')}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.baseTextInputBox}>
          <Text style={styles.titleText}>Project Details</Text>
          <TextInput
            style={styles.inputText}
            placeholder="Details that must be considered"
            placeholderTextColor={'#C9C9C9'}
            multiline={true}
            value={project.details}
            onChange={onChangeProjectDetails}
          />
        </View>
        <CreateButton title={'Next'} onCreate={submitProject} />
      </View>
      <ProjectDatePicker
        visible={openStartDatePicker}
        setVisible={setOpenStartDatePicker}
        setDate={setStart}
      />
      <ProjectDatePicker
        visible={openEndDatePicker}
        setVisible={setOpenEndDatePicker}
        setDate={setEnd}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    alignItems: 'center',
    gap: 8,
    padding: 10,
  },
  baseTextInputBox: {
    width: 340,
    paddingHorizontal: 10,
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: '#F5F7FE',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    gap: 8,
  },
  titleText: {
    fontFamily: 'Pretendard',
    fontSize: 16,
    color: 'black',
    fontWeight: '700',
  },
  inputText: {
    width: 320,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    backgroundColor: 'white',
    fontFamily: 'Pretendard',
    fontSize: 14,
    color: 'black',
    fontWeight: '400',
  },
  datePickerBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 320,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    backgroundColor: 'white',
    gap: 10,
  },
  dateText: {
    paddingVertical: 4,
    fontFamily: 'Pretendard',
    fontSize: 14,
    color: '#7A7A7A',
    fontWeight: '400',
  },
});

export default AddProjectScreen;
