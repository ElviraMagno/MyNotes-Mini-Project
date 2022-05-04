import * as React from 'react';

import { Ionicons } from '@expo/vector-icons';
import { createStackNavigator } from '@react-navigation/stack';
import { TouchableOpacity } from 'react-native';
import { AboutParamList } from '../types';
import Colors from '../constants/Colors';
import AboutScreen from '../screens/About/AboutScreen';

const Stack = createStackNavigator<AboutParamList>();

export default function AboutNavigator() {           
    return (
        <Stack.Navigator
            initialRouteName='AboutApp'
            screenOptions={({ navigation }) => ({
                title: 'About App',
                headerTitleAlign: 'center',
                headerStyle: {
                    backgroundColor: '#009688'
                },
                headerTintColor: 'white',
                headerLeft: () => (
                    <TouchableOpacity
                        style={{
                            marginLeft: 5
                        }}
                        onPress={() => {
                            navigation.toggleDrawer();
                        }}
                    >
                        <Ionicons
                            name='menu'
                            size={32}
                            color='#FAFAFF'
                        />
                    </TouchableOpacity>
                )
            })}
        >
            <Stack.Screen name="AboutApp" component={AboutScreen} />
        </Stack.Navigator>
    );
}