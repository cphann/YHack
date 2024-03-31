import React from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

// Dummy data for the music library
const musicData = [
  { id: '1', title: 'Song Title 1', artist: 'Artist Name 1', thumbnail: require('./assets/thumbnail1.jpg')},
  { id: '2', title: 'Song Title 2', artist: 'Artist Name 2', thumbnail: require('./assets/thumbnail2.jpg')},
  { id: '3', title: 'Song Title 3', artist: 'Artist Name 3', thumbnail: require('./assets/thumbnail3.jpg')},
  { id: '4', title: 'Song Title 4', artist: 'Artist Name 4', thumbnail: require('./assets/thumbnail4.jpg')},
  { id: '5', title: 'Song Title 5', artist: 'Artist Name 5', thumbnail: require('./assets/thumbnail5.jpg')},
];

const Homepage = () => {
  const navigation = useNavigation();

  // Function to render each item in the music library
  const renderSong = ({ item }) => (
    <TouchableOpacity style={styles.song} onPress={() => {navigation.navigate('CurrentSong')}}>
      {/* <Image source={item.thumbnail} style={styles.smallThumbnail} /> */}
      <Text style={styles.title}>{item.title}</Text>
      <Text>{item.artist}</Text>
    </TouchableOpacity>
  );

  const renderRecentlyPlayed = ({ item }) => (
    <TouchableOpacity style={styles.recentlyPlayed} onPress={() => {navigation.navigate('CurrentSong')}}>
      <Image source={item.thumbnail} style={styles.thumbnail} />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={[styles.header, { marginTop: 20 }]}>Recently Played</Text>
      <FlatList
        horizontal
        data={musicData}
        renderItem={renderRecentlyPlayed} // Or your custom renderItem for recently played layout
        keyExtractor={item => item.id}
        showsHorizontalScrollIndicator={false} // Optional: to hide the horizontal scroll indicator
        style={styles.musicData}
      />
      <Text style={styles.header}> Music Library</Text>
      {/* FlatList to display the music library */}
      <FlatList
        data={musicData}
        renderItem={renderSong}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#D4FAFF',
    flex: 1,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 20,
    textAlign: 'center',
  },
  song: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    marginHorizontal: 16,
    borderRadius: 5,
  },
  thumbnail: {
    width: 100,
    height: 100,
    borderRadius: 4,
  },
  recentlyPlayed: {
    marginVertical: 6,
    marginHorizontal: 10,
    borderRadius: 5,
    flexDirection: 'row', // Use row to have image and text side by side
    alignItems: 'center', // Align items vertically
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default Homepage;
