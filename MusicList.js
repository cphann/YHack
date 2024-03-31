import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import axios from 'axios';

const MusicList = () => {
  const [musicData, setMusicData] = useState([]);

  useEffect(() => {
    const fetchHtmlContent = async () => {
      try {
        const response = await axios.get('https://listmaker.com/the-best-music-tracks-ever-recorded'); // Replace with the URL of the website
        const htmlContent = response.data;
        const names = extractNamesFromJsonLd(htmlContent);
        setMusicData(names.map((name, index) => ({ id: index.toString(), title: name })));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchHtmlContent();
  }, []);

  const extractNamesFromJsonLd = (htmlContent) => {
    const jsonLdRegex = /<script type="application\/ld\+json">([\s\S]*?)<\/script>/g;
    const matches = htmlContent.match(jsonLdRegex);

    if (!matches || matches.length === 0) {
      console.error('No JSON-LD script found in HTML.');
      return [];
    }

    const names = [];
    matches.forEach((match) => {
      const json = JSON.parse(match.replace(/<[^>]+>/g, '').trim());
      if (json['@type'] === 'Article' && json.mainEntity && json.mainEntity.itemListElement) {
        json.mainEntity.itemListElement.forEach((item) => {
          if (item.item && item.item.name) {
            names.push(item.item.name);
          }
        });
      }
    });

    return names;
  };

  const renderMusicItem = ({ item }) => (
    <TouchableOpacity style={styles.musicItem} onPress={() => {}}>
      <Text style={styles.title}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={musicData}
      renderItem={renderMusicItem}
      keyExtractor={item => item.id}
      contentContainerStyle={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
    paddingHorizontal: 8,
  },
  musicItem: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default MusicList;
