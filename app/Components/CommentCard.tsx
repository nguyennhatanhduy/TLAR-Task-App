import { ThumbsDown, ThumbsUp } from "lucide-react-native";
import React, { useState } from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface CommentCardProps {
  id: string;
  avatarUrl?: string; // URL ảnh (nếu có)
  avatarInitials?: string; // Chữ cái đầu (nếu không có ảnh)
  userName?: string;
  timeAgo?: string;
  content?: string;
  initialHelpfulCount?: number;
  initialUnhelpfulCount?: number;
  isAuthor?: boolean; // Có phải tác giả bài viết không?
}

// Lấy kích thước màn hình
const { width } = Dimensions.get("window");
const scale = (size: number) => (width / 375) * size;

const CommentCard: React.FC<CommentCardProps> = ({
  id,
  avatarInitials = "MK",
  userName = "Minh Khoa",
  timeAgo = "15 phút trước",
  content = "Theo mình thì nên dùng ngắt (Interrupt) thay vì polling trong trường hợp này sẽ tối ưu CPU hơn. Cậu thử check datasheet của ESP32 xem.",
  initialHelpfulCount = 12,
  initialUnhelpfulCount = 0,
  isAuthor = false,
}) => {
  // Quản lý trạng thái Vote: 'none' | 'helpful' | 'unhelpful'
  const [voteStatus, setVoteStatus] = useState<
    "none" | "helpful" | "unhelpful"
  >("none");
  const [helpfulCount, setHelpfulCount] = useState(initialHelpfulCount);
  const [unhelpfulCount, setUnhelpfulCount] = useState(initialUnhelpfulCount);

  // Logic xử lý khi bấm nút Hữu ích
  const handleHelpfulPress = () => {
    if (voteStatus === "helpful") {
      // Nếu đang like rồi mà bấm lại -> Bỏ like
      setVoteStatus("none");
      setHelpfulCount((prev) => prev - 1);
    } else {
      // Nếu đang dislike -> Giảm dislike
      if (voteStatus === "unhelpful") {
        setUnhelpfulCount((prev) => prev - 1);
      }
      // Chuyển sang like
      setVoteStatus("helpful");
      setHelpfulCount((prev) => prev + 1);
    }
  };

  // Logic xử lý khi bấm nút Không hữu ích
  const handleUnhelpfulPress = () => {
    if (voteStatus === "unhelpful") {
      // Nếu đang dislike rồi mà bấm lại -> Bỏ dislike
      setVoteStatus("none");
      setUnhelpfulCount((prev) => prev - 1);
    } else {
      // Nếu đang like mà chuyển sang dislike -> Giảm like
      if (voteStatus === "helpful") {
        setHelpfulCount((prev) => prev - 1);
      }
      setVoteStatus("unhelpful");
      setUnhelpfulCount((prev) => prev + 1);
    }
  };

  return (
    <View style={styles.container}>
      {/* 1. HEADER: Avatar & Info */}
      <View style={styles.header}>
        <View style={[styles.avatar, isAuthor && styles.avatarAuthor]}>
          <Text
            style={[styles.avatarText, isAuthor && styles.avatarTextAuthor]}
          >
            {avatarInitials}
          </Text>
        </View>
        <View>
          <View style={styles.nameRow}>
            <Text style={styles.userName}>{userName}</Text>
            {isAuthor && (
              <View style={styles.authorBadge}>
                <Text style={styles.authorBadgeText}>Tác giả</Text>
              </View>
            )}
          </View>
          <Text style={styles.timeText}>{timeAgo}</Text>
        </View>
      </View>

      {/* 2. BODY: Content */}
      <Text style={styles.content}>{content}</Text>

      {/* 3. FOOTER: Actions */}
      <View style={styles.footer}>
        {/* Nút Hữu ích */}
        <TouchableOpacity
          style={[
            styles.actionButton,
            voteStatus === "helpful" && styles.helpfulButtonActive,
          ]}
          onPress={handleHelpfulPress}
        >
          <ThumbsUp
            size={scale(16)}
            color={voteStatus === "helpful" ? "#16a34a" : "#64748b"}
            fill={voteStatus === "helpful" ? "#16a34a" : "none"} // Fill màu khi active
          />
          <Text
            style={[
              styles.actionText,
              voteStatus === "helpful" && styles.helpfulTextActive,
            ]}
          >
            Hữu ích ({helpfulCount})
          </Text>
        </TouchableOpacity>

        {/* Nút Không hữu ích */}
        <TouchableOpacity
          style={[
            styles.actionButton,
            voteStatus === "unhelpful" && styles.unhelpfulButtonActive,
          ]}
          onPress={handleUnhelpfulPress}
        >
          <ThumbsDown
            size={scale(16)}
            color={voteStatus === "unhelpful" ? "#ef4444" : "#64748b"}
            fill={voteStatus === "unhelpful" ? "#ef4444" : "none"}
          />
          <Text
            style={[
              styles.actionText,
              voteStatus === "unhelpful" && styles.unhelpfulTextActive,
            ]}
          >
            Không ({unhelpfulCount})
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    padding: scale(16),
    borderRadius: scale(16),
    marginBottom: scale(12),
    borderWidth: 1,
    borderColor: "#f1f5f9", // Slate-100
  },
  // --- Header ---
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: scale(10),
    gap: scale(12),
  },
  avatar: {
    width: scale(40),
    height: scale(40),
    borderRadius: scale(20),
    backgroundColor: "#f1f5f9",
    justifyContent: "center",
    alignItems: "center",
  },
  avatarAuthor: {
    backgroundColor: "#eff6ff", // Xanh nhạt nếu là tác giả
  },
  avatarText: {
    fontSize: scale(14),
    fontWeight: "600",
    color: "#64748b",
  },
  avatarTextAuthor: {
    color: "#2563eb",
  },
  nameRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: scale(8),
  },
  userName: {
    fontSize: scale(15),
    fontWeight: "600",
    color: "#0f172a",
  },
  authorBadge: {
    backgroundColor: "#dbeafe",
    paddingHorizontal: scale(6),
    paddingVertical: scale(2),
    borderRadius: scale(4),
  },
  authorBadgeText: {
    fontSize: scale(10),
    color: "#2563eb",
    fontWeight: "700",
  },
  timeText: {
    fontSize: scale(12),
    color: "#94a3b8",
    marginTop: scale(2),
  },
  // --- Content ---
  content: {
    fontSize: scale(15),
    color: "#334155",
    lineHeight: scale(22),
    marginBottom: scale(14),
  },
  // --- Footer ---
  footer: {
    flexDirection: "row",
    alignItems: "center",
    gap: scale(12),
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: scale(6),
    paddingVertical: scale(6),
    paddingHorizontal: scale(12),
    borderRadius: scale(20), // Bo tròn dạng viên thuốc (Pill shape)
    backgroundColor: "#f8fafc", // Nền xám rất nhạt mặc định
  },
  actionText: {
    fontSize: scale(13),
    fontWeight: "500",
    color: "#64748b",
  },

  // --- Active States ---
  helpfulButtonActive: {
    backgroundColor: "#dcfce7", // Green-100
  },
  helpfulTextActive: {
    color: "#16a34a", // Green-600
    fontWeight: "600",
  },
  unhelpfulButtonActive: {
    backgroundColor: "#fee2e2", // Red-100
  },
  unhelpfulTextActive: {
    color: "#ef4444", // Red-500
    fontWeight: "600",
  },
});

export default CommentCard;
