import { TemperatureListItem } from "@/components/TemperatureListItem";
import { useLocalSearchParams } from "expo-router";
import { useEffect } from "react";
import { View } from "react-native";

export default function Details() {
    const { id, lat, lon } = useLocalSearchParams<{ id: string; lat: string; lon: string }>();

    console.log(id, lat, lon);

    return (
        <View>
            <TemperatureListItem lat={lat} lon={lon} id={id} />
        </View>
    );
}
