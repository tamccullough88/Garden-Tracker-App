import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import mockGardens from '../mockData';

const HomeScreen = () => {
  const [gardens, setGardens] = useState([]);

  // useEffect(() => {
  //   fetch('http://localhost:5000/api/gardens')
  //     .then((response) => response.json())
  //     .then((data) => setGardens(data))
  //     .catch((error) => console.error('Error fetching gardens:', error));
  // }, []);

  const navigation = useNavigation();

  const navigateToGarden = (gardenId) => {
    navigation.navigate('GardenScreen', { gardenId });
  };

  const navigateToNewGarden = () => {
    navigation.navigate('NewGarden');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Gardens:</Text>
      {mockGardens.map((garden) => (
        <TouchableOpacity
          key={garden.id}
          onPress={() => navigateToGarden(garden.gardenId)}
          style={styles.gardenContainer}>
          <Text style={styles.gardenName}>{garden.name}</Text>
        </TouchableOpacity> 
      ))}
      <Button title="Create Garden" onPress={navigateToNewGarden} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
        alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  gardenContainer: {
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'black',
    padding: 10,
    borderRadius: 5,
  },
  gardenName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  }
});


export default HomeScreen;
