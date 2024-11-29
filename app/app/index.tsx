import { Text, View } from "react-native";
import { Menu } from "react-native-paper";

export default function Index() {
    return (
        <View
            style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
            }}>
            <Text>Hello World!</Text>
            <Menu.Item leadingIcon="redo" onPress={() => {}} title="Redo" />
            <Menu.Item leadingIcon="undo" onPress={() => {}} title="Undo" />
            <Menu.Item leadingIcon="content-cut" onPress={() => {}} title="Cut" disabled />
            <Menu.Item leadingIcon="content-copy" onPress={() => {}} title="Copy" disabled />
            <Menu.Item leadingIcon="content-paste" onPress={() => {}} title="Paste" />
        </View>
    );
}
