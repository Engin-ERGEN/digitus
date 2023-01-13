import { Box, Image, Pressable, Text, VStack } from 'native-base'
import React from 'react'
import { StyleSheet } from 'react-native';

const onItemClick = () => { };

const StatusItem = ({ status }) => {
  return (
    <VStack alignItems={"center"} width={66}>
      <Pressable
        borderColor={!status.read ? "#62B7AC" : "#BFBFBF"}
        style={Styles.imageContainer} onPress={onItemClick}>
        {({
          isHovered,
          isFocused,
          isPressed
        }) => {
          return <Image style={Styles.image} bg={isPressed ? "#D6D7DB" : isHovered ? "#BBBCBF" : "#FFF"} resizeMode="contain" source={{ uri: status.image }} alt={status.title || "Image"} />
        }}
      </Pressable>
      <Text style={Styles.subTitle}>{status.title}</Text>
    </VStack>
  )
}

// Styles
const Styles = StyleSheet.create({
  imageContainer: {
    width: 60,
    height: 60,
    padding: 2,
    borderRadius: 30,
    borderWidth: 4,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFF"
  },
  image: {
    width: 48,
    height: 48,
    borderRadius: 24
  },
  subTitle: {
    color: "#B2B2B2",
    textAlign: "center",
    fontSize: 12,
    lineHeight: 15,
    marginTop: 4
  }
});

export default StatusItem