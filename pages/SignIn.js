import { Center, Box, Heading, VStack, FormControl, Input, Link, HStack, Text, Button } from 'native-base';
import React, { useState } from 'react'
import Logo from '../components/Logo';
import LoadingScreen from '../components/LoadingScreen'

// Axios
import AxiosInstance from '../api/Axios'
import AsyncStorage from '@react-native-async-storage/async-storage'

const SignIn = ({ navigation }) => {

    // States
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const signIn = async () => {
        setIsLoading(true);
        try {
            const response = await AxiosInstance.get(
                '/login/' + email + "/" + password
            );
            console.log(response?.data);
            const data = {
                loggedIn: true,
                user: response?.data
            };
            await AsyncStorage.setItem('data', JSON.stringify(data));
            navigation.navigate('LoggedScreen');
            setIsLoading(false);
        }
        catch (err) {
            const data = err?.response?.data;
            if (err?.response) {
                alert(data.message);
                console.log("Response From Login Error: ", err);
            }
            else {
                console.log(err);
            }
            setIsLoading(false);
        }
    };

    return (
        <>
            {
                isLoading ?
                    <LoadingScreen message={"Signing..."} />
                    :
                    <Center w="100%">
                        <Box safeArea p="2" py="8" w="90%" maxW="290">
                            <Logo />
                            <VStack space={3} mt="5">
                                <FormControl>
                                    <FormControl.Label>Email Address</FormControl.Label>
                                    <Input value={email} onChangeText={text => setEmail(text)} />
                                </FormControl>
                                <FormControl>
                                    <FormControl.Label>Password</FormControl.Label>
                                    <Input value={password} onChangeText={text => setPassword(text)} type="password" />
                                    <Link _text={{
                                        fontSize: "xs",
                                        fontWeight: "500",
                                        color: "indigo.500"
                                    }} alignSelf="flex-end" mt="1">
                                        Forget Password?
                                    </Link>
                                </FormControl>
                                <Button onPress={signIn} mt="2" colorScheme="indigo">
                                    Sign in
                                </Button>
                                <HStack mt="6" justifyContent="center">
                                    <Text fontSize="sm" color="coolGray.600" _dark={{
                                        color: "warmGray.200"
                                    }}>
                                        I'm a new user.{" "}
                                    </Text>
                                    <Link _text={{
                                        color: "indigo.500",
                                        fontWeight: "medium",
                                        fontSize: "sm"
                                    }} href="https://www.digitus.com.tr/">
                                        Sign Up
                                    </Link>
                                </HStack>
                            </VStack>
                        </Box>
                    </Center>
            }
        </>
    )
}

export default SignIn