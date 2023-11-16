import {useRoute} from '@react-navigation/native';
import {StackScreenProps} from '@react-navigation/stack';
import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {Alert, View} from 'react-native';
import {SettingsStackParamList} from '../navigators/SettingsStackNavigator';

type Tag = {
  id: string | number[];
  name: string;
  color: string;
};

type Props = StackScreenProps<SettingsStackParamList, 'Routines'>;

const TagListScreen = () => {
  const route = useRoute<Props['route']>();
  const userId = route.params.userId;
  const [tagList, setTagList] = useState<Tag[]>([]);

  useEffect(() => {
    axios
      .get(`http://192.168.35.93:3000/tag/list/${userId}`)
      .then(res => {
        const tags = res.data.tags;
        console.log(tags);
      })
      .catch(error => {
        Alert.alert(error);
      });
  }, []);

  return <View></View>;
};

export default TagListScreen;
