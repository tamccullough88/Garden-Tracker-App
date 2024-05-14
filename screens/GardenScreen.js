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
        {/* <View style={styles.grid}>
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
        </View>*/}
        {/* Plants Section */}
        <View style={styles.plantList}>
          <Text style={styles.plantListTitle}>Plant Details:</Text>
          <View style={styles.tableHeader}>
            <Text style={styles.columnHeader}>Plant Name</Text>
            <Text style={styles.columnHeader}>Date Planted</Text>
          </View>
          {plants.map(plant => (
            <TouchableOpacity
              key={plant.plantId}
              onPress={() => navigateToPlant(plant.plantId)}
              style={styles.tableRow}>
              <Text style={styles.cellText}>{plant.name}</Text>
              <Text style={styles.cellText}>{plant.datePlanted}</Text>
            </TouchableOpacity>
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
    flexGrow: 1,
    width: 300,
    justifyContent: 'space-between',
  },
  plantListTitle: {
    fontWeight: 'bold',
    marginBottom: 10,
  },
  plantListItem: {
    marginBottom: 5,


  },

  tableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  columnHeader: {
    flex: 1,
    fontWeight: 'bold',
    fontSize: 16,
    padding: 20,
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  cellText: {
    flex: 1,
    fontSize: 16,
  },
});

export default GardenScreen;
