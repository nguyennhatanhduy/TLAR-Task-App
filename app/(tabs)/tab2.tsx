import React, { useEffect, useRef, useState } from "react";
import { Animated, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import FeedCard from "../Components/FeedCard";
import HeaderFeed from "../Components/HeaderFeed";

// Tạo dữ liệu mẫu 10 phần tử
const FEED_DATA = Array.from({ length: 10 }, (_, index) => ({
  id: index.toString(),
  authorName: `User ${index + 1}`,
  authorLevel: 5 + index,
  timeAgo: `${index + 1}h ago`,
  avatarInitials: `U${index + 1}`,
  title: `Feed Title ${index + 1}`,
  content: `This is the content for feed item number ${index + 1}. It contains some sample text to demonstrate the FeedCard component within a FlatList.`,
  tags: ["Demo", "React Native", `Tag ${index}`],
  likes: 10 + index * 2,
  comments: index,
}));

const Tab2 = () => {
  // Animation value: Bắt đầu dịch xuống 50 đơn vị và mờ
  const slideAnim = useRef(new Animated.Value(50)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;
  const [refreshing, setRefreshing] = useState(false);
  const insets = useSafeAreaInsets();

  useEffect(() => {
    // Chạy song song animation trượt lên và hiện dần
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    // Giả lập việc tải lại dữ liệu (ví dụ: gọi API)
    setTimeout(() => {
      // Tại đây bạn có thể cập nhật lại FEED_DATA nếu cần
      setRefreshing(false);
    }, 1500);
  };

  return (
    <View style={styles.container}>
      <HeaderFeed containerStyle={{ paddingTop: insets.top + 16 }} />
      <Animated.FlatList
        data={FEED_DATA}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <FeedCard
            authorName={item.authorName}
            authorLevel={item.authorLevel}
            timeAgo={item.timeAgo}
            avatarInitials={item.avatarInitials}
            title={item.title}
            content={item.content}
            tags={item.tags}
            likes={item.likes}
            comments={item.comments}
          />
        )}
        contentContainerStyle={styles.content}
        style={{
          opacity: opacityAnim,
          transform: [{ translateY: slideAnim }],
        }}
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

export default Tab2;
