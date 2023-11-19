import {StackScreenProps} from '@react-navigation/stack';
import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {SettingsStackParamList} from '../navigators/SettingsStackNavigator';
import {useIsFocused, useNavigation, useRoute} from '@react-navigation/native';
import FontIcon from 'react-native-vector-icons/FontAwesome';
import MatIcon from 'react-native-vector-icons/MaterialIcons';
import {format} from 'date-fns';

type Props = StackScreenProps<SettingsStackParamList, 'Projects'>;

type ProjectData = {
  id: string;
  user_id: string;
  proj_name: string;
  proj_goal: string;
  proj_exp_outcome: string;
  proj_start_date: Date;
  proj_end_date: Date;
  proj_detail: string;
  createdAt: Date;
  updatedAt: Date;
};

const ProjectListScreen = () => {
  const navigation = useNavigation<Props['navigation']>();
  const route = useRoute<Props['route']>();
  const userId = route.params.userId;
  const [projects, setProjects] = useState<ProjectData[]>([]);
  const [reRender, setReRender] = useState<boolean>(true);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      axios
        .get(
          `https://api.calendar-isaac-isaac-isaac.shop/project/list/${userId}`,
        )
        .then(res => {
          // console.log(res.data.projects);
          setProjects(res.data.projects);
          // console.log(projects);
        })
        .catch(error => {
          Alert.alert(error);
        });
    }
  }, [isFocused, reRender]);

  const onPressProject = (projectId: string) => {
    navigation.navigate('Tasks', {userId: userId, projectId: projectId});
  };

  const deleteProject = (projectId: string) => {
    axios
      .get(
        `https://api.calendar-isaac-isaac-isaac.shop/project/delete/${projectId}`,
      )
      .then(res => {
        Alert.alert(res.data.message);
        setReRender(!reRender);
      })
      .catch(error => {
        Alert.alert(error);
      });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {projects.map((project, index) => {
        // const [showDetails, setShowDetails] = useState<boolean>(false);
        // const onShowDetails = () => {
        //   setShowDetails(true);
        // };
        // const onHideDetails = () => {
        //   setShowDetails(false);
        // };

        return (
          <TouchableOpacity
            style={styles.projectContainer}
            key={project.id}
            onPress={() => onPressProject(project.id)}>
            <View style={styles.projectNameContainer}>
              <Text style={styles.projectNameText}>{project.proj_name}</Text>
              <TouchableOpacity onPress={() => deleteProject(project.id)}>
                <FontIcon name="trash-o" size={20} color="#7A7A7A" />
              </TouchableOpacity>
            </View>
            <View style={styles.durationContainer}>
              <Text style={styles.durationText}>{`${format(
                new Date(project.proj_start_date),
                'yy.MM.dd',
              )}~${format(new Date(project.proj_end_date), 'yy.MM.dd')}`}</Text>
              {/* {showDetails ? (
                <TouchableOpacity onPress={() => onHideDetails}>
                  <MatIcon name="keyboard-arrow-up" size={20} color="#7A7A7A" />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity onPress={() => onShowDetails}>
                  <MatIcon
                    name="keyboard-arrow-down"
                    size={20}
                    color="#7A7A7A"
                  />
                </TouchableOpacity>
              )} */}
            </View>
            <View style={styles.detailsContainer}>
              <View>
                <Text style={styles.detailsTitle}>Project Goal</Text>
                <Text style={styles.detailsDescription}>
                  {project.proj_goal}
                </Text>
              </View>
              <View>
                <Text style={styles.detailsTitle}>Expected Outcome</Text>
                <Text style={styles.detailsDescription}>
                  {project.proj_exp_outcome}
                </Text>
              </View>
              <View>
                <Text style={styles.detailsTitle}>Project Details</Text>
                <Text style={styles.detailsDescription}>
                  {project.proj_detail}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 8,
    gap: 8,
    alignItems: 'center',
  },
  projectContainer: {
    width: 340,
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 12,
    backgroundColor: '#F5F7FE',
    flexWrap: 'wrap',
    marginBottom: 8,
    gap: 8,
    alignItems: 'flex-start',
  },
  projectNameContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  projectNameText: {
    fontFamily: 'Pretendard',
    fontSize: 16,
    fontWeight: '500',
    color: 'black',
  },
  editText: {
    fontFamily: 'Pretendard',
    fontSize: 12,
    fontWeight: '600',
    color: '#7A7A7A',
  },
  durationContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
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
  },
  detailsContainer: {
    gap: 4,
  },
  detailsTitle: {
    fontFamily: 'Pretendard',
    fontSize: 12,
    fontWeight: '400',
    color: 'black',
  },
  detailsDescription: {
    fontFamily: 'Pretendard',
    fontSize: 12,
    fontWeight: '400',
    color: '#7A7A7A',
  },
});

export default ProjectListScreen;
