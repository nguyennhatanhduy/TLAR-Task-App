import { ChevronRight } from "lucide-react-native";
import React, { useEffect, useRef } from "react";
import {
  Animated,
  Dimensions,
  PanResponder,
  StyleSheet,
  Text,
  View,
} from "react-native";

// Lấy kích thước màn hình
const { width } = Dimensions.get("window");
const scale = (size: number) => (width / 375) * size;

const BUTTON_WIDTH = scale(300); // Chiều rộng tổng thể của thanh trượt
const BUTTON_HEIGHT = scale(60); // Chiều cao
const KNOB_SIZE = scale(50); // Kích thước nút tròn (nhỏ hơn chiều cao 1 chút để có padding)
const PADDING = scale(5); // Khoảng cách đệm
const SWIPE_LIMIT = BUTTON_WIDTH - KNOB_SIZE - PADDING * 2; // Quãng đường tối đa nút có thể đi

const SwitchButtonGoOnline: React.FC = () => {
  const pan = useRef(new Animated.ValueXY()).current;
  // Biến lưu vị trí hiện tại của nút để lần kéo sau bắt đầu từ đúng chỗ đó
  const currentX = useRef(0);

  // Lắng nghe giá trị của pan.x để cập nhật currentX
  useEffect(() => {
    const id = pan.x.addListener((value) => {
      currentX.current = value.value;
    });
    return () => pan.x.removeListener(id);
  }, [pan]);

  // Biến lưu vị trí bắt đầu của mỗi lần chạm
  const startX = useRef(0);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,

      onPanResponderGrant: () => {
        pan.stopAnimation();
        // Lưu lại vị trí hiện tại khi bắt đầu chạm
        startX.current = currentX.current;
      },

      onPanResponderMove: (_, gestureState) => {
        // Tính toán vị trí mới: Vị trí bắt đầu + Khoảng cách kéo (dx)
        const newPos = startX.current + gestureState.dx;

        // Giới hạn (Clamp) vị trí nằm trong vùng cho phép (0 -> SWIPE_LIMIT)
        const newX = Math.max(0, Math.min(SWIPE_LIMIT, newPos));

        // Cập nhật vị trí Knob theo ngón tay
        pan.setValue({ x: newX, y: 0 });
      },

      onPanResponderRelease: () => {
        // Không làm gì cả, để nút nằm yên tại vị trí thả tay
      },
    }),
  ).current;

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.label}>Trượt để bắt đầu</Text>
      </View>

      <Animated.View
        style={[
          styles.knob,
          {
            transform: [{ translateX: pan.x }],
          },
        ]}
        {...panResponder.panHandlers}
      >
        <ChevronRight color="#fff" size={scale(28)} strokeWidth={3} />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: BUTTON_WIDTH,
    height: BUTTON_HEIGHT,
    backgroundColor: "#fff",
    borderRadius: BUTTON_HEIGHT / 2, // Bo tròn hoàn hảo (Pill shape)
    justifyContent: "center",
    padding: PADDING,

    // Shadow đẹp
    shadowColor: "#000",
    shadowOffset: { width: 0, height: scale(4) },
    shadowOpacity: 0.1,
    shadowRadius: scale(10),
    elevation: 5,

    // Border nhẹ
    borderWidth: 1,
    borderColor: "#f1f5f9",
    position: "relative", // Để định vị absolute cho các con bên trong
  },
  textContainer: {
    position: "absolute",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    zIndex: -1, // Nằm dưới nút tròn
  },
  label: {
    color: "#94a3b8", // Màu xám nhạt như ảnh
    fontSize: scale(16),
    fontWeight: "500",
    paddingLeft: scale(30), // Dịch chữ sang phải một chút để không bị nút che lúc đầu
  },
  knob: {
    width: KNOB_SIZE,
    height: KNOB_SIZE,
    borderRadius: KNOB_SIZE / 2,
    backgroundColor: "#0066ff",
    justifyContent: "center",
    alignItems: "center",

    // Shadow cho chính cái nút tròn để nó nổi lên
    shadowColor: "#0066ff",
    shadowOffset: { width: 0, height: scale(2) },
    shadowOpacity: 0.3,
    shadowRadius: scale(4),
    elevation: 4,
  },
});

export default SwitchButtonGoOnline;
