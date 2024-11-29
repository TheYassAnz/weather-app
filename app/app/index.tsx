import { View } from "react-native";
import { useEffect, useState } from "react";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { List, IconButton, Button } from 'react-native-paper';

export default function Index() {
    const [temperatures, setTemperatures] = useState<{[key: string]: number | null}>({
        paris: null,
        london: null,
        tokyo: null
    });

    const locations = {
        paris: { lat: 48.8534, lon: 2.3488 },
        london: { lat: 51.5074, lon: -0.1278 },
        tokyo: { lat: 35.6762, lon: 139.6503 }
    };

    const fetchCityTemperature = (city: string, coords: {lat: number, lon: number}) => {
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${coords.lat}&longitude=${coords.lon}&hourly=temperature_2m`;
        
        fetch(url)
            .then(response => response.json())
            .then(data => {
                const currentTemp = data.hourly.temperature_2m[0];
                setTemperatures(prev => ({
                    ...prev,
                    [city]: currentTemp
                }));
            })
            .catch(error => console.error(`Error fetching weather for ${city}:`, error));
    };

    useEffect(() => {
        Object.entries(locations).forEach(([city, coords]) => {
            if (temperatures[city] === null) {
                fetchCityTemperature(city, coords);
            }
        });
    }, [temperatures]);

    const removeCity = (cityToRemove: string) => {
        setTemperatures(prev => {
            const newTemperatures = { ...prev };
            delete newTemperatures[cityToRemove];
            return newTemperatures;
        });
    };

    const addCity = (cityToAdd: string) => {
        if (locations[cityToAdd as keyof typeof locations]) {
            setTemperatures(prev => ({
                ...prev,
                [cityToAdd]: null
            }));
        }
    };

    const availableCities = Object.keys(locations).filter(city => !temperatures[city]);

    return (
        <View
            style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
            }}>
            <List.Section>
                <List.Subheader>Weather</List.Subheader>
                {Object.entries(temperatures).map(([city, temp]) => (
                    <List.Item
                        key={city}
                        title={temp !== null 
                            ? `${city.charAt(0).toUpperCase() + city.slice(1)} temperature: ${temp}°C`
                            : `Loading ${city} temperature...`
                        }
                        left={props => (
                            <MaterialCommunityIcons 
                                {...props}
                                name="thermometer" 
                                size={24} 
                                color="black"
                            />
                        )}
                        right={props => (
                            <IconButton
                                {...props}
                                icon="close"
                                onPress={() => removeCity(city)}
                            />
                        )}
                    />
                ))}
                {availableCities.length > 0 && (
                    <List.Section>
                        <List.Subheader>Add Cities</List.Subheader>
                        {availableCities.map(city => (
                            <List.Item
                                key={city}
                                title={city.charAt(0).toUpperCase() + city.slice(1)}
                                right={props => (
                                    <IconButton
                                        {...props}
                                        icon="plus"
                                        onPress={() => addCity(city)}
                                    />
                                )}
                            />
                        ))}
                    </List.Section>
                )}
            </List.Section>
        </View>
    );
}
