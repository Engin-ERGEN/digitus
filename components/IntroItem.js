import MainStyles from '../styles/MainStyles'
import React from 'react'
import { Box, Button, Heading, Image, Text, VStack } from 'native-base'
import { StyleSheet } from 'react-native'

const IntroItem = ({ image, title, description, props, button, height }) => {
    return (
        <Box {...props}>
            <VStack>
                <Image
                    source={image}
                    alt={title}
                    resizeMode="cover"
                    height={(height * 0.4)}
                />
                <Heading mt={6} textAlign="center" style={MainStyles.title}>{title}</Heading>
                <Text h={100} style={Styles.description}>{description}</Text>
                <Button mx={12} borderRadius={50} mt={6} onPress={button.onPress} style={MainStyles.button}>{button.title}</Button>
            </VStack>
        </Box>
    )
}

const Styles = StyleSheet.create({
    description: {
        textAlign: "justify",
        paddingHorizontal: 60,
        fontSize: 14,
        color: "#333"
    }
});

export default IntroItem