import { Tabs } from "expo-router";

import Ionicons from "@expo/vector-icons/Ionicons";

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
                name="details/[location]"
                options={{
                    title: "Details",
                    tabBarIcon: ({ color, focused }) => (
                        <Ionicons name="information-circle" color={color} size={24} />
                    ),
                    href: null,
                }}
            />
        </Tabs>
    );
}
