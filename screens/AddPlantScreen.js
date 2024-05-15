import React, { useState } from 'react';
import { Text, View, TextInput, Button } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const AddPlantScreen = ({ route, navigation }) => {
    const { gardenId } = route.params;
    const [plantName, setPlantName] = useState('');
    // const [date, setDate] = useState(new Date())
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate;
        setShow(false);
        setDate(currentDate);
    };

    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };

    const showDatepicker = () => {
        showMode('date');
    };


    // const [xLocation, setXLocation] = useState('');
    // const [yLocation, setYLocation] = useState('');
    const [comments, setComments] = useState('');

    const addPlant = () => {
        fetch(`http://localhost:5000/api/plants/${gardenId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: plantName,
                date_planted: date,
                // x: parseInt(xLocation),
                // y: parseInt(yLocation),
                comments: comments,
            }),
        })
            .then(response => response.json())
            .then(() => navigation.goBack())
            .catch(error => console.error('Error adding plant:', error));
    };

    return (
        <View>

            <DateTimePicker
                testID="dateTimePicker"
                value={date}
                mode="date"

                onChange={onChange}
                minimumDate={new Date(2010, 0, 1)}
                onPress={showDatepicker}
            />
            <TextInput
                placeholder="Plant Name"
                value={plantName}
                onChangeText={text => setPlantName(text)}
            />
            <TextInput
                placeholder="Comments"
                value={comments}
                onChangeText={text => setComments(text)}
                multiline
            />
            {/* <TextInput
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
            /> */}

            <Button title="Add Plant" onPress={addPlant} />
        </View>
    );
};

export default AddPlantScreen;