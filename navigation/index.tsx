/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { FontAwesome } from '@expo/vector-icons';
import { createDrawerNavigator, DrawerContent } from '@react-navigation/drawer';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import * as React from 'react';
import { ColorSchemeName, Pressable } from 'react-native';

import { RootStackParamList, RootTabParamList, RootTabScreenProps } from '../types';
import LinkingConfiguration from './LinkingConfiguration';
import HomeNavigator from './HomeNavigator';
import AboutNavigator from './AboutNavigator';
import { color } from 'react-native-reanimated';
import CustomDrawer from '../components/CustomDrawer';

export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
 const Drawer = createDrawerNavigator<RootStackParamList>();

 function RootNavigator() {
   return (
     <Drawer.Navigator
     drawerContent={(props) => <CustomDrawer{...props}/>}
     initialRouteName='Home'
     screenOptions={{
       headerShown: false,
       drawerStyle: {
        backgroundColor: '#009688',
        flex: 1,
        paddingTop: 40,
        paddingBottom: 30,
      },
      drawerActiveBackgroundColor: 'black',
      drawerActiveTintColor: 'white',
      drawerInactiveBackgroundColor: '#009688',
      drawerInactiveTintColor: 'white'
     }}

     >
       <Drawer.Screen name="Home" component={HomeNavigator}
       options={{
        drawerIcon: ({ color }) =>  <DrawerIcon name="home" color={color} />
      }}  />
      <Drawer.Screen name="About" component={AboutNavigator}
        options={{
          drawerIcon: ({ color }) =>  <DrawerIcon name="info-circle" color={color} />
        }} 
      />
      
     </Drawer.Navigator>
     
   );
 }

 function DrawerIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={40} style={{ marginLeft: 10, marginRight: -20 }} {...props} />;
}