import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, ScrollView } from 'react-native';
import mockGardens from '../mockData';

const PlantScreen = ({ route, navigation }) => {
  const { gardenId, plantId } = route.params;
  const [plant, setPlant] = useState(null);

  useEffect(() => {
    console.log("Garden ID:", gardenId);
    console.log("Plant ID:", plantId);

    const garden = mockGardens.find(garden => garden.gardenId === gardenId);
    console.log("Garden:", garden);

    if (garden) {
      const foundPlant = plant.find(plant => plant.plantId === plantId);
      console.log("Found Plant:", foundPlant);

      if (foundPlant) {
        setPlant(foundPlant);
      } else {
        console.log("No plant found with ID:", plantId);
      }
    } else {
      console.log("No garden found with ID:", gardenId);
    }
  }, [gardenId, plantId]);


  console.log("Plant:", plant);

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContainer}>
      <View style={styles.plantDetails}>
        <Text style={styles.plantDetailTitle}>Plant Details:</Text>
        {plant && (
          <View style={styles.plantDetail}>
            <Text>Name: {plant.name}</Text>
            <Text>Date Planted: {plant.datePlanted}</Text>
            <Text>Comments: {plant.comments}</Text>
          </View>
        )}
        {!plant && <Text>No plant found</Text>}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollViewContainer: {
    flexGrow: 1,
  },
  plantDetails: {
    borderWidth: 1,
    borderColor: 'black',
    padding: 10,
  },
  plantDetailTitle: {
    fontWeight: 'bold',
    marginBottom: 10,
  },
  plantDetail: {
    marginBottom: 5,
  },
});

export default PlantScreen;
