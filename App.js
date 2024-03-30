import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, Vibration } from 'react-native';

export default function App() {
  const [isVibrating, setIsVibrating] = useState(false);

  const vibratePhone = () => {
    Vibration.vibrate(1000); // Vibrate for 1000 milliseconds (1 second)
    setIsVibrating(true);

    // Check if the phone is vibrating every 100 milliseconds
    const checkVibrationInterval = setInterval(() => {
      Vibration.cancel(); // Cancel vibration to check if it's still ongoing
      Vibration.vibrate(); // Restart vibration
      Vibration.cancel(); // Cancel vibration again to check if it's stopped
      setIsVibrating(Vibration.cancel());
      clearInterval(checkVibrationInterval);
    }, 100);
  };

  return (
    <View style={styles.container}>
      <Text>Press the button to vibrate the phone</Text>
      <Button title="Vibrate Now" onPress={vibratePhone} />
      <Text>{isVibrating ? 'Phone is vibrating' : 'Phone is not vibrating'}</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

