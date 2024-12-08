import { StyleSheet, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { List, Card, DataTable, Text } from "react-native-paper";
import { useEffect, useState } from "react";
import * as Location from "expo-location";
import { ENV } from "../config/env";

const API = {
    baseUrl: ENV.WEATHER_API_URL,
    params: ENV.WEATHER_API_PARAMS,
};

export function TemperatureListItem() {
    const [temperature, setTemperature] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    // const [location, setLocation] = useState(null);

    // useEffect(() => {
    //     (async () => {
    //         let { status } = await Location.requestForegroundPermissionsAsync();
    //         if (status !== "granted") {
    //             setError("Permission to access location was denied");
    //             setIsLoading(false);
    //             return;
    //         }

    //         try {
    //             const location = await Location.getCurrentPositionAsync({});
    //             setLocation({
    //                 lat: location.coords.latitude,
    //                 lon: location.coords.longitude,
    //                 name: "Current Location",
    //             });
    //         } catch (err) {
    //             setError("Could not get current location");
    //             setIsLoading(false);
    //         }
    //     })();
    // }, []);

    useEffect(() => {
        //         if (!location) return;

        async function fetchWeather() {
            setIsLoading(true);
            setError(null);

            try {
                const url = `${API.baseUrl}?latitude=${location.lat}&longitude=${location.lon}&${API.params}`;
                const response = await fetch(url);
                const data = await response.json();
                setTemperature(data);
            } catch (err) {
                console.error(err);
            } finally {
                setIsLoading(false);
            }
        }

        fetchWeather();
    }, []);

    if (isLoading) {
        return (
            <List.Item
                title="Loading temperature..."
                left={(props) => <MaterialCommunityIcons {...props} name="thermometer" size={24} />}
            />
        );
    }

    if (error || !temperature) {
        return (
            <List.Item
                title={error || "Error loading temperature"}
                left={(props) => <MaterialCommunityIcons {...props} name="alert" size={24} />}
            />
        );
    }

    return (
        <Card style={styles.card}>
            <Card.Title title="Current Location" />
            <Card.Content>
                <View style={styles.currentWeather}>
                    <Text variant="headlineMedium">
                        {temperature.temperature}°C / {temperature.temperatureF.toFixed(1)}°F
                    </Text>
                    <Text>
                        Min: {temperature.minTemp}°C | Max: {temperature.maxTemp}°C
                    </Text>
                </View>

                <DataTable>
                    <DataTable.Row>
                        <DataTable.Cell>Wind</DataTable.Cell>
                        <DataTable.Cell>{temperature.windSpeed} km/h</DataTable.Cell>
                        <DataTable.Cell>{temperature.windDirection}°</DataTable.Cell>
                    </DataTable.Row>
                    <DataTable.Row>
                        <DataTable.Cell>Humidity</DataTable.Cell>
                        <DataTable.Cell>{temperature.humidity}%</DataTable.Cell>
                    </DataTable.Row>
                    <DataTable.Row>
                        <DataTable.Cell>Pressure</DataTable.Cell>
                        <DataTable.Cell>{temperature.pressure} hPa</DataTable.Cell>
                    </DataTable.Row>
                </DataTable>

                <Text variant="titleMedium" style={styles.sectionTitle}>
                    5-Day Forecast
                </Text>
                <DataTable>
                    {temperature.dailyForecast.map((day) => (
                        <DataTable.Row key={day.date}>
                            <DataTable.Cell>
                                {new Date(day.date).toLocaleDateString()}
                            </DataTable.Cell>
                            <DataTable.Cell>{day.minTemp}°C</DataTable.Cell>
                            <DataTable.Cell>{day.maxTemp}°C</DataTable.Cell>
                        </DataTable.Row>
                    ))}
                </DataTable>
            </Card.Content>
        </Card>
    );
}

const styles = StyleSheet.create({
    card: {
        margin: 8,
    },
    currentWeather: {
        alignItems: "center",
        marginVertical: 16,
    },
    sectionTitle: {
        marginTop: 16,
        marginBottom: 8,
    },
});
