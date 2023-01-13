import { View, Text, ActivityIndicator } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { Box, FlatList, Heading, ScrollView, Spinner } from 'native-base'

// Components
import StatusList from '../components/status/StatusList'
import Post from '../components/Post'
import { RefreshControl } from 'react-native'
import AxiosInstance from '../api/Axios'
import LoadingScreen from '../components/LoadingScreen'

const Home = ({ navigation }) => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [offset, setOffset] = useState(1);
  const [limit, setLimit] = useState(5);
  const [isFetching, setIsFetching] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  // References
  const statusesRef = useRef();
  const postsRef = useRef([]);
  const flatListRef = useRef()

  const getStatuses = async () => {
    const response = await AxiosInstance.get(
      '/statuses'
    );

    // Get Posts From Response
    const data = response?.data;
    statusesRef.current = data;

  };

  const getPosts = async () => {
    if (!isFinished) {
      setIsFetching(true);
      try {
        const response = await AxiosInstance.get(
          "/posts?_page= " + (offset || 1) + "&_limit=" + limit + "&_sort=date&_order=desc"
        );

        // Get Posts From Response
        const data = response?.data;

        postsRef.current = offset > 1 ? [...postsRef.current, ...data] : data;
        setPosts(postsRef.current);

        if (offset > 1) {
          // Scrolling To Last Item
          flatListRef?.current?.scrollToIndex({
            animated: true,
            index: posts.length - 1
          });
        }

        if (data.length < limit) {
          setIsFinished(true);
        }

        setIsFetching(false);
      }
      catch (error) {
        setIsFetching(false);
        console.log("Post Fetching Error", error);
      }
    }
  };

  const onRefresh = async () => {
    setOffset(1);
    setIsFinished(false);
  };

  useEffect(() => {
    const onStart = async () => {
      try {
        await getStatuses();
        await getPosts();
        setIsLoading(false);
      }
      catch (error) {
        console.log("Starting Error", error);
        setIsLoading(false);
      }
    };

    onStart();
  }, []);

  useEffect(() => {
    getPosts();
  }, [offset]);

  if (isLoading) {
    return <LoadingScreen message={"Loading..."} />
  }

  return (
    <Box flex={1}>
      <StatusList statusesRef={statusesRef} />

      {/* Views */}
      {

        <>
          <FlatList
            refreshControl={
              <RefreshControl
                refreshing={isRefreshing}
                onRefresh={onRefresh}
              />
            }
            ListEmptyComponent={
              <Text style={{ textAlign: "center", color: "red", fontWeight: "bold", fontSize: 18, marginVertical: 30 }}>There is no post here.</Text>
            }
            showsVerticalScrollIndicator={false}
            ref={flatListRef}
            onScrollToIndexFailed={(error) => {
              console.log("On Scroll To Index Error", error);
            }}
            onEndReached={() => {
              setOffset(offset + 1);
            }}
            data={posts}
            renderItem={
              ({ item }) => <Post navigation={navigation} post={item} />
            }
            keyExtractor={item => item.id}
          />
          {
            isFetching ? <ActivityIndicator size="large" color={"primary.textColor"} animating={isFetching} /> : null
          }
        </>
      }
    </Box>
  )
}

export default Home