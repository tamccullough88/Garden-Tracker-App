import React, { useState } from 'react';
import { View, TextInput, Button } from 'react-native';

const AddPlantScreen = ({ route, navigation }) => {
    const { gardenId } = route.params;
    const [plantName, setPlantName] = useState('');
    const [datePlanted, setDatePlanted] = useState('');
    const [xLocation, setXLocation] = useState('');
    const [yLocation, setYLocation] = useState('');
    const [comments, setComments] = useState('');

    const addPlant = () => {
        fetch(`http://localhost:5000/api/plants/${gardenId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: plantName,
                date_planted: datePlanted,
                x: parseInt(xLocation),
                y: parseInt(yLocation),
                comments: comments,
            }),
        })
            .then(response => response.json())
            .then(() => navigation.goBack())
            .catch(error => console.error('Error adding plant:', error));
    };

    return (
        <View>
            <TextInput
                placeholder="Plant Name"
                value={plantName}
                onChangeText={text => setPlantName(text)}
            />
            <TextInput
                placeholder="Date Planted"
                value={datePlanted}
                onChangeText={text => setDatePlanted(text)}
            />
            <TextInput
                placeholder="X Location"
                value={xLocation}
                onChangeText={text => setXLocation(text)}
                keyboardType="numeric"
            />
            <TextInput
                placeholder="Y Location"
                value={yLocation}
                onChangeText={text => setYLocation(text)}
                keyboardType="numeric"
            />
            <TextInput
                placeholder="Comments"
                value={comments}
                onChangeText={text => setComments(text)}
                multiline
            />
            <Button title="Add Plant" onPress={addPlant} />
        </View>
    );
};

export default AddPlantScreen;