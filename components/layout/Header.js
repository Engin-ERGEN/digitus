import React, { useState } from 'react';
import { Box, Menu, Pressable, HStack, IconButton, Avatar, Text, Image, Flex } from 'native-base';
import { FontAwesome, Feather } from '@expo/vector-icons';
import Logo from '../Logo';
import useLogout from '../../hooks/useLogout'
import { StyleSheet } from 'react-native';
import ImageButton from '../ImageButton';

const userPng = require('../../public/images/user.png');
const searchPng = require('../../public/images/search.png');
const headerStyles = StyleSheet.create({
    main: {
        paddingVertical: 2,
        backgroundColor: "#FFF",
        elevation: 4,
        shadowColor: "#000"
    }
});

const Header = ({ navigation }) => {
    // States
    const [user, setUser] = useState({
        loggedIn: true,
        username: "engin"
    });

    // Logout
    const logout = useLogout();
    const signOut = async () => {
        await logout();
        navigation.navigate('SignIn');
    };

    const goTo = (isRegister) => {
        if (isRegister)
            navigation.navigate('SignUp');
        else
            navigation.navigate('SignIn');
    }

    return (
        <Box style={headerStyles.main}>
            <Box safeAreaTop bg="#FFF" />
            <HStack justifyContent="space-between" alignItems="center" w="100%">
                <Flex direction='row' flex={1} justifyContent={"space-between"} alignItems="center">
                    {
                        <>
                            <ImageButton source={searchPng} />
                            <Logo props={{ style: { width: 110, height: 40 } }} />
                            <Menu width={130} mr={2} mt={4} trigger={triggerProps => {
                                return <ImageButton source={userPng} alt="User Menu" props={triggerProps} />;
                            }}>
                                <Menu.Item isDisabled>{user.username}</Menu.Item>
                                <Menu.Item>Profile</Menu.Item>
                                <Menu.Item onPress={signOut}>Logout</Menu.Item>
                            </Menu>
                        </>
                    }
                </Flex>
            </HStack>
        </Box>
    )
}

export default Header