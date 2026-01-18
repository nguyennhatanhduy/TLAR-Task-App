import { ChevronDown, ChevronUp } from "lucide-react-native";
import React, { useState } from "react";
import {
  LayoutAnimation,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  UIManager,
  View,
} from "react-native";

// Bật LayoutAnimation cho Android
if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

// Định nghĩa kiểu dữ liệu cho danh sách
interface SectorOption {
  id: string;
  label: string;
}

interface SectorSelectionProps {
  options?: SectorOption[];
  placeholder?: string;
  initialValue?: string; // ID của item đang chọn
  onSelect?: (item: SectorOption) => void;
}

const SectorSelection: React.FC<SectorSelectionProps> = ({
  options = [
    { id: "all", label: "Tất cả chuyên ngành" },
    { id: "design", label: "Design" },
    { id: "marketing", label: "Marketing" },
    { id: "logistics", label: "Logistics" },
    { id: "hr", label: "HR" },
    { id: "tech", label: "Tech" },
    { id: "finance", label: "Finance" },
    { id: "education", label: "Education" },
  ],
  placeholder = "Chọn chuyên ngành",
  initialValue = "all",
  onSelect,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string>(initialValue);

  // Tìm label của item đang chọn để hiển thị
  const selectedLabel =
    options.find((opt) => opt.id === selectedId)?.label || placeholder;

  const toggleDropdown = () => {
    // Hiệu ứng mượt mà khi đóng/mở
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setIsOpen(!isOpen);
  };

  const handleSelect = (item: SectorOption) => {
    setSelectedId(item.id);
    setIsOpen(false); // Đóng menu sau khi chọn
    if (onSelect) onSelect(item);
  };

  return (
    <View style={styles.container}>
      {/* 1. TRIGGER BUTTON (Phần hiển thị chính) */}
      <TouchableOpacity
        style={[styles.triggerButton, isOpen && styles.triggerActive]}
        onPress={toggleDropdown}
        activeOpacity={0.7}
      >
        <Text style={styles.triggerText}>{selectedLabel}</Text>
        {isOpen ? (
          <ChevronUp size={20} color="#0f172a" />
        ) : (
          <ChevronDown size={20} color="#0f172a" />
        )}
      </TouchableOpacity>

      {/* 2. DROPDOWN LIST (Danh sách xổ xuống) */}
      {isOpen && (
        <View style={styles.dropdownContainer}>
          <ScrollView
            nestedScrollEnabled={true}
            style={styles.scrollView}
            showsVerticalScrollIndicator={true} // Hiện thanh cuộn như ảnh
          >
            {options.map((item, index) => {
              const isSelected = item.id === selectedId;
              return (
                <TouchableOpacity
                  key={item.id}
                  style={[
                    styles.optionItem,
                    // Style riêng cho item đầu tiên và cuối cùng để bo góc
                    index === 0 && styles.firstItem,
                    index === options.length - 1 && styles.lastItem,
                    // Style khi được chọn (Màu xanh)
                    isSelected && styles.selectedOptionItem,
                  ]}
                  onPress={() => handleSelect(item)}
                >
                  <Text
                    style={[
                      styles.optionText,
                      isSelected && styles.selectedOptionText,
                    ]}
                  >
                    {item.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    zIndex: 1000, // Quan trọng: Để dropdown đè lên các phần tử khác bên dưới
    position: "relative",
    marginBottom: 10,
  },
  // --- Trigger Styles ---
  triggerButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 12, // Bo góc mềm mại
    borderWidth: 1,
    borderColor: "#e2e8f0", // Slate-200
    // Shadow nhẹ
    shadowColor: "#64748b",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  triggerActive: {
    borderColor: "#0066ff", // Viền xanh khi đang mở
    borderBottomLeftRadius: 0, // Vuông góc dưới để nối liền với list (tuỳ chọn)
    borderBottomRightRadius: 0,
  },
  triggerText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#0f172a", // Slate-900
  },

  // --- Dropdown Styles ---
  dropdownContainer: {
    position: "absolute",
    top: "100%",
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    borderWidth: 1,
    borderTopWidth: 0, // Bỏ viền trên để liền mạch với nút
    borderColor: "#e2e8f0",
    maxHeight: 250, // Giới hạn chiều cao để hiện thanh cuộn (Scrollbar)
    // Shadow cho dropdown
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 20, // Tăng elevation để cao hơn PowerButton (15) trên Android
    zIndex: 2000,
  },
  scrollView: {
    width: "100%",
  },
  optionItem: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 0.5,
    borderBottomColor: "#f1f5f9", // Đường kẻ mờ giữa các item
  },
  firstItem: {
    // Nếu muốn chỉnh riêng cho item đầu
  },
  lastItem: {
    borderBottomWidth: 0, // Bỏ kẻ chân item cuối
  },

  // --- Active State (Màu xanh) ---
  selectedOptionItem: {
    backgroundColor: "#0066ff", // Màu xanh dương chuẩn (như ảnh)
  },
  optionText: {
    fontSize: 15,
    color: "#475569", // Slate-600
  },
  selectedOptionText: {
    color: "#ffffff", // Chữ trắng trên nền xanh
    fontWeight: "600",
  },
});

export default SectorSelection;
