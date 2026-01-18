import { Tabs } from "expo-router";
import { BookOpen, Home, MessageCircle, Wallet } from "lucide-react-native";
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
      <Tabs.Screen
        name="tab2"
        options={{
          title: "Feed",
          tabBarIcon: ({ color }) => <BookOpen size={20} color={color} />,
        }}
      />
      <Tabs.Screen
        name="tab3"
        options={{
          title: "Message",
          tabBarIcon: ({ color }) => <MessageCircle size={20} color={color} />,
        }}
      />
      <Tabs.Screen
        name="tab4"
        options={{
          title: "Wallet",
          tabBarIcon: ({ color }) => <Wallet size={20} color={color} />,
        }}
      />
      <Tabs.Screen name="tab5" options={{ title: "Tab 5" }} />
    </Tabs>
  );
}
