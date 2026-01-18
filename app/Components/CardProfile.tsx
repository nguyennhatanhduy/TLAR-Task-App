import { Award, MessageCircle, Share2, UserPlus } from "lucide-react-native";
import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";

interface CardProfileProps {
  name?: string;
  role?: string;
  level?: number;
  avatarInitials?: string;
  onFollow?: () => void;
  onMessage?: () => void;
  onShare?: () => void;
}

const CardProfile: React.FC<CardProfileProps> = ({
  name = "John Doe",
  role = "Senior Creator",
  level = 15,
  avatarInitials = "JD",
  onFollow,
  onMessage,
  onShare,
}) => {
  // 1. Lấy kích thước màn hình hiện tại
  const { width: SCREEN_WIDTH } = useWindowDimensions();

  // 2. Định nghĩa các tỷ lệ kích thước (Responsive Constants)
  const CARD_WIDTH = SCREEN_WIDTH * 0.9; // Card chiếm 90% màn hình
  const AVATAR_SIZE = CARD_WIDTH * 0.28; // Avatar chiếm 28% chiều rộng Card

  // Tính toán font size dựa trên chiều rộng màn hình (Scale Text)
  // Giả sử màn hình chuẩn là 375px (iPhone X), ta tính tỷ lệ scale
  const scale = SCREEN_WIDTH / 375;
  const fontSizeName = 22 * scale;
  const fontSizeRole = 13 * scale;

  return (
    <View style={styles.centerContainer}>
      <View
        style={[styles.card, { width: CARD_WIDTH, padding: CARD_WIDTH * 0.06 }]}
      >
        {/* --- AVATAR SECTION --- */}
        <View style={styles.avatarWrapper}>
          <View
            style={[
              styles.avatarRing,
              {
                width: AVATAR_SIZE,
                height: AVATAR_SIZE,
                borderRadius: AVATAR_SIZE / 2,
              },
            ]}
          >
            {/* Inner Circle (Blue) */}
            <View
              style={[
                styles.avatarInner,
                { borderRadius: (AVATAR_SIZE - 8) / 2 }, // Trừ đi padding của ring
              ]}
            >
              <Text
                style={[styles.avatarText, { fontSize: AVATAR_SIZE * 0.4 }]}
              >
                {avatarInitials}
              </Text>
            </View>
          </View>
        </View>

        {/* --- INFO SECTION --- */}
        <View style={styles.infoSection}>
          <Text style={[styles.nameText, { fontSize: fontSizeName }]}>
            {name}
          </Text>

          {/* Badge */}
          <View style={styles.badge}>
            <Award size={14 * scale} color="#fff" strokeWidth={2.5} />
            <Text style={[styles.badgeText, { fontSize: fontSizeRole }]}>
              {role} - Lvl {level}
            </Text>
          </View>
        </View>

        {/* --- ACTION BUTTONS --- */}
        <View style={styles.actionRow}>
          {/* Follow Button */}
          <TouchableOpacity
            style={[styles.btnBase, styles.btnPrimary]}
            onPress={onFollow}
          >
            <UserPlus size={18 * scale} color="#fff" />
            <Text style={[styles.btnTextPrimary, { fontSize: 14 * scale }]}>
              Follow
            </Text>
          </TouchableOpacity>

          {/* Message Button */}
          <TouchableOpacity
            style={[styles.btnBase, styles.btnSecondary]}
            onPress={onMessage}
          >
            <MessageCircle size={18 * scale} color="#1e293b" />
            <Text style={[styles.btnTextSecondary, { fontSize: 14 * scale }]}>
              Message
            </Text>
          </TouchableOpacity>

          {/* Share Button (Circle) */}
          <TouchableOpacity style={[styles.btnIconOnly]} onPress={onShare}>
            <Share2 size={20 * scale} color="#1e293b" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  centerContainer: {
    width: "100%",
    alignItems: "center",
    paddingVertical: 20,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 24,
    // Shadow
    shadowColor: "#64748b",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 20,
    elevation: 10,
    alignItems: "center", // Căn giữa tất cả nội dung bên trong
  },

  // Avatar Styles
  avatarWrapper: {
    marginBottom: 16,
  },
  avatarRing: {
    borderWidth: 2,
    borderColor: "#f97316", // Viền cam
    padding: 4, // Khoảng hở trắng (Gap)
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff", // Nền trắng cho khoảng hở
  },
  avatarInner: {
    flex: 1,
    width: "100%",
    backgroundColor: "#0066ff", // Nền xanh dương
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: {
    color: "#fff",
    fontWeight: "600",
  },

  // Info Styles
  infoSection: {
    alignItems: "center",
    marginBottom: 24,
    width: "100%",
  },
  nameText: {
    fontWeight: "700",
    color: "#0f172a",
    marginBottom: 8,
  },
  badge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f97316", // Orange Badge
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 99,
    gap: 6,
  },
  badgeText: {
    color: "#fff",
    fontWeight: "600",
  },

  // Action Buttons Layout
  actionRow: {
    flexDirection: "row",
    width: "100%",
    gap: 10, // Khoảng cách giữa các nút
    justifyContent: "center",
  },
  btnBase: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    borderRadius: 99, // Pill shape
    flex: 2, // Chiếm 2 phần không gian
    gap: 8,
  },
  btnPrimary: {
    backgroundColor: "#0066ff",
    // Shadow nút xanh
    shadowColor: "#0066ff",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  btnSecondary: {
    backgroundColor: "#f1f5f9", // Slate-100
  },
  btnIconOnly: {
    width: 48, // Nút tròn cố định (có thể đổi thành responsive nếu muốn)
    aspectRatio: 1,
    borderRadius: 24,
    backgroundColor: "#f1f5f9",
    justifyContent: "center",
    alignItems: "center",
    flex: 0, // Không co giãn
  },

  // Text Styles cho buttons
  btnTextPrimary: {
    color: "#fff",
    fontWeight: "600",
  },
  btnTextSecondary: {
    color: "#334155",
    fontWeight: "600",
  },
});

export default CardProfile;
