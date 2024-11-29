import { View } from "react-native";
import { List } from "react-native-paper";
import { TemperatureListItem } from "../components/TemperatureListItem";

const cities = [
    { name: "paris", lat: 48.8534, lon: 2.3488 },
];

export default function Index() {
    return (
        <View style={{ flex: 1, justifyContent: "flex-start" }}>
            <List.Section>
                {cities.map((city) => (
                    <TemperatureListItem key={city.name} city={city} />
                ))}
            </List.Section>
        </View>
    );
}

