import { Box, HStack, IconButton } from 'native-base';
import React from 'react'
import Logo from '../Logo';
import { Ionicons } from '@expo/vector-icons';

const OperationHeader = ({ navigation }) => {
    return (
        <Box safeAreaTop>
            <HStack py={4} position={"relative"}>
                <IconButton alignSelf={"center"} position={"absolute"} icon={<Ionicons name="arrow-back" size={24} color="black" />} borderRadius="full" _icon={{
                    color: "orange.500",
                    size: "md"
                }} onPress={() => {
                    navigation.goBack();
                }} />
                <Box w={"100%"}>
                    <Logo props={{ alignSelf: "center", style: { width: 110, height: 40 } }} />
                </Box>
            </HStack>
        </Box>
    )
}

export default OperationHeader