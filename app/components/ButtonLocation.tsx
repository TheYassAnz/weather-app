import React, { useEffect } from "react";
import * as Location from "expo-location";
import { Button } from "react-native-paper";
import { useRouter } from "expo-router";

export default function ButtonLocation() {
    const router = useRouter();

    const getLocation = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
            console.log("Permission to access location was denied");
            return;
        }
        let location = await Location.getCurrentPositionAsync({});
        console.log(location);
        router.replace({
            pathname: "/details/[id]",
            params: {
                id: location.timestamp,
                lat: location.coords.latitude,
                lon: location.coords.longitude,
            },
        });
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
