import { AntDesign, Ionicons } from '@expo/vector-icons';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
import { StyleSheet, TouchableOpacity, View, Text, ScrollView, Dimensions, Image } from 'react-native';
import Colors from '../../constants/Colors';
import { Notes } from '../../models/Notes';
import { getData } from '../../components/DB/Database';




export default function HomePageScreen() {
  const [note, setNote] = useState<Array<Notes> | null>(null);
  const [search, setSearch] = useState<string>('')
  const [searchRes, setSearchRes] = useState<boolean>(false)

  const navigation = useNavigation();

  const retrieveData = async () => {
    const noteList = await getData('noteList');
    if (noteList) {
      const json = JSON.parse(noteList);
      setNote(json);
    }
  }

  useFocusEffect(
    useCallback(() => {
      retrieveData();
    }, [])
  )

  return (
    <View style={styles.container}>

<View
        style={{
          height: 130,
          width: '100%',
          alignItems: 'center',
        }}
      >
        <Image
          style={{
            height: 10,
            width: '150%',
            paddingBottom: '100%',
            borderRadius: 200,
          }}
          source={{
            uri: 'https://i.pinimg.com/originals/68/d0/c8/68d0c801dbb87b66291ee058f54b5659.png'
          }} />

      </View>
      {note?.length ?
        <View
          style={styles.searchbarContainer}
        >
        
          {search ? (
            <AntDesign
              name='close'
              size={20}
              color={Colors.txt}
              onPress={handleClear}
              style={styles.clearIcon}
            />
          ) : null}
        </View>
        : null}
      {searchRes ?
        <View
          style={[StyleSheet.absoluteFillObject, styles.emptyHeaderContainer]}
        >
          <Text
            style={styles.emptyHeader}
          >
            Note not found!!
          </Text>
        </View>
        :
        <ScrollView style={styles.listcontainer}>
          <View>
            {note && note.map((notes: Notes, index: number) => (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("NoteView", {
                    note: notes, index: index
                  });
                  setSearch('')
                }}
              >
                <View style={styles.notecontainer}

                >
                  <Text
                    style={styles.title}
                    numberOfLines={1}
                  >
                    {notes.title}
                  </Text>
                  <Text
                    style={styles.desc}
                    numberOfLines={2}
                  >
                    {notes.description}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
          <View style={{ height: 30 }} />
        </ScrollView>
      }


      <View style={styles.btncontainer}>
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
            marginRight: 16

          }}
          onPress={() => {
            navigation.navigate("Home", {
              screen: "AddNote"
            });
          }}
        >
          <Ionicons
            name='cloud-download-outline'
            size={40}
            color='black'
          />
        </TouchableOpacity>
      </View>
      {!note?.length ?
        <View
          style={[StyleSheet.absoluteFillObject, styles.emptyHeaderContainer]}
        >
          <Text
            style={styles.emptyHeader}
          >
            Add Note
          </Text>
        </View>
        : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#65c3ba',
    paddingTop: 20,
    paddingBottom: 100,
  },
  btncontainer: {
    position: 'absolute',
    right: 155,
    bottom: 15,
  },
  notecontainer: {
    height: 80,
    width: '100%',
    borderRadius: 1,
    backgroundColor: '#009688',
    paddingHorizontal: 10,
    marginVertical: 5,
    justifyContent: 'center'
  },
  listcontainer: {
    width: Dimensions.get('screen').width - 20,
    padding: 10,
    marginBottom: 20,
  },
  title: {
    color: Colors.txt,
    fontSize: 20,
    fontWeight: 'bold',

  },
  desc: {
    color: Colors.txt,
    fontSize: 15,
    opacity: 0.5
  },
  emptyHeaderContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: -1,
  },
  emptyHeader: {
    fontSize: 30,
    textTransform: 'uppercase',
    fontWeight: 'bold',
    opacity: 0.5,
  },
  searchbarContainer: {
    justifyContent: 'center',
  },
  searchbar: {
    borderWidth: 1,
    borderColor: Colors.txt,
    height: 55,
    borderRadius: 5,
    paddingLeft: 20,
    fontSize: 20,
    width: Dimensions.get('screen').width - 50,
    marginVertical: 10,
    color: Colors.txt,
  },
  clearIcon: {
    position: 'absolute',
    right: 15,
  },
  lottie: {
    width: Dimensions.get('screen').width * .7,
    height: Dimensions.get('screen').height * .25,
  },
});
