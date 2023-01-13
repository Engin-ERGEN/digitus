import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Box } from 'native-base';

// Navigator
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

// Components
import OperationHeader from './layout/OperationHeader';

// Pages
import Home from '../pages/Home'
import Intro from '../pages/Intro'
import Header from './layout/Header';
import Footer from './layout/Footer';
import SignIn from '../pages/SignIn';
import LoadingScreen from './LoadingScreen';
import ViewPost from '../pages/ViewPost';

const Routers = () => {
    const [haveSeen, setHaveSeen] = useState(false);
    const [isLogged, setIsLogged] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    // Checking If Logged
    const checkIsLogged = async () => {
        try {
            let data = await AsyncStorage.getItem('data');
            data = JSON.parse(data);
            console.log(data);
            if (data?.loggedIn) {
                setIsLogged(true);
            }

            setIsLoading(false);
        }
        catch (error) {
            console.log("AsyncStorage Error: ", error);
            setIsLoading(false);
        }
    };

    // Checking If Seen
    const checkHaveSeen = async () => {
        try {
            let data = await AsyncStorage.getItem('haveSeen');
            data = JSON.parse(data);

            if (data?.check) {
                setHaveSeen(true);
            }
            else {
                await AsyncStorage.setItem('haveSeen', JSON.stringify({ check: true }));
            }

            checkIsLogged();
        }
        catch (error) {
            console.log("AsyncStorage Error: ", error);
            setIsLoading(false);
        }
    };

    useEffect(() => {
        checkHaveSeen();
    }, []);

    if (isLoading) {
        return <LoadingScreen message={"Loading..."} />
    }

    return (
        <Box bg={"#EAEBEF"} flex={1}>
            <NavigationContainer>
                <Stack.Navigator screenOptions={
                    {
                        headerShown: false
                    }
                } initialRouteName={haveSeen ? isLogged ? "LoggedScreen" : "SignIn" : "Intro"}>
                    {
                        <Stack.Group>
                            <Stack.Screen name="LoggedScreen">
                                {
                                    ({ navigation }) => {
                                        return (<React.Fragment>
                                            <Stack.Navigator screenOptions={
                                                {
                                                    header: () => {
                                                        return <Header navigation={navigation} />;
                                                    }
                                                }
                                            } initialRouteName="Home">
                                                <Stack.Screen
                                                    name="ViewPost"
                                                    options={{
                                                        title: null, header: ({ navigation }) => {
                                                            return <OperationHeader navigation={navigation} />
                                                        }
                                                    }}
                                                >
                                                    {
                                                        () => {
                                                            return <ViewPost />
                                                        }
                                                    }
                                                </Stack.Screen>
                                                <Stack.Screen
                                                    name="Home"
                                                    options={{ title: 'Home Page' }}
                                                >
                                                    {
                                                        () => {
                                                            return <Home navigation={navigation} />
                                                        }
                                                    }
                                                </Stack.Screen>
                                            </Stack.Navigator>
                                            <Footer navigation={navigation} />
                                        </React.Fragment>)
                                    }
                                }
                            </Stack.Screen>

                            <Stack.Screen
                                name="Intro"
                                options={{ title: 'Intro', headerShown: false }}
                            >
                                {
                                    ({ navigation }) => {
                                        return <Intro navigation={navigation} />
                                    }
                                }
                            </Stack.Screen>
                            <Stack.Screen
                                name="SignIn"
                                options={{ title: 'Sign In' }}
                            >
                                {
                                    ({ navigation }) => {
                                        return <SignIn navigation={navigation} />
                                    }
                                }
                            </Stack.Screen>
                        </Stack.Group>
                    }
                </Stack.Navigator>
            </NavigationContainer>
        </Box>
    )
}

export default Routers