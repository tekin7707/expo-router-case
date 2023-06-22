import { Tabs } from "expo-router";
import { Text } from "react-native";

export default function AppLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="faulty-product"
        options={{
          title: "Faulty Product",
          tabBarIcon: () => <Text>🐰</Text>,
        }}
      />
      <Tabs.Screen
        name="kvkk"
        options={{
          title: "Kvkk",
          tabBarIcon: () => <Text>🐶</Text>,
        }}
      />
    </Tabs>
  );
}
