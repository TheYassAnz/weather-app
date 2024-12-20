import { Searchbar, List } from "react-native-paper";
import { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { debounce } from "lodash";

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
                    `${process.env.EXPO_PUBLIC_GEOCODE_API_URL}/search?city=${city}&type=city&format=json&addressdetails=1`,
                    {
                        headers: {
                            "User-Agent":
                                "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3",
                        },
                    }
                );
                const data = await response.json();
                var filtered_data = data.filter(
                    (item: any) => item.addresstype === "city" || item.addresstype === "town"
                );
                setCities(filtered_data);
            } catch (error) {
                console.error("Error fetching city geocode:", error);
                setCities([]);
            } finally {
                setLoading(false);
            }
        };
        const debouncedFetch = debounce(fetchCityGeoCode, 500);
        if (searchQuery) {
            debouncedFetch(searchQuery);
        }

        return () => {
            debouncedFetch.cancel();
        };
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
                    cities.length > 0 &&
                    cities.map((city: any) => {
                        return (
                            <List.Item
                                key={city.place_id}
                                onPress={() => {
                                    setSearchQuery("");
                                    console.log("city", city);
                                    setCities([]);
                                    router.navigate(
                                        `/details/city?lat=${city.lat}&lon=${city.lon}`
                                    );
                                }}
                                title={city.name + ", " + city.address.country}
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
