import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      {/* routing */}
      {/* headerShown hide the header for the tabs */}
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="+not-found" />
    </Stack>
  );
}
