import React, { useState } from 'react';
import { View, TextInput, Button } from 'react-native';

const NewGardenScreen = ({ navigation }) => {
    const [gardenName, setGardenName] = useState('');

    const createGarden = () => {
        fetch('http://localhost:5000/api/gardens', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: gardenName }),
        })
            .then(response => response.json())
            .then(() => navigation.navigate('Home'))
            .catch(error => console.error('Error creating garden:', error));
    };

    return (
        <View>
            <TextInput
                placeholder="Garden Name"
                value={gardenName}
                onChangeText={text => setGardenName(text)}
            />
            <Button title="Create Garden" onPress={createGarden} />
        </View>
    );
};

export default NewGardenScreen;