import { Box, FlatList, HStack, ScrollView, Text } from 'native-base'
import React, { useEffect, useRef, useState } from 'react'
import { StyleSheet } from 'react-native'
import MainStyles from '../../styles/MainStyles';

import StatusItem from '../status/StatusItem'

const Styles = StyleSheet.create({
  box: {
    backgroundColor: "#FFF",
    elevation: 4,
    shadowColor: "#000"
  }
});

const StatusList = ({
  statusesRef
}) => {

  const [statuses, setStatuses] = useState([]);

  // Listing
  useEffect(() => {
    if (statusesRef?.current) {
      setStatuses(statusesRef.current);
    }
  }, [statusesRef]);

  return (
    <Box style={Styles.box}>
      <FlatList
        px={1}
        py={5}
        bg="#FFF"
        maxHeight={"full"} showsHorizontalScrollIndicator={false} horizontal={true}
        ListEmptyComponent={<Text style={MainStyles.nothing} color={"primary.error"}>There is no post.</Text>}
        data={statuses}
        renderItem={({ item }) => <StatusItem status={item} key={item.id} />}
      />
    </Box>
  )
}

export default StatusList