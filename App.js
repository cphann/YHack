// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import Homepage from './Homepage';
import Community from './Community';
import CurrentSong from './CurrentSong';
import Settings from './Settings';

const Stack = createNativeStackNavigator();

// Define a custom tab bar component
const CustomTabBar = ({ navigation }) => (
  <View style={styles.tabBar}>
    <TouchableOpacity onPress={() => navigation.navigate('Homepage')} style={styles.tabItem}>
      <Text>Home</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={() => navigation.navigate('Community')} style={styles.tabItem}>
      <Text>Community</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={() => navigation.navigate('CurrentSong')} style={styles.tabItem}>
      <Text>Current Song</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={() => navigation.navigate('Settings')} style={styles.tabItem}>
      <Text>Settings</Text>
    </TouchableOpacity>
  </View>
);

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Homepage" component={Homepage} />
        <Stack.Screen name="Community" component={Community} />
        <Stack.Screen name="CurrentSong" component={CurrentSong} />
        <Stack.Screen name="Settings" component={Settings} />
        {/* You can add more screens here */}
      </Stack.Navigator>
      {/* Your custom tab bar */}
      <CustomTabBar />
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    backgroundColor: '#eee',
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
  },
});

export default App;
