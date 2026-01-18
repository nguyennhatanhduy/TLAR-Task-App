import { useFocusEffect } from "expo-router";
import { Award, Medal, Zap } from "lucide-react-native";
import React, { useCallback, useRef } from "react";
import { Animated, FlatList, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import CardProfile from "../Components/CardProfile";
import FeedCard from "../Components/FeedCard";
import HeaderProfile from "../Components/HeaderProfile";
import StatCard from "../Components/StatCard";

// Dữ liệu mẫu cho danh sách bài viết
const FEED_DATA = Array.from({ length: 5 }, (_, index) => ({
  id: index.toString(),
  authorName: "John Doe",
  authorLevel: 15,
  timeAgo: `${index + 1}h ago`,
  avatarInitials: "JD",
  title: `My Task Update ${index + 1}`,
  content: `Just finished another task! This platform is amazing for tracking progress. #${index + 1}`,
  tags: ["Update", "Daily"],
  likes: 10 + index,
  comments: index,
}));

const Tab5 = () => {
  const insets = useSafeAreaInsets();
  const flatListRef = useRef<FlatList>(null);

  // Animation values cho 3 thẻ (Opacity & TranslateY)
  const fadeAnim1 = useRef(new Animated.Value(0)).current;
  const slideAnim1 = useRef(new Animated.Value(50)).current;

  const fadeAnim2 = useRef(new Animated.Value(0)).current;
  const slideAnim2 = useRef(new Animated.Value(50)).current;

  const fadeAnim3 = useRef(new Animated.Value(0)).current;
  const slideAnim3 = useRef(new Animated.Value(50)).current;

  useFocusEffect(
    useCallback(() => {
      // Tự động cuộn lên đầu trang khi mở tab
      flatListRef.current?.scrollToOffset({ offset: 0, animated: true });

      // Reset animation về trạng thái ban đầu mỗi khi focus
      fadeAnim1.setValue(0);
      slideAnim1.setValue(50);
      fadeAnim2.setValue(0);
      slideAnim2.setValue(50);
      fadeAnim3.setValue(0);
      slideAnim3.setValue(50);

      const createAnim = (
        fade: Animated.Value,
        slide: Animated.Value,
        delay: number,
      ) => {
        return Animated.parallel([
          Animated.timing(fade, {
            toValue: 1,
            duration: 500,
            delay,
            useNativeDriver: true,
          }),
          Animated.spring(slide, {
            toValue: 0,
            friction: 6,
            delay,
            useNativeDriver: true,
          }),
        ]);
      };

      Animated.parallel([
        createAnim(fadeAnim1, slideAnim1, 100),
        createAnim(fadeAnim2, slideAnim2, 200),
        createAnim(fadeAnim3, slideAnim3, 300),
      ]).start();
    }, []),
  );

  return (
    <View style={styles.container}>
      <HeaderProfile containerStyle={{ paddingTop: insets.top + 16 }} />
      <FlatList
        ref={flatListRef}
        data={FEED_DATA}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.feedItemContainer}>
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
          </View>
        )}
        ListHeaderComponent={
          <View style={styles.headerContent}>
            <CardProfile />
            <Text style={styles.sectionTitle}>Performance Stats</Text>
            <View style={styles.statsRow}>
              <Animated.View
                style={{
                  opacity: fadeAnim1,
                  transform: [{ translateY: slideAnim1 }],
                }}
              >
                <StatCard
                  icon={Zap}
                  value="12k"
                  label="Earned"
                  color="#facc15"
                />
              </Animated.View>
              <Animated.View
                style={{
                  opacity: fadeAnim2,
                  transform: [{ translateY: slideAnim2 }],
                }}
              >
                <StatCard
                  icon={Award}
                  value="87"
                  label="Done"
                  color="#06b6d4"
                />
              </Animated.View>
              <Animated.View
                style={{
                  opacity: fadeAnim3,
                  transform: [{ translateY: slideAnim3 }],
                }}
              >
                <StatCard
                  icon={Medal}
                  value="4.9"
                  label="Rate"
                  color="#f43f5e"
                />
              </Animated.View>
            </View>
            <Text style={[styles.sectionTitle, { marginTop: 20 }]}>
              Recent Activities
            </Text>
          </View>
        }
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8fafc",
  },
  listContent: {
    paddingBottom: 20,
  },
  headerContent: {
    alignItems: "center",
    paddingTop: 20,
  },
  feedItemContainer: {
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#334155",
    width: "100%",
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    width: "100%",
  },
});

export default Tab5;
