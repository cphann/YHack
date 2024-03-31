import React, { useState, useRef, useEffect } from 'react';
import { View, TouchableOpacity, StyleSheet, Text, Vibration } from 'react-native';
import { Audio } from 'expo-av';
import LottieView from 'lottie-react-native';

const jsonFiles = [
  { name: 'Monkey', path: require('./assets/monkey.json') },
  { name: 'Anime', path: require('./assets/dance.json') },
  { name: 'Timon', path: require('./assets/timon.json') },
  { name: 'Cat', path: require('./assets/cat.json') },
  // Add more JSON animation files here as needed
];

const CurrentSong = () => {
  const animationRef = useRef(null);
  const [submitted, setSubmitted] = useState(false);
  const [sound, setSound] = useState();
  const [isPlaying, setIsPlaying] = useState(false);
  const [animationSource, setAnimationSource] = useState(require('./assets/monkey.json'));

  useEffect(() => {
    return sound ? () => { sound.unloadAsync(); } : undefined;
  }, [sound]);

  const playSound = async () => {
    const { sound } = await Audio.Sound.createAsync(require('./assets/music.mp3'));
    setSound(sound);
    await sound.playAsync();
    setIsPlaying(true);

    sound.setOnPlaybackStatusUpdate(async (status) => {
      if (status.didJustFinish) {
        setIsPlaying(false);
        animationRef.current.pause();
      }
      const { isLoaded, positionMillis, durationMillis } = status;

      if (isLoaded) {
        const currentTime = positionMillis / 1000;
        const totalTime = durationMillis / 1000;

        const intensity = Math.abs(Math.sin((currentTime / totalTime) * Math.PI));
        const duration = Math.floor(intensity * 1000);
        Vibration.vibrate(duration > 0 ? duration : 1);

        if (animationRef.current && !animationRef.current.isPaused) {
          animationRef.current.play();
        }

        if (duration <= 0) {
          animationRef.current.pause();
        }
      }
    });
  };

  const pauseSound = async () => {
    if (sound) {
      await sound.pauseAsync();
      setIsPlaying(false);
      animationRef.current.pause();
    }
  };

  useEffect(() => {
    if (submitted && animationRef.current) {
      animationRef.current.play();
      playSound();
    }
    return () => {
      pauseSound();
    };
  }, [submitted]);

  const handleSubmit = () => {
    setSubmitted(true);
  };
  const playAnimation = () => {
    if (animationRef.current) {
      animationRef.current.play();
      playSound();
    }
  };

  const pauseAnimation = () => {
    if (animationRef.current) {
      animationRef.current.pause();
      pauseSound();
    }
  };

  const selectAnimation = (path) => {
    setAnimationSource(path);
  };

  return (
    <View style={styles.container}>
      {submitted ? (
        <View style={{ alignItems: 'center' }}>
          <LottieView
            ref={animationRef}
            source={animationSource}
            autoPlay
            loop
            speed={0.5}
            style={{ flexGrow: 1, width: 300 }}
          />
          {jsonFiles.map((file, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => {
                playAnimation();
                selectAnimation(file.path);
              }}
              style={styles.button}
            >
              <Text style={styles.buttonText}>{file.name}</Text>
            </TouchableOpacity>
          ))}
          <TouchableOpacity
            onPress={pauseSound}
            style={[styles.button, { backgroundColor: 'red' }]}
          >
            <Text style={styles.buttonText}>Pause</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <TouchableOpacity
          onPress={handleSubmit}
          style={[styles.button, { backgroundColor: 'green' }]}
        >
          <Text style={styles.buttonText}> Play</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: 'blue',
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginVertical: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CurrentSong;

