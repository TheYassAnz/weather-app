import React, { useEffect } from 'react';
import * as Location from 'expo-location';
import { Button } from 'react-native-paper';

export default function getLocation() {
    const getLocation = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            console.log('Permission to access location was denied');
            return;
        }
        let location = await Location.getCurrentPositionAsync({});
        console.log(location);
    };

    useEffect(() => {
        getLocation();
    }, []);

    return (
        <Button icon="map-marker" mode="contained" onPress={() => getLocation()}>
            Get Location
        </Button>
    );
}