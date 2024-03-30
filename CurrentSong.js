// Community.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const CurrentSong = () => {
  return (
    <View style={styles.container}>
      <Text>Current Song</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CurrentSong;
