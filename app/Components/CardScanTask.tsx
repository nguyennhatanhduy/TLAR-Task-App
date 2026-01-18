import { MapPin } from "lucide-react-native";
import React, { useEffect, useRef } from "react";
import {
  Animated,
  Dimensions,
  Easing,
  StyleSheet,
  Text,
  View,
} from "react-native";

interface CardScanTaskProps {
  isOnline?: boolean; // Trạng thái Online/Offline
  onRetry?: () => void; // Hàm để thử kết nối lại (nếu cần)
}

// Lấy kích thước màn hình
const { width } = Dimensions.get("window");
const scale = (size: number) => (width / 375) * size;

const CardScanTask: React.FC<CardScanTaskProps> = ({ isOnline = false }) => {
  // Animation value cho hiệu ứng sóng
  const pulseAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isOnline) {
      // Chạy animation lặp lại khi Online
      pulseAnim.setValue(0);
      Animated.loop(
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 2000,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }),
      ).start();
    } else {
      // Dừng animation khi Offline
      pulseAnim.stopAnimation();
      pulseAnim.setValue(0);
    }
  }, [isOnline]);

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.innerContainer,
          {
            backgroundColor: isOnline
              ? "rgba(34, 197, 94, 0.6)" // Xanh lá (Green-500) opacity 0.6
              : "rgba(239, 68, 68, 0.6)", // Đỏ (Red-500) opacity 0.6
          },
        ]}
      >
        {/* Icon Section */}
        <View style={styles.iconContainer}>
          {isOnline ? (
            <>
              {/* Hiệu ứng sóng lan tỏa */}
              <Animated.View
                style={[
                  styles.ripple,
                  {
                    transform: [
                      {
                        scale: pulseAnim.interpolate({
                          inputRange: [0, 1],
                          outputRange: [0.8, 2.5],
                        }),
                      },
                    ],
                    opacity: pulseAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0.6, 0],
                    }),
                  },
                ]}
              />
              <View style={styles.onlineDot} />
            </>
          ) : (
            <>
              <MapPin
                size={scale(48)}
                color="#94a3b8" // Slate-400: Màu xám trung tính
                strokeWidth={1.5} // Nét mảnh cho tinh tế
              />
              {/* Một chấm nhỏ ở giữa icon MapPin để giống ảnh hơn (nếu cần) */}
              <View style={styles.pinDot} />
            </>
          )}
        </View>

        {/* Text Section */}
        <View style={styles.textContainer}>
          <Text style={styles.title}>
            {isOnline ? "Scanning for tasks..." : "You're offline"}
          </Text>
          <Text style={styles.subtitle}>
            {isOnline
              ? "We're looking suitable tasks"
              : "Go online to start claiming tasks"}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    borderRadius: scale(20), // Bo góc lớn
    width: "100%",

    // Shadow nhẹ nhàng (Soft Shadow)
    shadowColor: "#64748b",
    shadowOffset: { width: 0, height: scale(4) },
    shadowOpacity: 0.15,
    shadowRadius: scale(10),
    elevation: 3, // Bóng đổ cho Android
  },
  innerContainer: {
    backgroundColor: "#fff",
    borderRadius: scale(20),
    paddingVertical: scale(40),
    paddingHorizontal: scale(20),
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    overflow: "hidden", // Cắt animation bị tràn

    // Border nhẹ để tách biệt nền (nếu nền app màu xám nhạt)
    borderWidth: 1,
    borderColor: "#f1f5f9",
  },
  iconContainer: {
    marginBottom: scale(16),
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  pinDot: {
    position: "absolute",
    width: scale(10),
    height: scale(10),
    borderRadius: scale(3),
    backgroundColor: "#94a3b8",
    top: scale(14), // Căn chỉnh chấm vào giữa vòng tròn của MapPin
  },
  ripple: {
    position: "absolute",
    width: scale(60),
    height: scale(60),
    borderRadius: scale(30),
    borderWidth: 2,
    borderColor: "#22c55e", // Green-500
  },
  onlineDot: {
    width: scale(48),
    height: scale(48),
    borderRadius: scale(24),
    backgroundColor: "#22c55e", // Green-500
    borderWidth: 1.5,
    borderColor: "#ffffff",
    elevation: 2,
  },
  textContainer: {
    alignItems: "center",
    gap: scale(8), // Khoảng cách giữa title và subtitle
  },
  title: {
    fontSize: scale(18),
    fontWeight: "600", // Semi-bold
    color: "#334155", // Slate-700
    textAlign: "center",
  },
  subtitle: {
    fontSize: scale(14),
    color: "#64748b", // Slate-500
    textAlign: "center",
    fontWeight: "400",
  },
});

export default CardScanTask;
