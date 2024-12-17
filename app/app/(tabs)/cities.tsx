import { useEffect, useState } from "react";
import { View } from "react-native";
import { Avatar, Button, Card, IconButton } from "react-native-paper";
import { usePathname } from "expo-router";
import SessionStorage from "react-native-session-storage";

export default function Cities() {
    const pathname = usePathname();
    const [cities, setCities] = useState([]);

    const fetchSavedCities = async () => {
        // fetch
    };

    const clearSavedCities = async () => {
        // clear
    };

    useEffect(() => {
        fetchSavedCities();
    }, [pathname]);

    return (
        <View>
            <Button onPress={clearSavedCities}>Clear saved cities</Button>
            {cities.map((city: any) => (
                <Card.Title
                    key={city.id}
                    title={city.name}
                    subtitle={city.country}
                    left={(props) => <Avatar.Icon {...props} icon="city" />}
                    right={(props) => (
                        <IconButton
                            {...props}
                            icon="delete-outline"
                            onPress={() => {
                                setCities(cities.filter((c) => c !== city));
                            }}
                        />
                    )}
                />
            ))}
        </View>
    );
}
