import React, { useEffect, useState } from "react";
import * as Location from "expo-location";
import { ActivityIndicator } from "react-native-paper";
import { useRouter, useFocusEffect } from "expo-router";

export default function LocationTab() {
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    const getLocation = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
            console.log("Permission to access location was denied");
            return;
        }
        let location = await Location.getCurrentPositionAsync({});
        router.navigate(
            `/details/city?lat=${location.coords.latitude}&lon=${location.coords.longitude}`
        );
    };

    useFocusEffect(
        React.useCallback(() => {
            setLoading(true);
            getLocation().finally(() => setLoading(false));
        }, [])
    );

    if (loading) {
        return <ActivityIndicator animating={true} size="large" />;
    }

    return null;
}
