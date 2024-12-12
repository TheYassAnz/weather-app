import SearchBar from "@/components/SearchBar";
import Position from "../getLocation";
import { View } from "react-native";

export default function Index() {
    return (
        <View
            style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
            }}>
            <SearchBar />
            <Position />
        </View>
    );
}

