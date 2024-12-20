import { Tabs } from "expo-router";

import Ionicons from "@expo/vector-icons/Ionicons";
import { IconButton } from "react-native-paper";

export default function TabLayout() {
    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: "#ffd33d",
                headerStyle: {
                    backgroundColor: "#25292e",
                },
                headerShadowVisible: false,
                headerTintColor: "#fff",
                tabBarStyle: {
                    backgroundColor: "#25292e",
                },
            }}>
            <Tabs.Screen
                name="index"
                options={{
                    title: "Search",
                    tabBarIcon: ({ color, focused }) => (
                        <Ionicons name="search" color={color} size={24} />
                    ),
                }}
            />
            <Tabs.Screen
                name="cities"
                options={{
                    title: "My Cities",
                    tabBarIcon: ({ color, focused }) => (
                        <Ionicons name="list" color={color} size={24} />
                    ),
                }}
            />
            <Tabs.Screen
                name="location"
                options={{
                    title: "My location",
                    tabBarIcon: ({ color, focused }) => <IconButton icon="map-marker" size={24} />,
                }}
            />
            <Tabs.Screen
                name="details/city"
                options={{
                    title: "Details",
                    tabBarIcon: ({ color, focused }) => (
                        <Ionicons name="information-circle" color={color} size={24} />
                    ),
                    // this will prevent the tab from being rendered
                    href: null,
                }}
            />
        </Tabs>
    );
}
