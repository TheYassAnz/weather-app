import { useEffect, useState } from "react";
import { View } from "react-native";
import { Avatar, Card, IconButton } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Cities() {
    const [cities, setCities] = useState([]);

    const getData = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem("my-key");
            console.log(jsonValue);
            return jsonValue != null ? JSON.parse(jsonValue) : null;
        } catch (e) {
            // error reading value
            console.error("Error reading value:", e);
        }
    };

    useEffect(() => {
        getData().then((value) => {
            if (value) {
                setCities(value);
            }
        });
    }, []);

    return (
        <View>
            {/* {cities.map((city) => (
                <Card.Title
                    key={city.name}
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
            ))} */}
        </View>
    );
}
