import { Text, View } from "react-native";
import { useEffect, useState } from "react";
import { MaterialCommunityIcons } from '@expo/vector-icons';

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

    useEffect(() => {
        Object.entries(locations).forEach(([city, coords]) => {
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
        });
    }, []);

    return (
        <View
            style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
            }}>
            {Object.entries(temperatures).map(([city, temp]) => (
                <View key={city} style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 5 }}>
                    <MaterialCommunityIcons 
                        name="thermometer" 
                        size={24} 
                        color="black" 
                        style={{ marginRight: 8 }}
                    />
                    <Text>
                        {temp !== null 
                            ? `${city.charAt(0).toUpperCase() + city.slice(1)} temperature: ${temp}°C`
                            : `Loading ${city} temperature...`
                        }
                    </Text>
                </View>
            ))}
        </View>
    );
}
