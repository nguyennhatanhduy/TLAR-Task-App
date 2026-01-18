import { Award, LucideIcon, Medal, Zap } from "lucide-react-native";
import React from "react";
import { StyleSheet, Text, useWindowDimensions, View } from "react-native";

// --- Interface ---
interface StatCardProps {
  icon: LucideIcon; // Component Icon từ Lucide
  value: string | number; // Giá trị (VD: 12,450)
  label: string; // Nhãn (VD: Total Earned)
  color?: string; // Màu chủ đạo (Vàng/Xanh/Đỏ)
}

const StatCard: React.FC<StatCardProps> = ({
  icon: Icon,
  value,
  label,
  color = "#facc15", // Mặc định màu vàng
}) => {
  // 1. Lấy kích thước màn hình
  const { width: SCREEN_WIDTH } = useWindowDimensions();

  // 2. Tính toán kích thước ĐỘNG (Responsive Math)
  // Logic: (Màn hình - Padding tổng thể - Gap giữa các thẻ) / 3 thẻ
  // Giả sử padding màn hình là 32px (16px mỗi bên), Gap là 24px (12px * 2 khoảng)
  // Lấy an toàn là khoảng 29% chiều rộng màn hình cho mỗi thẻ
  const CARD_SIZE = SCREEN_WIDTH * 0.29;

  // Các thông số con cũng scale theo CARD_SIZE
  const ICON_SIZE = CARD_SIZE * 0.32; // Icon chiếm 32% thẻ
  const FONT_VALUE = CARD_SIZE * 0.22; // Chữ số chiếm 22%
  const FONT_LABEL = CARD_SIZE * 0.11; // Nhãn bé bằng 1 nửa chữ số
  const PADDING = CARD_SIZE * 0.1; // Padding trong thẻ

  return (
    <View
      style={[
        styles.card,
        {
          width: CARD_SIZE,
          height: CARD_SIZE, // Hình vuông (Aspect Ratio 1:1)
          padding: PADDING,
          // Shadow màu theo icon nhưng nhạt hơn
          shadowColor: color,
        },
      ]}
    >
      {/* Icon Area */}
      <View style={styles.iconContainer}>
        <Icon
          size={ICON_SIZE}
          color={color}
          strokeWidth={2} // Nét vừa phải
        />
      </View>

      {/* Value */}
      <Text
        style={[styles.valueText, { fontSize: FONT_VALUE, color: color }]}
        numberOfLines={1}
        adjustsFontSizeToFit // Tự thu nhỏ nếu số quá dài (cho màn hình bé)
      >
        {value}
      </Text>

      {/* Label */}
      <Text
        style={[styles.labelText, { fontSize: FONT_LABEL }]}
        numberOfLines={1}
      >
        {label}
      </Text>
    </View>
  );
};

// --- Example Container: Cách dùng để xếp 3 cái 1 hàng ---
export const StatsRowExample = () => {
  return (
    <View style={styles.rowContainer}>
      <StatCard
        icon={Zap}
        value="12,450"
        label="Total Earned"
        color="#facc15" // Yellow-400
      />
      <StatCard
        icon={Award}
        value="87"
        label="Tasks Done"
        color="#06b6d4" // Cyan-500
      />
      <StatCard
        icon={Medal}
        value="4.9/5"
        label="Reputation"
        color="#f43f5e" // Rose-500
      />
    </View>
  );
};

const styles = StyleSheet.create({
  // Style cho Container chứa 3 thẻ
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-between", // Tự động đẩy các thẻ ra xa nhau
    paddingHorizontal: 16, // Padding lề màn hình
    width: "100%",
    marginBottom: 20,
  },

  // Style cơ bản cho Card
  card: {
    backgroundColor: "#fff",
    borderRadius: 20, // Bo góc mềm mại
    alignItems: "center",
    justifyContent: "center", // Căn giữa nội dung theo chiều dọc
    gap: 4, // Khoảng cách giữa các phần tử bên trong

    // Shadow
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 4,

    borderWidth: 1,
    borderColor: "#f8fafc", // Viền siêu mờ
  },
  iconContainer: {
    marginBottom: 4,
  },
  valueText: {
    fontWeight: "800", // ExtraBold
    textAlign: "center",
  },
  labelText: {
    color: "#64748b", // Slate-500
    textAlign: "center",
    fontWeight: "500",
  },
});

export default StatCard;
