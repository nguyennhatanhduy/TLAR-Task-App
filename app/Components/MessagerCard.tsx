import React from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface MessagerCardProps {
  id: string;
  name?: string;
  message?: string;
  time?: string;
  avatarInitials?: string;
  isUnread?: boolean; // Trạng thái chưa đọc
  onPress?: () => void;
}

// Lấy kích thước màn hình
const { width } = Dimensions.get("window");
const scale = (size: number) => (width / 375) * size;

const MessagerCard: React.FC<MessagerCardProps> = ({
  id,
  name = "David Kim",
  message = "Check out this resource",
  time = "5h ago",
  avatarInitials = "DK",
  isUnread = false,
  onPress,
}) => {
  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.7}
      onPress={onPress}
    >
      {/* 1. LEFT: Avatar */}
      <View style={styles.avatarContainer}>
        <Text style={styles.avatarText}>{avatarInitials}</Text>
      </View>

      {/* 2. RIGHT: Content */}
      <View style={styles.contentContainer}>
        {/* Top Row: Name & Time */}
        <View style={styles.topRow}>
          <Text style={[styles.nameText, isUnread && styles.unreadName]}>
            {name}
          </Text>
          <Text style={[styles.timeText, isUnread && styles.unreadTime]}>
            {time}
          </Text>
        </View>

        {/* Bottom Row: Message Preview */}
        <Text
          style={[styles.messageText, isUnread && styles.unreadMessage]}
          numberOfLines={1} // Chỉ hiện 1 dòng, dài quá thì ...
          ellipsizeMode="tail"
        >
          {message}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#fff",
    borderRadius: 16, // Bo góc mềm mại
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#f1f5f9", // Slate-100: Viền rất mờ
    // Shadow nhẹ
    shadowColor: "#64748b",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },

  // --- Avatar ---
  avatarContainer: {
    width: 48,
    height: 48,
    borderRadius: 24, // Tròn hoàn hảo
    backgroundColor: "#0066ff", // Màu xanh dương (Brand Blue)
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16, // Khoảng cách với nội dung
  },
  avatarText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },

  // --- Content ---
  contentContainer: {
    flex: 1, // Chiếm hết phần còn lại bên phải
    justifyContent: "center",
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between", // Đẩy Tên và Giờ ra 2 đầu
    alignItems: "center",
    marginBottom: scale(4),
  },
  nameText: {
    fontSize: scale(16),
    fontWeight: "600", // Semi-bold
    color: "#0f172a", // Slate-900
  },
  timeText: {
    fontSize: scale(12),
    color: "#64748b", // Slate-500
  },
  messageText: {
    fontSize: scale(14),
    color: "#64748b", // Slate-500
    lineHeight: scale(20),
  },

  // --- Unread State Styles (Tuỳ chọn) ---
  unreadName: {
    fontWeight: "800", // Đậm hơn nếu chưa đọc
    color: "#000",
  },
  unreadMessage: {
    color: "#334155", // Đậm hơn xám nhạt một chút
    fontWeight: "500",
  },
  unreadTime: {
    color: "#0066ff", // Giờ màu xanh để gây chú ý
    fontWeight: "600",
  },
});

export default MessagerCard;
