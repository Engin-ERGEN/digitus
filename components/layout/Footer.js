import React, { useState } from 'react'
import { Box, HStack, Pressable, Text, Icon, Center, HamburgerIcon } from 'native-base'
import { AntDesign, Entypo } from '@expo/vector-icons';
import { Feather, Ionicons } from '@expo/vector-icons';
import { StyleSheet } from 'react-native';

const Styles = StyleSheet.create({
    main: {
        elevation: 8
    },
    footerButton: {
        paddingVertical: 10
    },
    notificationCount: {
        position: "absolute",
        color: "#FFF",
        width: 20,
        height: 20,
        fontSize: 12,
        fontWeight: "bold",
        right: 18,
        zIndex: 1,
        top: -4,
        borderRadius: 10,
        textAlign: "center",
        backgroundColor: "#FF8900"
    }
});


import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../../pages/Home';

const Tab = createBottomTabNavigator();

const Footer = ({ navigation }) => {
    const [selected, setSelected] = useState(0);
    
    return (
        <Box style={Styles.main}>
            <HStack bg="#FFF" alignItems="center" safeAreaBottom shadow={6}>
                <Pressable style={Styles.footerButton} bg={selected === 0 ? "#048345" : "#FFF"} flex={1} onPress={() => {
                    setSelected(0)
                    navigation.navigate("Home")
                }}>
                    <Center>
                        <Icon as={<AntDesign name="home" size={24} />} color={selected === 0 ? "white" : "#348AA7"} size="xl" />
                    </Center>
                </Pressable>
                <Pressable style={Styles.footerButton} bg={selected === 1 ? "#048345" : "#FFF"} flex={1} onPress={() => {
                    setSelected(1)
                    navigation.navigate("Home")
                }}>
                    <Center>
                        <Icon as={<Feather name="book-open" size={24} />} color={selected === 1 ? "white" : "#348AA7"} size="xl" />
                    </Center>
                </Pressable>
                <Pressable style={Styles.footerButton} bg={selected === 2 ? "#048345" : "#FFF"} flex={1} onPress={() => {
                    setSelected(2)
                    navigation.navigate("Home")
                }}>
                    <Center>
                        <Icon as={<Feather name="users" size={24} />} color={selected === 2 ? "white" : "#348AA7"} size="xl" />
                    </Center>
                </Pressable>
                <Pressable style={Styles.footerButton} bg={selected === 3 ? "#048345" : "#FFF"} flex={1} onPress={() => {
                    setSelected(3)
                    navigation.navigate("Home")
                }}>
                    <Center style={{ position: "relative" }}>
                        <Text style={Styles.notificationCount}>3</Text>
                        <Icon as={<Ionicons name="notifications-outline" size={24} />} color={selected === 3 ? "white" : "#348AA7"} size="xl" />
                    </Center>
                </Pressable>
                <Pressable style={Styles.footerButton} bg={selected === 4 ? "#048345" : "#FFF"} flex={1} onPress={() => {
                    setSelected(4)
                    navigation.navigate("Home")
                }}>
                    <Center>
                        <Icon as={<Entypo name="menu" size={24} />} color={selected === 4 ? "white" : "#348AA7"} size="xl" />
                    </Center>
                </Pressable>
            </HStack>
        </Box>
    )
}

export default Footer