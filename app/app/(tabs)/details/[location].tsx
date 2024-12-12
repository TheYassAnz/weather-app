import { TemperatureListItem } from "@/components/TemperatureListItem";
import { useLocalSearchParams } from "expo-router";
import { View } from "react-native";

export default function Details() {
    const params = useLocalSearchParams();
    const { lon, lat } = params;

    return (
        <View>
            <TemperatureListItem lat={lat} lon={lon} />
        </View>
    );
}
