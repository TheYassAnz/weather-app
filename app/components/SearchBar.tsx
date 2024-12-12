import { Searchbar, List } from "react-native-paper";
import { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

export default function SearchBar() {
    const [searchQuery, setSearchQuery] = useState("");
    const [cities, setCities] = useState([]);
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    useEffect(() => {
        const fetchCityGeoCode = async (city: string) => {
            try {
                setLoading(true);
                const response = await fetch(
                    `https://nominatim.openstreetmap.org/search?q=${city}&format=json&limit=10`,
                    {
                        headers: {
                            "User-Agent":
                                "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3",
                        },
                    }
                );
                const data = await response.json();
                setCities(data);
            } catch (error) {
                console.error("Error fetching city geocode:", error);
                setCities([]);
            } finally {
                setLoading(false);
            }
        };
        fetchCityGeoCode(searchQuery);
    }, [searchQuery]);

    return (
        <View style={styles.container}>
            <Searchbar
                placeholder="Search for a city..."
                onChangeText={setSearchQuery}
                value={searchQuery}
                selectionColor={"#000"}
                loading={loading}
            />
            <View>
                {!loading &&
                    cities &&
                    cities.map((city: any) => {
                        return (
                            <List.Item
                                key={city.place_id}
                                onPress={() => {
                                    setSearchQuery("");
                                    console.log(city);

                                    router.replace({
                                        pathname: "/details/[location]",
                                        params: { lat: city.lat, lon: city.lon },
                                    });
                                }}
                                title={city.display_name}
                                description={`Latitude: ${city.lat}, Longitude: ${city.lon}`}
                            />
                        );
                    })}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
    },
});
