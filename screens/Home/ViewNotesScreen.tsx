import { Ionicons } from '@expo/vector-icons';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import React, { } from 'react';
import { StyleSheet, TouchableOpacity, View, Text, ScrollView, Alert } from 'react-native';
import { getData, storeData } from '../../components/DB/Database';

import Colors from '../../constants/Colors';
import { HomeParamList } from '../../types';


type IRoute = {
  "params": HomeParamList['NoteView'];
}

export default function NoteViewScreen() {
  const route = useRoute<RouteProp<IRoute, "params">>();
  const { title, description, time } = route.params.note
  const index = route.params.index;


  const removeItem = async () => {
    const data = {
      title: title,
      description: description,
      time: Date.now(),
    }
    const noteList = await getData('noteList')
    if (noteList) {
      const json = JSON.parse(noteList);
      json.splice(index, 1)
      storeData('noteList', JSON.stringify(json));
    } else {
      storeData('noteList', JSON.stringify([data]));
    }

    navigation.navigate("Home", {
      screen: "HomePage"
    })
  }

  const popUpAlert = () => {
    Alert.alert('Delete?', 'Do you want to delete this note?',
      [
        {
          text: 'Cancel',
          onPress: () => { }
        },
        {
          text: 'Delete',
          onPress: removeItem
        },
      ],
      {
        cancelable: true,
      }
    )
  }

  const navigation = useNavigation();


  return (
    <View style={styles.container}>
        <Text
          style={styles.title}
        >
          {title}
        </Text>
        <ScrollView style={styles.desccontainer}>
          <Text
            style={styles.desc}
          >
            {description}
          </Text>
        </ScrollView>

        <View style={styles.btncontainer}>
          <TouchableOpacity
            style={{
              width: 60,
              height: 60,
              borderRadius: 45,
              backgroundColor: '#83d0c9',
              marginRight: 10,
              justifyContent: 'center',
              alignItems: 'center',
              borderWidth: 1,
              borderColor: Colors.txt,

            }}
            onPress={popUpAlert}
          >
            <Ionicons
              name='trash-bin'
              size={40}
              color='#a31919'
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              width: 60,
              height: 60,
              borderRadius: 45,
              backgroundColor: '#83d0c9',
              justifyContent: 'center',
              alignItems: 'center',
              borderWidth: 1,
              borderColor: Colors.txt,

            }}
            onPress={() => {
              navigation.navigate("Home", {
                screen: "EditNote",
                params: { note: route.params.note, index: index }
              })
            }}
          >
            <Ionicons
              name='create-outline'
              size={40}
              color='black'
            />
          </TouchableOpacity>
        </View>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#65c3ba',
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  btncontainer: {
    position: 'absolute',
    right: 125,
    bottom: 15,
    flexDirection: 'row'
  },
  title: {
    fontSize: 35,
    color: Colors.txt,
    fontWeight: 'bold',
    marginVertical: 10,
    borderBottomWidth: 0,
    paddingHorizontal: 5,
  },
  desc: {
    fontSize: 20,
    opacity: 0.6,
    color: Colors.txt,
 },
  desccontainer: {
    marginBottom: 75,
  }
});
