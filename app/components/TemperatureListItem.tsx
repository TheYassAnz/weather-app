import { StyleSheet, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { List, Card, DataTable, Text } from "react-native-paper";
import { useEffect, useState } from "react";

type City = {
    name: string;
    lat: number;
    lon: number;
};

type WeatherData = {
    temperature: number;
    windSpeed: number;
    windDirection: number;
    temperatureF: number;
    minTemp: number;
    maxTemp: number;
    pressure: number;
    humidity: number;
    hourlyForecast: Array<{
        time: string;
        temp: number;
    }>;
    dailyForecast: Array<{
        date: string;
        minTemp: number;
        maxTemp: number;
    }>;
};

const API = {
    baseUrl: "https://api.open-meteo.com/v1/forecast",
    params: "hourly=temperature_2m,windspeed_10m,winddirection_10m,relativehumidity_2m,pressure_msl&daily=temperature_2m_max,temperature_2m_min&timezone=auto&forecast_days=5",
};

type TemperatureListItemProps = {
    city: City;
};

export function TemperatureListItem({ city }: TemperatureListItemProps) {
    const [temperature, setTemperature] = useState<WeatherData | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchWeather() {
            setIsLoading(true);
            setError(null);

            try {
                const url = `${API.baseUrl}?latitude=${city.lat}&longitude=${city.lon}&${API.params}`;
                const response = await fetch(url);
                const data = await response.json();

                setTemperature({
                    temperature: data.hourly.temperature_2m[0],
                    temperatureF: (data.hourly.temperature_2m[0] * 9) / 5 + 32,
                    windSpeed: data.hourly.windspeed_10m[0],
                    windDirection: data.hourly.winddirection_10m[0],
                    humidity: data.hourly.relativehumidity_2m[0],
                    pressure: data.hourly.pressure_msl[0],
                    minTemp: data.daily.temperature_2m_min[0],
                    maxTemp: data.daily.temperature_2m_max[0],
                    hourlyForecast: data.hourly.temperature_2m
                        .slice(0, 24)
                        .map((temp: number, i: number) => ({
                            time: data.hourly.time[i],
                            temp,
                        })),
                    dailyForecast: data.daily.temperature_2m_max.map((max: number, i: number) => ({
                        date: data.daily.time[i],
                        maxTemp: max,
                        minTemp: data.daily.temperature_2m_min[i],
                    })),
                });
            } catch (err) {
                setError(`Failed to fetch weather for ${city.name}`);
                console.error(err);
            } finally {
                setIsLoading(false);
            }
        }

        fetchWeather();
    }, [city]);

    if (isLoading) {
        return (
            <List.Item
                title={`Loading ${city.name} temperature...`}
                left={(props) => <MaterialCommunityIcons {...props} name="thermometer" size={24} />}
            />
        );
    }

    if (error || !temperature) {
        return (
            <List.Item
                title={error || `Error loading ${city.name} temperature`}
                left={(props) => <MaterialCommunityIcons {...props} name="alert" size={24} />}
            />
        );
    }

    return (
        <Card style={styles.card}>
            <Card.Title
                title={city.name.charAt(0).toUpperCase() + city.name.slice(1)}
            />
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
