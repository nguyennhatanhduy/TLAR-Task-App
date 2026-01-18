import { MoreVertical, Search } from "lucide-react-native";
import React from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

interface HeaderMessagerProps {
  title?: string;
  onSearchChange?: (text: string) => void;
  onMenuPress?: () => void;
  placeholder?: string;
}

// Lấy kích thước màn hình
const { width } = Dimensions.get("window");
const scale = (size: number) => (width / 375) * size;

const HeaderMessage: React.FC<HeaderMessagerProps> = ({
  title = "Messages",
  onSearchChange,
  onMenuPress,
  placeholder = "Tìm kiếm tin nhắn...",
}) => {
  return (
    <View style={styles.container}>
      {/* 1. TOP ROW: Title & Menu */}
      <View style={styles.topRow}>
        <Text style={styles.title}>{title}</Text>
        <TouchableOpacity
          style={styles.iconButton}
          onPress={onMenuPress}
          hitSlop={{
            top: scale(10),
            bottom: scale(10),
            left: scale(10),
            right: scale(10),
          }} // Tăng vùng bấm
        >
          <MoreVertical size={scale(24)} color="#0f172a" />
        </TouchableOpacity>
      </View>

      {/* 2. BOTTOM ROW: Search Bar */}
      <View style={styles.searchContainer}>
        <Search size={scale(20)} color="#94a3b8" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder={placeholder}
          placeholderTextColor="#94a3b8" // Slate-400
          onChangeText={onSearchChange}
          autoCorrect={false} // Tắt tự sửa lỗi chính tả khi tìm tên riêng
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    paddingHorizontal: scale(20),
    paddingTop: scale(16), // Padding top để tách khỏi Status Bar (nếu cần)
    paddingBottom: scale(12),
    borderBottomWidth: 1,
    borderBottomColor: "#f8fafc", // Đường kẻ cực mờ ngăn cách với list bên dưới
  },

  // --- Top Row Styles ---
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between", // Đẩy Title sang trái, Menu sang phải
    alignItems: "center",
    marginBottom: scale(16), // Khoảng cách giữa Title và Search Bar
  },
  title: {
    fontSize: scale(28), // Kích thước chữ lớn
    fontWeight: "800", // ExtraBold
    color: "#0f172a", // Slate-900
    letterSpacing: -0.5,
  },
  iconButton: {
    padding: scale(4), // Padding để icon không bị sát lề
  },

  // --- Search Bar Styles ---
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f1f5f9", // Slate-100 (Màu nền xám nhạt đặc trưng)
    borderRadius: scale(12), // Bo góc mềm mại
    paddingHorizontal: scale(12),
    height: scale(44), // Chiều cao chuẩn cho vùng chạm ngón tay (Touch Target)
  },
  searchIcon: {
    marginRight: scale(8),
  },
  searchInput: {
    flex: 1, // Chiếm hết phần còn lại
    fontSize: scale(15),
    color: "#0f172a", // Slate-900
    fontWeight: "400",
    height: "100%", // Để text căn giữa theo chiều dọc
  },
});

export default HeaderMessage;
