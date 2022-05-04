import React, { useState } from 'react';
import { StyleSheet, View, Dimensions, Image } from 'react-native';
import { TextInput } from 'react-native-paper';
import { Button } from 'react-native-elements';
import Colors from '../../constants/Colors';
import { useNavigation } from '@react-navigation/native';
import { getData, storeData } from '../../components/DB/Database';

export default function AddNoteScreen() {
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false)
  const navigation = useNavigation();

  const submitNote = async () => {
    setLoading(true)
    setTimeout(async () => {
      const data = {
        title: title,
        description: description,
        time: Date.now(),
      }

      const noteList = await getData('noteList');
      if (noteList) {
        const json = JSON.parse(noteList);
        const mergeNoteList = [data, ...json];
        storeData('noteList', JSON.stringify(mergeNoteList));
      } else {
        storeData('noteList', JSON.stringify([data]));
      }
      setTitle('');
      setDescription('');
      navigation.navigate("Home", {
        screen: "HomePage"
      })
      setLoading(false)
    }, 1000)
  }

  return (
    <View style={styles.container}>


      <TextInput
        label='Title'
        autoComplete={false}
        mode={'outlined'}
        style={styles.title}
        underlineColor={'black'}
        activeUnderlineColor={'black'}
        value={title}
        onChangeText={setTitle}
        theme={{
          colors: {
            text: 'black',
          }
        }}
      />
      <TextInput
        label='Description'
        autoComplete={false}
        mode={'outlined'}
        style={styles.desc}
        outlineColor={'black'}
        activeOutlineColor={'black'}
        multiline={true}
        value={description}
        onChangeText={setDescription}
        theme={{
          colors: {
            text: 'black',
          }
        }}
      />

      {title !== '' && description !== '' ?
        <Button
          title="Add"
          loading={loading}
          iconContainerStyle={{ marginRight: 0 }}
          titleStyle={{ fontWeight: '700' }}
          buttonStyle={{
            backgroundColor: '#004b44',
            borderColor: 'transparent',
            borderWidth: 0,
            borderRadius: 5,
            
          }}
          containerStyle={{
            width: 130,
            marginHorizontal: 20,
            marginVertical: 10,
            
            
          }}
          onPress={() => {
            submitNote();
          }}
        />
        : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').height,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#65c3ba',
    paddingTop: 30,
  },
  title: {
    fontSize: 20,
    height: 70,
    width: Dimensions.get('screen').width - 30,
    marginVertical: 3,
    backgroundColor: '#009688',
    paddingTop: 0,
  },
  desc: {
    fontSize: 17,
    height: 350,
    width: Dimensions.get('screen').width - 30,
    marginVertical: 10,
    paddingVertical: 10,
    backgroundColor: '#009688'
  },
});
