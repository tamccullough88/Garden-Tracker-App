
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import GardenScreen from './screens/GardenScreen';
import AddPlantScreen from './screens/AddPlantScreen';
import NewGardenScreen from './screens/NewGardenScreen';
import PlantScreen from './screens/PlantScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="GardenScreen" component={GardenScreen} />
        <Stack.Screen name="AddPlant" component={AddPlantScreen} />
        <Stack.Screen name="NewGarden" component={NewGardenScreen} />
        <Stack.Screen name="PlantScreen" component={PlantScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
