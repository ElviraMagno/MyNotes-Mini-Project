import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import { TextInput } from 'react-native-paper';
import { Button } from 'react-native-elements';
import Colors from '../../constants/Colors';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { HomeParamList } from '../../types';
import { getData, storeData } from '../../components/DB/Database';
import useColorScheme from '../../hooks/useColorScheme';

type IRoute = {
    "params": HomeParamList['EditNote'];
}

export default function EditNotesScreen() {
    const route = useRoute<RouteProp<IRoute, "params">>();
    const note = route.params.note;
    const index = route.params.index;

    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const navigation = useNavigation();

    const [loading, setLoading] = useState<boolean>(false)

    const submitNote = async () => {
        setLoading(true)
        setTimeout(async () => {
            const data = {
                title: title,
                description: description,
            }
            const noteList = await getData('noteList');
            if (noteList) {
                const json = JSON.parse(noteList);
                json[index] = data;
                storeData('noteList', JSON.stringify(json));
            } else {
                storeData('noteList', JSON.stringify([data]));
            }
            setTitle('');
            setDescription('');

            navigation.navigate("Home", {
                screen: "HomePage"
            }
            )
            setLoading(false)

        }, 1200)
    }
    useEffect(() => {
        setTitle(note.title);
        setDescription(note.description)
    }, []);
    
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
                    title="Change"
                    loading={loading}
                    iconContainerStyle={{ marginRight: 0 }}
                    titleStyle={{ fontWeight: '700' }}
                    buttonStyle={{
                        backgroundColor: '#004b44',
                        borderColor: 'transparent',
                        borderWidth: 0,
                        borderRadius: 3,
                    }}
                    containerStyle={{
                        width: Dimensions.get('screen').width * .4,
                        marginHorizontal: 30,
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

const width = Dimensions.get('screen').width - 70;
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
        height: 60,
        width,
        marginVertical: 5,
        backgroundColor: '#009688',
        width: 355,
    },
    desc: {
        fontSize: 17,
        height: 350,
        width,
        marginVertical: 5,
        paddingVertical: 10,
        backgroundColor: '#009688',
        width: 355,
    },
});
