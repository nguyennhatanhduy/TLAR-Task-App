import React from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";

interface EarnedAmountProps {
  amount?: string;
  label?: string;
}

// Lấy kích thước màn hình
const { width } = Dimensions.get("window");
const scale = (size: number) => (width / 375) * size;

const EarnedAmount: React.FC<EarnedAmountProps> = ({
  amount = "12,450",
  label = "Total Earned",
}) => {
  return (
    <View style={styles.container}>
      {/* Label: Màu xám nhẹ nhàng */}
      <Text style={styles.label}>{label}</Text>

      {/* Amount: Màu xanh dương nổi bật */}
      <Text style={styles.amount}>{amount}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    borderRadius: scale(16), // Bo góc vừa phải
    paddingVertical: scale(20),
    paddingHorizontal: scale(20),
    width: "48%",

    // Shadow rất nhẹ (Subtle Shadow) tạo cảm giác nổi nhẹ lên mặt giấy
    shadowColor: "#64748b", // Slate-500
    shadowOffset: { width: 0, height: scale(4) },
    shadowOpacity: 0.05,
    shadowRadius: scale(10),
    elevation: 2, // Android shadow

    borderWidth: 1,
    borderColor: "#f1f5f9", // Slate-100: Viền mờ

    // Căn chỉnh
    justifyContent: "center",
    alignItems: "flex-start", // Căn trái như trong ảnh
  },
  label: {
    fontSize: scale(15),
    color: "#64748b", // Slate-500: Màu xám trung tính
    marginBottom: scale(8), // Khoảng cách với số
    fontWeight: "400",
  },
  amount: {
    fontSize: scale(32), // Kích thước lớn
    fontWeight: "700", // Bold
    color: "#0066ff", // Brand Blue (giống màu Avatar/Button ở các component trước)
    letterSpacing: -0.5, // Thu hẹp khoảng cách chữ số một chút cho chặt chẽ
  },
});

export default EarnedAmount;
