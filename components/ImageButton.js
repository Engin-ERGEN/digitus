import { Box, Image, Pressable } from "native-base"
import { StyleSheet } from "react-native";

// Styles
const Styles = StyleSheet.create({
    image: {
        width: 28,
        height: 28,
    }
});

const ImageButton = ({
    source,
    alt,
    props
}) => {
    return (
        <Pressable {...props} p={1}>
            {({
                isHovered,
                isFocused,
                isPressed
            }) => {
                return <Box borderRadius={8} p={3} bg={isPressed ? "#D6D7DB" : isHovered ? "#BBBCBF" : "#FFF"}><Image style={Styles.image} resizeMode="contain" source={source} alt={alt || "Image"} /></Box>
            }}
        </Pressable>
    )
}

export default ImageButton