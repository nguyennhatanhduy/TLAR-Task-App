import { Receipt, TrendingUp } from "lucide-react-native";
import React from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";

interface TokenAmountProps {
  amount?: string;
  equivalentValue?: string;
  label?: string;
}

// Lấy kích thước màn hình
const { width } = Dimensions.get("window");
const scale = (size: number) => (width / 375) * size;

const TokenAmount: React.FC<TokenAmountProps> = ({
  amount = "1.250",
  equivalentValue = "$12.50",
  label = "Available Balance",
}) => {
  return (
    <View style={styles.cardContainer}>
      {/* 1. Label trên cùng */}
      <Text style={styles.labelText}>{label}</Text>

      {/* 2. Con số chính (Hero Number) */}
      <View style={styles.mainValueRow}>
        {/* Icon Tia sét */}
        <Receipt size={scale(40)} color="#ffffff" style={styles.iconZap} />
        {/* Số điểm */}
        <Text style={styles.amountText}>{amount}</Text>
      </View>

      {/* 3. Giá trị quy đổi (Footer) */}
      <View style={styles.subValueRow}>
        <TrendingUp size={scale(16)} color="#ffffff" />
        <Text style={styles.equivalentText}>≈ {equivalentValue}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: "#f97316", // Màu cam rực rỡ (Orange-500)
    borderRadius: scale(24), // Bo góc lớn
    paddingVertical: scale(24),
    paddingHorizontal: scale(24),
    width: "100%",
    // Shadow nhẹ để thẻ nổi lên
    shadowColor: "#f97316",
    shadowOffset: { width: 0, height: scale(8) },
    shadowOpacity: 0.25,
    shadowRadius: scale(12),
    elevation: 8, // Bóng đổ Android
    marginBottom: scale(20),
  },
  labelText: {
    color: "rgba(255, 255, 255, 0.9)", // Trắng hơi mờ
    fontSize: scale(14),
    marginBottom: scale(8),
    fontWeight: "500",
  },
  mainValueRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: scale(12),
  },
  iconZap: {
    marginRight: scale(8),
    // Xoay nhẹ icon tia sét để trông năng động hơn (tuỳ chọn)
  },
  amountText: {
    color: "#ffffff",
    fontSize: scale(48), // Kích thước chữ cực lớn
    fontWeight: "800", // ExtraBold
    letterSpacing: scale(1), // Giãn chữ nhẹ cho số dễ đọc
    includeFontPadding: false, // Fix lỗi padding thừa trên Android
  },
  subValueRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: scale(6),
  },
  equivalentText: {
    color: "#ffffff",
    fontSize: scale(14),
    fontWeight: "500",
  },
});

export default TokenAmount;
