import { Tabs } from "expo-router";
import { Home } from "lucide-react-native";
import React from "react";

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen
        name="tab1"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => <Home size={20} color={color} />,
        }}
      />
      <Tabs.Screen name="tab2" options={{ title: "Tab 2" }} />
      <Tabs.Screen name="tab3" options={{ title: "Tab 3" }} />
      <Tabs.Screen name="tab4" options={{ title: "Tab 4" }} />
      <Tabs.Screen name="tab5" options={{ title: "Tab 5" }} />
    </Tabs>
  );
}
