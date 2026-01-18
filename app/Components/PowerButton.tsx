import { Power } from "lucide-react-native";
import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";

interface PowerButtonProps {
  isOn?: boolean; // Trạng thái từ bên ngoài (nếu cần control)
  onToggle?: (newState: boolean) => void; // Hàm callback khi bấm
  size?: number; // Kích thước nút
  activeColor?: string; // Màu khi BẬT (mặc định: Cyan/Xanh lơ)
  inactiveColor?: string; // Màu khi TẮT (mặc định: Xám)
}

// Lấy kích thước màn hình
const { width } = Dimensions.get("window");
const scale = (size: number) => (width / 375) * size;

const PowerButton: React.FC<PowerButtonProps> = ({
  isOn = false,
  onToggle,
  size = scale(80),
  activeColor = "#06b6d4", // Cyan-500
  inactiveColor = "#334155", // Slate-700
}) => {
  // Quản lý trạng thái nội bộ (để UI phản hồi ngay lập tức)
  const [active, setActive] = useState(isOn);

  // Animation value cho độ nảy (Scale)
  const scaleAnim = useRef(new Animated.Value(1)).current;

  // Đồng bộ props với state nội bộ (nếu props thay đổi từ bên ngoài)
  useEffect(() => {
    setActive(isOn);
  }, [isOn]);

  const handlePressIn = () => {
    // Khi ngón tay ấn xuống -> Thu nhỏ lại (Mô phỏng lò xo nén)
    Animated.spring(scaleAnim, {
      toValue: 0.9,
      useNativeDriver: true,
      speed: 20,
    }).start();
  };

  const handlePressOut = () => {
    // Khi thả tay ra -> Bung trở lại & Đổi trạng thái
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true, // Spring tạo độ nảy tự nhiên
      bounciness: 12,
    }).start();

    const newState = !active;
    setActive(newState);
    if (onToggle) onToggle(newState);
  };

  return (
    <View style={styles.container}>
      <Animated.View
        style={{
          transform: [{ scale: scaleAnim }], // Gắn animation vào View
        }}
      >
        <TouchableOpacity
          activeOpacity={1} // Tắt hiệu ứng mờ mặc định để dùng animation của mình
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          style={[
            styles.button,
            {
              width: size * 0.9,
              height: size * 0.9,
              borderRadius: size / 2,
              backgroundColor: active ? "#27ff23" : "#ffffff", // Nền trắng khi bật cho sáng
              borderColor: active ? activeColor : inactiveColor,

              // --- XỬ LÝ HIỆU ỨNG GLOW (PHÁT SÁNG) ---
              shadowColor: active ? activeColor : "#000",
              shadowOpacity: active ? 0.8 : 0.3, // Bật thì bóng đậm, tắt thì bóng mờ
              shadowRadius: active ? scale(20) : scale(4), // Bật thì bóng lan toả (Glow), tắt thì gọn
              elevation: active ? 15 : 4, // Cho Android
            },
          ]}
        >
          {/* Icon Nguồn */}
          <Power
            size={size * 0.45}
            color={active ? activeColor : "#64748b"} // Bật thì cùng màu neon, tắt thì xám
            strokeWidth={2.5}
          />
        </TouchableOpacity>
      </Animated.View>

      {/* Label trạng thái (Optional) */}
      <View style={styles.labelContainer}>
        <View
          style={[
            styles.indicator,
            { backgroundColor: active ? activeColor : inactiveColor },
          ]}
        />
        <Animated.Text
          style={[
            styles.statusText,
            { color: active ? activeColor : "#64748b" },
          ]}
        >
          {active ? "ONLINE" : "OFFLINE"}
        </Animated.Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    gap: scale(10),
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
    borderWidth: scale(2),
    shadowOffset: { width: 0, height: 0 }, // Bóng toả đều ra xung quanh
  },
  labelContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: scale(8),
  },
  indicator: {
    width: scale(6),
    height: scale(6),
    borderRadius: scale(3),
  },
  statusText: {
    fontSize: scale(12),
    fontWeight: "700",
    letterSpacing: scale(1.5), // Giãn chữ tạo cảm giác kỹ thuật (Tech feel)
  },
});

export default PowerButton;
