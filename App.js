import React, { useState, useEffect } from 'react';
import { Text, View, Vibration, Button } from 'react-native';
import { Audio } from 'expo-av';

export default function App() {
  const [sound, setSound] = useState();
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  const playSound = async () => {
    const { sound } = await Audio.Sound.createAsync(
      require('./assets/music.mp3')
    );
    setSound(sound);
    await sound.playAsync();
    setIsPlaying(true);

    // Analyze audio spectrum and map to vibration parameters
    sound.setOnPlaybackStatusUpdate(async (status) => {
      if (status.didJustFinish) {
        setIsPlaying(false);
      }
      const { isLoaded, positionMillis, durationMillis } = status;
      if (isLoaded) {
        const currentTime = positionMillis / 1000;
        const totalTime = durationMillis / 1000;

        // Example: Generate vibration based on audio position
        const intensity = Math.abs(Math.sin((currentTime / totalTime) * Math.PI));

        // Example: Vibrate with intensity mapped to audio position
        const duration = Math.floor(intensity * 1000);
        Vibration.vibrate(duration > 0 ? duration : 1); // Ensure duration is non-zero
      }
    });
  };

  const pauseSound = async () => {
    if (sound) {
      await sound.pauseAsync();
      setIsPlaying(false);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>{isPlaying ? 'Music is playing' : 'Music is not playing'}</Text>
      <Button title={isPlaying ? 'Pause Music' : 'Play Music'} onPress={isPlaying ? pauseSound : playSound} />
    </View>
  );
}
