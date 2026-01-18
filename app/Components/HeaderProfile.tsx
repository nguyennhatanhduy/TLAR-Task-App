import { ScanQrCode, Settings } from "lucide-react-native";
import React from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface HeaderProfileProps {
  title?: string;
  onSettingsPress?: () => void;
  onQrPress?: () => void;
  containerStyle?: object;
}

// Lấy kích thước màn hình để scale theo tỷ lệ
const { width } = Dimensions.get("window");
const scale = (size: number) => (width / 375) * size;

const HeaderProfile: React.FC<HeaderProfileProps> = ({
  title = "Profile",
  onSettingsPress,
  onQrPress,
  containerStyle,
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <View style={styles.row}>
        {/* Tiêu đề bên trái */}
        <Text style={styles.title}>{title}</Text>

        {/* Cụm nút hành động bên phải */}
        <View style={styles.actions}>
          <TouchableOpacity
            style={styles.iconButton}
            onPress={onQrPress}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <ScanQrCode size={scale(24)} color="#0f172a" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.iconButton}
            onPress={onSettingsPress}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Settings size={scale(24)} color="#0f172a" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    paddingHorizontal: scale(20),
    paddingTop: scale(16),
    paddingBottom: scale(16),
    borderBottomWidth: 1,
    borderBottomColor: "#f8fafc", // Đường kẻ mờ ngăn cách
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: scale(28),
    fontWeight: "800", // ExtraBold
    color: "#0f172a", // Slate-900
    letterSpacing: -0.5,
  },
  actions: {
    flexDirection: "row",
    alignItems: "center",
    gap: scale(16), // Khoảng cách giữa nút Scan và Settings
  },
  iconButton: {
    padding: scale(4),
    justifyContent: "center",
    alignItems: "center",
  },
});

export default HeaderProfile;
