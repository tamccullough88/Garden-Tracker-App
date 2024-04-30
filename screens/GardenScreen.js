import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import mockGardens from '../mockData';

const GardenScreen = ({ route, navigation }) => {
  const { gardenId } = route.params;
  const [plants, setPlants] = useState([]);

  const navigateToPlant = (plantId) => {
    navigation.navigate('PlantScreen', { plantId });
  };

  useEffect(() => {
    const garden = mockGardens.find(garden => garden.gardenId === gardenId);
    if (garden) {
      // Shift all xLocation and yLocation points down by 1
      const shiftedPlants = garden.plants.map(plant => ({
        ...plant,
        xLocation: plant.xLocation - 1,
        yLocation: plant.yLocation - 1,
      }));
      setPlants(shiftedPlants);
    }
  }, [gardenId]);

  // Find the maximum x and y coordinates among all the plants
  const maxX = plants.reduce((max, plant) => Math.max(max, plant.xLocation), 0);
  const maxY = plants.reduce((max, plant) => Math.max(max, plant.yLocation), 0);


  return (
    <ScrollView contentContainerStyle={styles.scrollViewContainer}>
      <View style={styles.container}>
        <Text>Plants in Garden:</Text>
        <View style={styles.grid}>
          {Array.from({ length: maxY + 1 }, (_, rowIndex) => (
            <View key={rowIndex} style={styles.row}>
              {Array.from({ length: maxX + 1 }, (_, colIndex) => {
                const plant = plants.find(plant => plant.xLocation === colIndex && plant.yLocation === rowIndex);
                return (
                  <View key={colIndex} style={[styles.cell, plant && styles.plantMarker]}>
                    {plant && (
                      <View>
                        <Text>{plant.name}</Text>
                      </View>
                    )}
                    {!plant && <Text>Empty</Text>}
                  </View>
                );
              })}
            </View>
          ))}
        </View>
        {/* Additional section to display details of each plant */}
        <View style={styles.plantList}>
          <Text style={styles.plantListTitle}>Plant Details:</Text>
          {plants.map(plant => (
            <View key={plant.plantId} style={styles.plantListItem}>
              <TouchableOpacity
                key={plant.plantId}
                onPress={() => navigateToPlant(plant.plantId)}>
                <Text style={styles.gardenName}>{plant.name}</Text>
              </TouchableOpacity>
              <Text>Date Planted: {plant.datePlanted}</Text>
            </View>
          ))}
        </View>
        <Button
          title="Add Plant"
          onPress={() => navigation.navigate('AddPlant', { gardenId: gardenId })}
        />
      </View>
    </ScrollView>
  );
};

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

export default GardenScreen;
