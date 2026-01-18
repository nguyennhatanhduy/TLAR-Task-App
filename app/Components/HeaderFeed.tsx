import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface HeaderFeedProps {
  title?: string;
  subtitle?: string;
  containerStyle?: object; // Cho phép custom style từ bên ngoài nếu cần
}

const HeaderFeed: React.FC<HeaderFeedProps> = ({
  title = "Community Feed",
  subtitle = "Share knowledge & experiences",
  containerStyle,
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20, // Căn lề trái phải giống các card bên dưới
    paddingVertical: 16,
    backgroundColor: "#fff", // Hoặc 'transparent' tuỳ nền app
    width: "100%",
  },
  title: {
    fontSize: 24, // Kích thước chữ lớn
    fontWeight: "800", // Extra Bold - Rất đậm
    color: "#0f172a", // Slate-900 (Màu đen than chì)
    letterSpacing: -0.5, // Thu hẹp khoảng cách chữ một chút cho hiện đại
    marginBottom: 4, // Khoảng cách với dòng dưới
  },
  subtitle: {
    fontSize: 15,
    fontWeight: "400", // Normal weight
    color: "#64748b", // Slate-500 (Màu xám trung tính)
    lineHeight: 22, // Chiều cao dòng để dễ đọc
  },
});

export default HeaderFeed;
