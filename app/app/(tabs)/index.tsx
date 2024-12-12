import ButtonLocation from "@/components/ButtonLocation";
import SearchBar from "@/components/SearchBar";
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
            <ButtonLocation />
        </View>
    );
}
