import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, ScrollView } from 'react-native';
import mockGardens from '../mockData';


const PlantScreen = ({ route, navigation }) => {
  const { gardenId } = route.params;
  const [plants, setPlants] = useState([]);

const navigateToGarden = (gardenId) => {
    navigation.navigate('PlantScreen', { gardenId });
  };

      useEffect(() => {
        const garden = mockGardens.find(garden => garden.gardenId === gardenId);
        if (garden) {
            // Shift all xLocation and yLocation points down by 1
            const plant = garden.plants.find(plant => plant === plant);
            setPlants(plant);
        }
    }, [gardenId]);


  return (
       <ScrollView contentContainerStyle={styles.scrollViewContainer}>
             {/* Additional section to display details of each plant */}
                <View style={styles.plantList}>
                    <Text style={styles.plantListTitle}>Plant Details:</Text>
                    {plants.map(plant => (
                        <View key={plant.plantId} style={styles.plantListItem}>
                            <Text>Name: {plant.name}</Text>
                            <Text>Date Planted: {plant.datePlanted}</Text>
                            <Text>Comments: {plant.comments}</Text>
                        </View>
                    ))}
                </View>
        </ScrollView>
    );


const styles = StyleSheet.create({
  scrollViewContainer: {
    flexGrow: 1,
  },
  container: {
    padding: 20,
    alignItems: 'center',
  },
  grid: {
    flexDirection: 'column',
    borderWidth: 1,
    borderColor: 'black',
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
  },
  cell: {
    width: 100,
    height: 100,
    borderWidth: 1,
    borderColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  plantMarker: {
    backgroundColor: 'lightgreen',
  },
  plantList: {
    borderWidth: 1,
    borderColor: 'black',
    padding: 10,
  },
  plantListTitle: {
    fontWeight: 'bold',
    marginBottom: 10,
  },
  plantListItem: {
    marginBottom: 5,
  },
});

};

export default PlantScreen