import { useNavigation } from '@react-navigation/native';
import { AspectRatio, Box, Flex, Image, ScrollView, Stack, Text, VStack, ZStack } from 'native-base'
import React, { useCallback, useEffect, useState } from 'react'
import { Dimensions, StyleSheet } from 'react-native';
import AxiosInstance from '../api/Axios';
import MainStyles from '../styles/MainStyles'

const { width, height } = Dimensions.get('window');

const ViewPost = () => {
    const [postId, setPostId] = useState(null);
    const [post, setPost] = useState({});
    const navigation = useNavigation();

    const getPost = async (id) => {
        const response = await AxiosInstance.get(
            '/posts/' + id,
        );

        if (response) {
            setPost(response?.data);
        }
    };

    useEffect(() => {
        if (navigation?.getState()?.routes) {
            setPostId(navigation?.getState().routes.find(item => item.name === "ViewPost").params.postId);
        }
    }, []);

    useEffect(() => {
        try {
            if (postId) {
                getPost(postId);
            }
        }
        catch (error) {
            console.log("Get Post Error", error);
        }
    }, [postId]);

    return (
        <Box>
            {
                post ?
                    <Box position={"relative"}>
                        <Image size={"100%"} resizeMode="cover" height={height * 0.4} source={{ uri: post.image }} alt="Post Image" />
                        <Box safeAreaBottom w={"100%"} height={height * 0.6 - 97} style={Styles.content}>
                            <Text my={3} style={MainStyles.title}>{post.title}</Text>
                            <Box style={{ alignSelf: 'baseline' }}>
                                <Text color={"primary.textColor"} style={Styles.category}>{post.category}</Text>
                            </Box>
                            <ScrollView px={1} showsVerticalScrollIndicator={false} mt={4}>
                                <Text style={Styles.description}>{post.description}</Text>
                            </ScrollView>
                        </Box>
                    </Box>
                    :
                    <Text>404</Text>
            }
        </Box>
    )
}

const Styles = StyleSheet.create({
    content: {
        backgroundColor: "#FFF",
        borderRadius: 14,
        position: 'absolute',
        top: height * 0.4 - 40,
        paddingVertical: 10,
        paddingHorizontal: 14
    },
    description: {
        fontSize: 13,
        paddingVertical: 10
    },
    category: {
        borderColor: "#B9CBC0",
        borderWidth: 1,
        borderRadius: 50,
        paddingVertical: 4,
        paddingHorizontal: 40,
        fontSize: 12,
        fontWeight: "bold",
        marginRight: 14,
    }
});

export default ViewPost