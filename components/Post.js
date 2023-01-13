import { Box, AspectRatio, HStack, Center, Image, Stack, Heading, Text, Flex, Spacer, Pressable } from 'native-base'
import React from 'react'
import { AntDesign } from '@expo/vector-icons';
import { StyleSheet } from 'react-native'

const Styles = StyleSheet.create({
    category: {
        borderColor: "#B9CBC0",
        borderWidth: 1,
        borderRadius: 50,
        paddingVertical: 1,
        paddingHorizontal: 40,
        fontSize: 12,
        fontWeight: "bold",
        marginRight: 14
    }
});

const toDate = (date) => {
    var createdDate = new Date(date);

    return (createdDate.getDate() < 10 ? "0" + createdDate.getDate() : createdDate.getDate() + "." + (createdDate.getMonth() + 1 < 10 ? "0" + (createdDate.getMonth() + 1) : (createdDate.getMonth() + 1) + ".") + "." + createdDate.getFullYear());
}

const Post = ({ navigation, post }) => {
    return (
        <Pressable onPress={() => { navigation?.navigate("ViewPost", { postId: post?.id }) }}>
            <Box alignItems="center">
            <Box mx={5} my={2} rounded="lg" overflow="hidden" borderColor="coolGray.200" borderWidth="1" _dark={{
                borderColor: "coolGray.600",
                backgroundColor: "gray.700"
            }} _web={{
                shadow: 2,
                borderWidth: 0
            }} _light={{
                backgroundColor: "gray.50"
            }}>
                <Box>
                    <AspectRatio w="100%" ratio={16 / 9}>
                        <Image width={"100%"} height={"100%"} source={{ uri: post.image }} alt="Post Image" />
                    </AspectRatio>
                </Box>
                <Stack p="4" space={3}>
                    <Heading color={"primary.textColor"} size="lg" ml="-1">
                        {post.title}
                    </Heading>
                    <HStack>
                        <Text color={"primary.textColor"} style={Styles.category}>{post.category}</Text>
                        <Flex alignItems={"center"} direction='row'>
                            <Image style={{
                                width: 20,
                                height: 20
                            }} resizeMode="contain" source={require('../public/images/calendar.png')} alt="Logo" />
                            <Text color={"#A4A8C0"} ml={1} fontSize={12}>{toDate(post.date)}</Text>
                        </Flex>
                        <Spacer />
                        <HStack alignItems="center">
                            <Text mr={1} fontSize={12} color={"#FFA0A0"}>{post.likeCount}</Text>
                            <AntDesign name="hearto" size={24} color="#FFA0A0" />
                        </HStack>
                    </HStack>
                </Stack>
            </Box>
        </Box>
        </Pressable>
    )
}

export default Post