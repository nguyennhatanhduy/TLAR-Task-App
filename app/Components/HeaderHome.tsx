import { Bell, Receipt } from "lucide-react-native";
import React from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface HeaderHomeProps {
  userName?: string;
  avatarInitials?: string; // Ví dụ: "JD"
  points?: number;
  notificationCount?: number;
  onNotificationPress?: () => void;
  onProfilePress?: () => void;
}

// Lấy kích thước màn hình
const { width } = Dimensions.get("window");
const scale = (size: number) => (width / 375) * size;

const HeaderHome: React.FC<HeaderHomeProps> = ({
  userName = "John Doe",
  avatarInitials = "JD",
  points = 1250,
  notificationCount = 3,
  onNotificationPress,
  onProfilePress,
}) => {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top + scale(16) }]}>
      {/* KHU VỰC TRÁI: Avatar & Lời chào */}
      <View style={styles.profileSection}>
        <TouchableOpacity
          onPress={onProfilePress}
          style={styles.avatarContainer}
        >
          <Text style={styles.avatarText}>{avatarInitials}</Text>
        </TouchableOpacity>

        <View style={styles.greetingContainer}>
          <Text style={styles.greetingText}>Welcome back,</Text>
          <Text style={styles.nameText}>{userName}</Text>
        </View>
      </View>

      {/* KHU VỰC PHẢI: Điểm số & Thông báo */}
      <View style={styles.actionsSection}>
        {/* Badge Điểm số */}
        <View style={styles.pointsBadge}>
          <Receipt size={scale(16)} color="#f97316" />
          <Text style={styles.pointsText}>
            {points.toLocaleString()} {/* Format số: 1,250 */}
          </Text>
        </View>

        {/* Nút Thông báo */}
        <TouchableOpacity
          style={styles.notificationButton}
          onPress={onNotificationPress}
        >
          <Bell size={scale(24)} color="#1e293b" />
          {notificationCount > 0 && (
            <View style={styles.notificationBadge}>
              <Text style={styles.notificationCount}>
                {notificationCount > 9 ? "9+" : notificationCount}
              </Text>
            </View>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: scale(20),
    paddingBottom: scale(16),
    backgroundColor: "#fff", // Hoặc transparent nếu muốn đè lên background
  },

  // --- Left Section ---
  profileSection: {
    flexDirection: "row",
    alignItems: "center",
    gap: scale(12),
  },
  avatarContainer: {
    width: scale(48),
    height: scale(48),
    borderRadius: scale(24), // Tròn hoàn hảo (width / 2)
    backgroundColor: "#0066ff", // Màu xanh dương giống ảnh
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: {
    color: "#fff",
    fontSize: scale(18),
    fontWeight: "600",
  },
  greetingContainer: {
    flexDirection: "column",
  },
  greetingText: {
    color: "#64748b", // Màu xám nhạt
    fontSize: scale(14),
  },
  nameText: {
    color: "#0f172a", // Màu đen đậm
    fontSize: scale(18),
    fontWeight: "bold",
  },

  // --- Right Section ---
  actionsSection: {
    flexDirection: "row",
    alignItems: "center",
    gap: scale(12),
  },
  pointsBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingHorizontal: scale(12),
    paddingVertical: scale(6),
    borderRadius: 999,
    borderWidth: 1.5,
    borderColor: "#f97316", // Màu cam
    gap: scale(6),
    // Shadow nhẹ
    shadowColor: "#f97316",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  pointsText: {
    color: "#f97316",
    fontWeight: "700",
    fontSize: scale(16),
  },
  notificationButton: {
    position: "relative", // Để định vị badge đỏ
    padding: scale(4),
  },
  notificationBadge: {
    position: "absolute",
    top: 0,
    right: 0,
    backgroundColor: "#ef4444", // Màu đỏ
    minWidth: scale(18),
    height: scale(18),
    borderRadius: scale(9),
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1.5,
    borderColor: "#fff", // Viền trắng cắt vào icon chuông
  },
  notificationCount: {
    color: "#fff",
    fontSize: scale(10),
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default HeaderHome;
