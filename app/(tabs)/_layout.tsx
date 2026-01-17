import { Tabs } from 'expo-router';
import React from 'react';

export default function TabLayout() {
  return (
    <Tabs>
      <Tabs.Screen name="tab1" options={{ title: 'Tab 1' }} />
      <Tabs.Screen name="tab2" options={{ title: 'Tab 2' }} />
      <Tabs.Screen name="tab3" options={{ title: 'Tab 3' }} />
      <Tabs.Screen name="tab4" options={{ title: 'Tab 4' }} />
      <Tabs.Screen name="tab5" options={{ title: 'Tab 5' }} />
    </Tabs>
  );
}
