import { Box, Image, Text, VStack } from "native-base";
import { useRef, useState } from "react";
import { Dimensions, ScrollView, StyleSheet } from "react-native";
import IntroItem from "../components/IntroItem";
import Logo from "../components/Logo";

const Intro = ({ navigation }) => {

  // States
  const [sliderState, setSliderState] = useState({ currentPage: 0 });
  const { width, height } = Dimensions.get('window');
  const scrollViewRef = useRef(null);
  const currentPageRef = useRef(0);

  // Setting Slider Page For Scroll
  const setSliderPage = (event) => {
    const { currentPage } = sliderState;
    const { x } = event.nativeEvent.contentOffset;
    const indexOfNextScreen = Math.floor(parseInt(x) / parseInt(width));
    if (indexOfNextScreen !== currentPage) {
      setSliderState({
        ...sliderState,
        currentPage: indexOfNextScreen,
      });

      currentPageRef.current = indexOfNextScreen;
    }
  };

  // Scrolling Pages With Button
  const scrollPage = () => {
    scrollViewRef?.current?.scrollTo({
      x: (currentPageRef?.current + 1) * width,
      animation: false
    });
  }

  const { currentPage: pageIndex } = sliderState;

  const [introItems, setIntroItems] = useState([
    {
      button: {
        title: "İleri",
        onPress: scrollPage
      },
      height: height,
      image: require('../public/images/slider_1.jpg'),
      title: "Enim ad Minim",
      props: { style: { width, height: height} },
      description: "Adipisicing elit. Incidunt quos nihil inventore est, provident unde id earum dolor cupiditate hic suscipit atque sequi maxime voluptates autem fugit illum"
    },
    {
      button: {
        title: "İleri",
        onPress: scrollPage
      },
      height: height,
      image: require('../public/images/slider_2.jpg'),
      title: "Lorem ipsum dolor sit amet",
      props: { style: { width, height: height } },
      description: "Sit amet consectetur adipisicing elit. Dignissimos. Sit amet consectetur adipisicing elit. Dignissimos. Sit amet consectetur adipisicing elit. Dignissimos."
    },
    {
      button: {
        title: "Giriş",
        onPress: () => {
          navigation.navigate('SignIn');
        }
      },
      height: height,
      image: require('../public/images/slider_3.jpg'),
      title: "Facere earum itaque",
      props: { style: { width, height: height } },
      description: "itaque id eum alias minus autem qui cupiditate obcaecati! Itaque error commodi, pariatur adipisci quas numquam."
    }
  ]);

  return (

    <Box bg={"#FFF"} flex={1}>
      <ScrollView>
        <VStack justifyContent={"center"} alignItems="center">
          <Logo props={{ style: { marginTop: 30, width: "100%", height: 50 } }} />
          <ScrollView
            ref={scrollViewRef}
            horizontal
            scrollEventThrottle={16}
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={setSliderPage}
          >
            {
              introItems?.length > 0 ?
                introItems.map((item, index) => <IntroItem
                  image={item.image}
                  props={item.props}
                  title={item.title}
                  description={item.description}
                  key={index}
                  height={item.height}
                  button={item.button}
                />)
                :
                <Text>There is a problem.</Text>
            }
          </ScrollView>
          <Box style={Styles.paginationWrapper}>
            {Array.from(Array(introItems?.length).keys()).map(index => (
              <Box style={[Styles.paginationDots, { opacity: pageIndex === index ? 1 : 0.4 }]} key={index} />
            ))}
          </Box>
        </VStack>
      </ScrollView>
    </Box>
  );
}

const Styles = StyleSheet.create({
  paginationWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  paginationDots: {
    height: 10,
    width: 10,
    borderRadius: 10 / 2,
    backgroundColor: '#AFAFAF',
    marginLeft: 10,
  },
});

export default Intro