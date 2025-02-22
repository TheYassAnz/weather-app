import { useCallback, useState } from "react";
import { View } from "react-native";
import { Avatar, Button, Card, IconButton, Text } from "react-native-paper";
import { useFocusEffect, useRouter } from "expo-router";

export default function Cities() {
    const router = useRouter();
    const [cities, setCities] = useState([] as any[]);
    const [isLoading, setIsLoading] = useState(false);

    const fetchSavedCities = async () => {
        try {
            setIsLoading(true);
            const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/city`, {
                headers: {
                    "User-Agent":
                        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3",
                },
            });
            const data = await response.json();
            console.log("saved_cities", data);
            setCities(data);
        } catch (error) {
            console.error("Error fetching saved cities:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const deleteCity = async (cityId: string) => {
        try {
            setIsLoading(true);
            const api_url = process.env.EXPO_PUBLIC_API_URL;
            const response = await fetch(`${api_url}/city/${cityId}`, {
                method: "DELETE",
                headers: {
                    "User-Agent":
                        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3",
                },
            });
            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.error("Error deleting city:", error);
        } finally {
            setCities(cities.filter((city) => city.place_id !== cityId));
            setIsLoading(false);
        }
    };

    useFocusEffect(
        useCallback(() => {
            fetchSavedCities();
        }, [])
    );

    if (isLoading) {
        return (
            <View>
                <Card.Title
                    title="Loading..."
                    subtitle="Please wait while we fetch your saved cities"
                />
            </View>
        );
    }

    if (cities && cities.length <= 0) {
        return (
            <View>
                <Card.Title
                    title="No cities saved"
                    subtitle="Search for a city and save it to see it here"
                />
            </View>
        );
    } else {
        return (
            <View>
                {cities.map((city: any) => (
                    <Button
                        key={city.place_id}
                        onPress={() => {
                            console.log("Navigate to city details");
                            router.navigate(`/details/city?lat=${city.lat}&lon=${city.lon}`);
                        }}>
                        <Card.Title
                            key={city.place_id}
                            title={city.name}
                            subtitle={city.country}
                            left={(props) => <Avatar.Icon {...props} icon="city" />}
                            right={(props) => (
                                <IconButton
                                    {...props}
                                    icon="delete-outline"
                                    onPress={() => {
                                        console.log("Delete city");
                                        deleteCity(city.place_id);
                                    }}
                                />
                            )}
                        />
                    </Button>
                ))}
            </View>
        );
    }
}
