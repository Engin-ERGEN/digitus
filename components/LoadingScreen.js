import React from 'react'
import { Box, HStack, Spinner } from 'native-base';
import { Text } from 'react-native';

const LoadingScreen = ({ message }) => {
  return (
    <Box style={{ flex: 1, justifyContent: "center", zIndex: 1, width: "100%", height: "100%", position: "absolute", top: 0, left: 0, backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
      <HStack space={8} justifyContent="center" direction={"column"} alignItems="center">
        <Text style={{ color: "white", fontWeight: "bold", fontSize: 20 }}>{message}</Text>
        <Spinner color={"#FF4953"} size="lg" />
      </HStack>
    </Box>
  )
}

export default LoadingScreen