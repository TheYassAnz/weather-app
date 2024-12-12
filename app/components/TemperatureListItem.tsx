import { StyleSheet, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { List, Card, DataTable, Text } from "react-native-paper";
import { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";

export function TemperatureListItem({ lat, lon }: { lat: any; lon: any }) {
    const [meteo, setMeteo] = useState({} as any);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchWeather() {
            setIsLoading(true);
            setError(null);

            try {
                const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,surface_pressure,wind_speed_10m,wind_direction_10m&daily=temperature_2m_max,temperature_2m_min`;
                const response = await fetch(url);
                const data = await response.json();
                setMeteo({
                    current: data.current.temperature_2m,
                    minTemp: data.daily.temperature_2m_min[0],
                    maxTemp: data.daily.temperature_2m_max[0],
                    windSpeed: data.current.wind_speed_10m,
                    windDirection: data.current.wind_direction_10m,
                    humidity: data.current.relative_humidity_2m,
                    pressure: data.current.surface_pressure,
                    maxTempForecast: data.daily.temperature_2m_max,
                    minTempForecast: data.daily.temperature_2m_min,
                });
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

    if (error || !meteo) {
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
                    <Text variant="headlineMedium" style={styles.temperatureText}>
                        {meteo.current}°C / {meteo.current * 1.8 + 32}°F
                    </Text>
                    <Text style={styles.minMaxText}>
                        Min: {meteo.minTemp}°C | Max: {meteo.maxTemp}°C
                    </Text>
                </View>

                <DataTable>
                    <DataTable.Row>
                        <DataTable.Cell>Wind</DataTable.Cell>
                        <DataTable.Cell>{meteo.windSpeed} km/h</DataTable.Cell>
                        <DataTable.Cell>{meteo.windDirection}°</DataTable.Cell>
                    </DataTable.Row>
                    <DataTable.Row>
                        <DataTable.Cell>Humidity</DataTable.Cell>
                        <DataTable.Cell>{meteo.humidity}%</DataTable.Cell>
                    </DataTable.Row>
                    <DataTable.Row>
                        <DataTable.Cell>Pressure</DataTable.Cell>
                        <DataTable.Cell>{meteo.pressure} hPa</DataTable.Cell>
                    </DataTable.Row>
                </DataTable>

                <Text variant="titleMedium" style={styles.sectionTitle}>
                    7-Day Forecast
                </Text>
                <DataTable>
                    {meteo.maxTempForecast.map((maxTemp: number, index: number) => (
                        <DataTable.Row key={index}>
                            <DataTable.Cell>Day {index + 1}</DataTable.Cell>
                            <DataTable.Cell>Min: {maxTemp}°C</DataTable.Cell>
                            <DataTable.Cell>Max: {meteo.minTempForecast[index]}°C</DataTable.Cell>
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
        borderRadius: 10,
        backgroundColor: "#f8f9fa",
    },
    currentWeather: {
        alignItems: "center",
        marginVertical: 16,
    },
    temperatureText: {
        fontWeight: "bold",
        color: "#ff6347",
    },
    minMaxText: {
        color: "#555",
    },
    sectionTitle: {
        marginTop: 16,
        marginBottom: 8,
        fontWeight: "bold",
        color: "#333",
    },
});
