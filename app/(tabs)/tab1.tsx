import { useFocusEffect } from "expo-router";
import React, { useCallback, useRef, useState } from "react";
import { Animated, ScrollView, StyleSheet, Text, View } from "react-native";
import CardScanTask from "../Components/CardScanTask";
import HeaderHome from "../Components/HeaderHome";
import PowerButton from "../Components/PowerButton";
import SectorSelection from "../Components/SectorSelection";
import TaskCard from "../Components/TaskCard";

const Tab1 = () => {
  // Animation value cho vị trí Y (0 = hiển thị, >0 = ẩn xuống dưới)
  const slideAnim = useRef(new Animated.Value(0)).current;
  // State quản lý trạng thái Online/Offline
  const [isOnline, setIsOnline] = useState(false);
  // Ref để lưu timer debounce
  const timeoutRef = useRef<any>(null);
  const scrollViewRef = useRef<ScrollView>(null);

  useFocusEffect(
    useCallback(() => {
      scrollViewRef.current?.scrollTo({ y: 0, animated: true });
    }, []),
  );

  const handleScroll = () => {
    // 1. Khi đang cuộn -> Slide xuống (Ẩn)
    Animated.timing(slideAnim, {
      toValue: 200, // Trượt xuống 200 đơn vị (đủ để khuất khỏi màn hình)
      duration: 100,
      useNativeDriver: true,
    }).start();

    // 2. Xóa timer cũ nếu có (reset đếm ngược)
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // 3. Thiết lập timer mới: Nếu sau 500ms không cuộn nữa -> Slide lên (Hiện)
    timeoutRef.current = setTimeout(() => {
      Animated.timing(slideAnim, {
        toValue: 0, // Trở về vị trí ban đầu
        duration: 300,
        useNativeDriver: true,
      }).start();
    }, 500);
  };

  return (
    <View style={styles.container}>
      <HeaderHome />
      <View style={styles.scanTaskContainer}>
        {/* Hiển thị trạng thái Scan khi Online, Offline khi chưa */}
        <CardScanTask isOnline={isOnline} />
      </View>
      <ScrollView
        ref={scrollViewRef}
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        onScroll={handleScroll} // Bắt sự kiện cuộn
        scrollEventThrottle={16} // Đảm bảo sự kiện bắn ra mượt mà (16ms ~ 60fps)
      >
        <SectorSelection />

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Lịch sử</Text>
        </View>

        {/* Card với dữ liệu mặc định */}
        <TaskCard />

        <View style={styles.separator} />

        {/* Card với dữ liệu tùy chỉnh */}
        <TaskCard
          title="Fix Login Bug"
          category="Development"
          difficulty="Hard"
          points={200}
          completedDate="1 hour ago"
          rating={4}
        />
      </ScrollView>

      <Animated.View
        style={[
          styles.switchContainer,
          { transform: [{ translateY: slideAnim }] }, // Gắn animation vào style
        ]}
      >
        {/* Truyền state và hàm cập nhật xuống PowerButton */}
        <PowerButton isOn={isOnline} onToggle={setIsOnline} />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8fafc",
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 16,
    alignItems: "center",
  },
  scanTaskContainer: {
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
  separator: {
    height: 15,
  },
  switchContainer: {
    position: "absolute",
    bottom: 30,
    alignSelf: "center",
    zIndex: 10, // Giảm zIndex để không đè lên dropdown của SectorSelection
  },
  sectionHeader: {
    width: "100%",
    maxWidth: 400,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#334155",
  },
});

export default Tab1;
