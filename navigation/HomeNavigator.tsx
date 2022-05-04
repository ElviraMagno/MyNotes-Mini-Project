import * as React from 'react';

import { Ionicons } from '@expo/vector-icons';
import { createStackNavigator } from '@react-navigation/stack';
import { TouchableOpacity } from 'react-native';
import { HomeParamList } from '../types';
import Colors from '../constants/Colors';
import { useCallback, useState } from 'react';

import { HomeScreen } from '../screens/Home';
import ViewNotesScreen from '../screens/Home/ViewNotesScreen';
import AddNotesScreen from '../screens/Notes/AddNotesScreen';
import EditNotesScreen from '../screens/Notes/EditNoteScreen';

const Stack = createStackNavigator<HomeParamList>();
export default function HomeNavigator() {


    return (
        <Stack.Navigator
            initialRouteName='HomePage'
            screenOptions={({ navigation }) => ({
                title: 'Notes',
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
                ),
            })}
        >
            <Stack.Screen name="HomePage" component={HomeScreen} />
            <Stack.Screen
                options={({ navigation }) => ({
                    title: 'View Note',
                    headerRight: () => (
                        <TouchableOpacity
                            style={{
                                marginRight: 5
                            }}
                            onPress={() => {
                                navigation.navigate("Home", {
                                    screen: "HomePage"
                                });
                            }}
                        >
                        </TouchableOpacity>
                    ),
                })}
                name="NoteView" component={ViewNotesScreen}
            />
            <Stack.Screen
                options={({ navigation }) => ({
                    title: 'Add Note',
                    headerRight: () => (
                        <TouchableOpacity
                            style={{
                                marginRight: 5
                            }}
                            onPress={() => {
                                navigation.navigate("Home", {
                                    screen: "HomePage"
                                });
                            }}
                        >
                        </TouchableOpacity>
                    ),
                })}
                name="AddNote" component={AddNotesScreen}
            />
            <Stack.Screen
                options={({ navigation }) => ({
                    title: 'Edit Note',
                    headerRight: () => (
                        <TouchableOpacity
                            style={{
                                marginRight: 5
                            }}
                            onPress={() => {
                                navigation.navigate("Home", {
                                    screen: "HomePage"
                                });
                            }}
                        >
                        </TouchableOpacity>
                    ),
                })}
                name="EditNote" component={EditNotesScreen}
            />
        </Stack.Navigator>
    );
}