import {useRoute} from '@react-navigation/native';
import {StackScreenProps} from '@react-navigation/stack';
import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {Alert, ScrollView, StyleSheet, Text, View} from 'react-native';
import {SettingsStackParamList} from '../navigators/SettingsStackNavigator';
import FontIcon from 'react-native-vector-icons/FontAwesome';

type Tag = {
  id: string;
  tag_name: string;
  tag_color: string;
  user_id: string | number[];
  createdAt: Date;
  updatedAt: Date;
};

type Props = StackScreenProps<SettingsStackParamList, 'Tags'>;

const TagListScreen = () => {
  const route = useRoute<Props['route']>();
  const userId = route.params.userId;
  const [tagList, setTagList] = useState<Tag[]>([]);

  useEffect(() => {
    axios
      .get(`https://api.calendar-isaac-isaac-isaac.shop/tag/list/${userId}`)
      .then(res => {
        const tags = res.data.tags;
        setTagList(tags);
      })
      .catch(error => {
        Alert.alert(error);
      });
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {tagList.map((tag, index) => (
        <View key={tag.id} style={styles.tagContainer}>
          <FontIcon name="circle" size={20} color={tag.tag_color} />
          <Text style={styles.nameText}>{tag.tag_name}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    gap: 8,
    paddingVertical: 10,
    alignItems: 'center',
  },
  tagContainer: {
    flexDirection: 'row',
    width: 340,
    paddingVertical: 8,
    paddingHorizontal: 10,
    backgroundColor: '#F5F7FE',
    borderRadius: 12,
    marginBottom: 8,
    gap: 8,
  },
  nameText: {
    fontFamily: 'Pretendard',
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '500',
    color: 'black',
  },
});

export default TagListScreen;
