import { useFocusEffect, useRouter } from "expo-router";
import React, { useCallback, useRef, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import HeaderMessage from "../Components/HeaderMessage";
import MessagerCard from "../Components/MessagerCard";

// Dữ liệu mẫu 5 tin nhắn
const MESSAGES_DATA = [
  {
    id: "1",
    name: "David Kim",
    message: "Check out this resource I found for the project.",
    time: "5h ago",
    avatarInitials: "DK",
    isUnread: true,
  },
  {
    id: "2",
    name: "Sarah Chen",
    message: "Can we reschedule our meeting to tomorrow?",
    time: "1d ago",
    avatarInitials: "SC",
    isUnread: false,
  },
  {
    id: "3",
    name: "Michael Brown",
    message: "Thanks for the update! Great work.",
    time: "2d ago",
    avatarInitials: "MB",
    isUnread: false,
  },
  {
    id: "4",
    name: "Emily Davis",
    message: "Here is the file you requested earlier.",
    time: "3d ago",
    avatarInitials: "ED",
    isUnread: true,
  },
  {
    id: "5",
    name: "James Wilson",
    message: "Let's catch up soon regarding the new task.",
    time: "1w ago",
    avatarInitials: "JW",
    isUnread: false,
  },
];

const Tab3 = () => {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [refreshing, setRefreshing] = useState(false);
  const flatListRef = useRef<FlatList>(null);

  useFocusEffect(
    useCallback(() => {
      flatListRef.current?.scrollToOffset({ offset: 0, animated: true });
    }, []),
  );

  const onRefresh = () => {
    setRefreshing(true);
    // Mô phỏng việc tải lại dữ liệu (Fetch API sau này)
    setTimeout(() => {
      setRefreshing(false);
    }, 1500);
  };

  return (
    <View style={styles.container}>
      <View style={{ paddingTop: insets.top, backgroundColor: "#fff" }}>
        <HeaderMessage />
      </View>
      <FlatList
        ref={flatListRef}
        data={MESSAGES_DATA}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <MessagerCard
            id={item.id}
            name={item.name}
            message={item.message}
            time={item.time}
            avatarInitials={item.avatarInitials}
            isUnread={item.isUnread}
            onPress={() => router.push("/MessagerTab")}
          />
        )}
        contentContainerStyle={styles.content}
        refreshing={refreshing}
        onRefresh={onRefresh}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8fafc",
  },
  content: {
    padding: 16,
  },
});

export default Tab3;
