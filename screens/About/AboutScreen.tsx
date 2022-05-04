import React from 'react';
import { Dimensions, StyleSheet, View, ScrollView, Image,Text } from 'react-native';
import Colors from '../../constants/Colors';

export default function AboutScreen() {
  return (
    
    <View style={styles.container}>
      
      <ScrollView
       style={styles.scrollview}
       contentContainerStyle={{
         alignItems: 'center',
         margin: 15,
       }}
      >
        <Text style={styles.appname}>
          MyNotes
        </Text>
        <Text style={styles.app}>
         My Notes is an app for storing all the notes you keep on your Android/ios.
         Thanks to its simple interface, you can easily focus on whatever pending tasks you've made 
         note of by jotting them down on this virtual pad.
        </Text>


        <Text style={styles.dev}>
          Developers
        </Text>

        <View
        style={{
          height: 200,
          width: '100%',
          alignItems: 'center',
        }}
      >
        <Image
          style={{
            height: '150%',
            width: '135%',
            paddingTop: 5,
            paddingBottom: '5%',
            borderRadius: 0,
          }}
          source={{
            uri: 'https://i.pinimg.com/originals/bf/81/63/bf81634c5d6c79743fe243b7a85eb7c7.png'
          }} />

      </View>
        <View style={{height: 80}} />
      </ScrollView>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#65c3ba',
    paddingTop: 0,
  },
  scrollview: {
    width: "100%",
    backgroundColor: "#65c3ba",
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    padding: 5,
  },
  appname: {
    color: Colors.txt,
    fontWeight: 'bold',
    fontSize: 30
  },
  app: {
    color: Colors.txt,
    fontWeight: '100',
    fontSize: 19,
    opacity: 0.9,
    alignSelf: 'center',
    paddingTop: 10,
    borderTopWidth: 0,
  },
  dev: {
    color: Colors.txt,
    fontWeight: 'bold',
    fontSize: 30,
    paddingTop: 100,
  },
});
