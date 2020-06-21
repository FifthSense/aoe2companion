import {Image, Picker, Platform, SafeAreaView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, { useState } from 'react';
import Constants from 'expo-constants';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { useLinkTo, useNavigation } from '@react-navigation/native';
import { Menu } from 'react-native-paper';
import { RootStackParamList, RootStackProp } from '../../../App';
import {useCavy} from "cavy";

export default function Header() {
    const generateTestHook = useCavy();

    const [menu, setMenu] = useState(false);

    const navigation = useNavigation<RootStackProp>();

    const nav = async (route: keyof RootStackParamList) => {
        navigation.reset({
            index: 0,
            routes: [{name: route}]
        });
    };

    return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Image style={styles.icon} source={require('../../../assets/icon.png')}/>
                    <Text>AoE II Companion22</Text>
                </View>
                <View style={styles.menu}>
                    <TouchableOpacity style={styles.menuButton} onPress={() => nav('Leaderboard')} ref={generateTestHook('Header.Leaderboard')}>
                        <FontAwesomeIcon name="trophy" size={18} />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.menuButton} onPress={() => nav('Search')} ref={generateTestHook('Header.Search')}>
                        <FontAwesomeIcon name="search" size={18} />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.menuButton} onPress={() => nav('Main')} ref={generateTestHook('Header.User')}>
                        <FontAwesomeIcon name="user" size={18} />
                    </TouchableOpacity>

                    <Menu
                            visible={menu}
                            onDismiss={() => setMenu(false)}
                            anchor={
                                <TouchableOpacity style={styles.menuButtonDots} onPress={() => setMenu(true)}>
                                    <FontAwesomeIcon name="ellipsis-v" size={18} />
                                </TouchableOpacity>
                            }
                    >
                        <Menu.Item onPress={() => { nav('About'); setMenu(false); }} title="About" />
                    </Menu>
                </View>
            </View>
    );
}

const styles = StyleSheet.create({
    menu: {
        // backgroundColor: 'red',
        flexDirection: 'row',
        alignItems: 'center',
    },
    menuButton: {
        // backgroundColor: 'blue',
        marginLeft: 10,
        paddingLeft: 4,
        paddingRight: 4,
    },
    menuButtonDots: {
        // backgroundColor: 'blue',
        marginLeft: 6,
        paddingLeft: 8,
        paddingRight: 8,
    },
    header: {
        // backgroundColor: 'blue',
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    icon: {
        marginRight: 5,
        width: 30,
        height: 30,
    },
    container: {
        // backgroundColor: 'blue',
        flexDirection: 'row',
        marginTop: Constants.statusBarHeight,
        height: 36,
        paddingTop: Platform.OS === 'ios' ? 0 : 6,
        paddingBottom: Platform.OS === 'ios' ? 4 : 0,
        paddingLeft: 16,
        paddingRight: 12, // because of three dots icon
    },
});
