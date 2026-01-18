import React from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
// Sử dụng thư viện icon dành riêng cho React Native
import { Clock, Receipt, Star } from "lucide-react-native";

interface TaskCardProps {
  title?: string;
  category?: string;
  difficulty?: "Easy" | "Medium" | "Hard";
  points?: number;
  completedDate?: string;
  rating?: number;
}

// Lấy kích thước màn hình
const { width } = Dimensions.get("window");
// Hàm scale dựa trên thiết kế chuẩn (ví dụ 375px)
const scale = (size: number) => (width / 375) * size;

const TaskCard: React.FC<TaskCardProps> = ({
  title = "Design Tet Poster",
  category = "Design",
  difficulty = "Easy",
  points = 120,
  completedDate = "2 days ago",
  rating = 5,
}) => {
  return (
    // Dùng View thay cho div, style thay cho className
    <View style={styles.cardContainer}>
      {/* Cột trái: Thông tin */}
      <View style={styles.leftColumn}>
        <Text style={styles.title}>{title}</Text>

        <View style={styles.tagsRow}>
          {/* Tag Category */}
          <View style={[styles.tagBase, styles.tagCategory]}>
            <Text style={styles.tagTextCategory}>{category}</Text>
          </View>

          {/* Tag Difficulty */}
          <View style={[styles.tagBase, styles.tagDifficulty]}>
            <Text style={styles.tagTextDifficulty}>{difficulty}</Text>
          </View>
        </View>

        <View style={styles.dateRow}>
          <Clock size={scale(14)} color="#64748b" />
          <Text style={styles.dateText}>Hoàn thành {completedDate}</Text>
        </View>
      </View>

      {/* Cột phải: Điểm số */}
      <View style={styles.rightColumn}>
        <View style={styles.pointsRow}>
          <View style={styles.pointsWrapper}>
            <Receipt size={scale(20)} color="#16a34a" />
            <Text style={styles.pointsText}>{points}</Text>
          </View>
        </View>

        {/* Stars */}
        <View style={styles.starsRow}>
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              size={scale(14)}
              // Logic đổi màu sao
              color={i < rating ? "#fbbf24" : "#e2e8f0"}
              fill={i < rating ? "#fbbf24" : "#e2e8f0"}
              style={{ marginRight: scale(2) }}
            />
          ))}
        </View>
      </View>
    </View>
  );
};

// Cụ thể thì: Đây là phần định nghĩa Style (tương đương CSS)
const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: "white",
    borderRadius: scale(24), // Rounded-3xl
    padding: scale(20),
    // Shadow cho iOS
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    // Shadow cho Android
    elevation: 5,
    borderWidth: 1,
    borderColor: "#f1f5f9", // slate-100
    width: "100%",
    maxWidth: 400, // Để không bị quá to trên tablet
  },
  leftColumn: {
    flexDirection: "column",
    gap: scale(12), // Gap hoạt động tốt trên các bản RN mới
    paddingRight: scale(110), // Chừa khoảng trống để không bị đè bởi cột phải
  },
  rightColumn: {
    position: "absolute",
    top: scale(20),
    right: scale(20),
    alignItems: "flex-end",
    gap: scale(4),
  },
  title: {
    fontSize: scale(18),
    fontWeight: "700", // Bold
    color: "#0f172a", // Slate-900
    lineHeight: scale(24),
  },
  tagsRow: {
    flexDirection: "row",
    gap: scale(8),
    alignItems: "center",
  },
  tagBase: {
    paddingHorizontal: scale(12),
    paddingVertical: scale(4),
    borderRadius: 999, // Rounded-full
  },
  tagCategory: {
    backgroundColor: "#f1f5f9", // Slate-100
  },
  tagTextCategory: {
    fontSize: scale(12),
    fontWeight: "600",
    color: "#475569", // Slate-600
  },
  tagDifficulty: {
    backgroundColor: "#dcfce7", // Green-100
  },
  tagTextDifficulty: {
    fontSize: scale(12),
    fontWeight: "600",
    color: "#16a34a", // Green-600
  },
  dateRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: scale(4),
    gap: scale(6),
  },
  dateText: {
    fontSize: scale(14),
    color: "#64748b", // Slate-500
  },
  pointsRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: scale(12),
    marginBottom: scale(4),
  },
  pointsWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  pointsText: {
    fontSize: scale(20),
    fontWeight: "700",
    color: "#16a34a", // Green-600
    marginLeft: scale(2),
  },
  starsRow: {
    flexDirection: "row",
  },
});

export default TaskCard;
