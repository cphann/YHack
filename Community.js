// Community.js
import React from 'react';
import { View, Text, StyleSheet, Button, Alert, ScrollView } from 'react-native';

const Community = ({ navigation }) => {
  const handleAddPost = () => {
    // Implement navigation to the Add Post screen here
    // For now, display an alert and navigate back to the community page
    Alert.alert('Posted!', 'Your post has been added.', [{ text: 'OK', onPress: () => navigation.goBack() }]);
  };

  const handleApply = (projectName) => {
    Alert.alert('Applied!', `You have applied for ${projectName}.`);
  };

  // Example list of projects
  const examplePosts = [
    {
      id: 1,
      organizationName: 'MusicTech Inc.',
      projectName: 'Music Streaming App Development',
      projectDescription: 'Looking for developers to work on a new music streaming app.',
      attachments: ['Project Details.pdf', 'Mockups.png'],
    },
    {
      id: 2,
      organizationName: 'GameWorks Studios',
      projectName: 'Game Soundtrack Composer Needed',
      projectDescription: 'Seeking a composer to create original music for our upcoming game.',
      attachments: [],
    },
    {
      id: 3,
      organizationName: 'TechTunes',
      projectName: 'Audio Engineering Internship',
      projectDescription: 'Offering an internship for audio engineering enthusiasts.',
      attachments: ['InternshipFlyer.pdf'],
    },
    {
      id: 4,
      organizationName: 'SoundScape Innovations',
      projectName: 'Music Accessibility Project',
      projectDescription: 'Join us in developing tools for making music more accessible to everyone.',
      attachments: [],
    },
    {
      id: 5,
      organizationName: 'MelodyMakers',
      projectName: 'Music Mentorship Program',
      projectDescription: 'Mentorship program for aspiring musicians. Join us and learn from industry experts.',
      attachments: ['MentorshipProgramDetails.pdf'],
    },
  ];

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContainer}>
      <View style={styles.container}>
        <Text>Community Page</Text>
        <Button title="Add Post" onPress={handleAddPost} />
        {/* Display example posts */}
        {examplePosts.map((post) => (
          <View key={post.id} style={styles.postContainer}>
            <Text style={styles.postTitle}>{post.projectName}</Text>
            <Text style={styles.postSubtitle}>{post.organizationName}</Text>
            <Text style={styles.postDescription}>{post.projectDescription}</Text>
            {post.attachments.length > 0 && (
              <Text style={styles.postAttachments}>Attachments: {post.attachments.join(', ')}</Text>
            )}
            <Button title="Apply" onPress={() => handleApply(post.projectName)} />
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollViewContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  postContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginVertical: 5,
    width: '90%',
  },
  postTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  postSubtitle: {
    fontSize: 16,
    color: '#888',
    marginBottom: 5,
  },
  postDescription: {
    marginBottom: 10,
  },
  postAttachments: {
    fontStyle: 'italic',
    color: '#555',
  },
});

export default Community;