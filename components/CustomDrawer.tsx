import React from 'react';
import {
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';

import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const CustomDrawer = props => {
  return (
    <View style={{flex: 1, height: 80,}}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{backgroundColor: '#009688'}}>
        <ImageBackground
          source={require('../assets/images/1.jpg')}
          style={{padding: 60, alignItems: 'center'}}>
          <Image
            source={require('../assets/images/3.png')}
            style={{height: 80, width: 80, borderRadius: 40, marginBottom: 10}}
          />
          <Text
            style={{
              color: '#fff',
              fontSize: 18,
              fontFamily: 'Roboto-Medium',
              marginBottom: 5,
            }}>
            Hello!
          </Text>
        </ImageBackground>
        <View style={{flex: 1, backgroundColor: '#009688', paddingTop: 10}}>
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>


    <View>
   
    </View>
      
    </View>
  );
};

export default CustomDrawer;