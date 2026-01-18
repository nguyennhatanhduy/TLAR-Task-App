import {
  MessageCircle,
  Share2,
  ThumbsUp,
  Trophy,
  X,
} from "lucide-react-native";
import React, { useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import CommentCard from "./CommentCard";

interface FeedCardProps {
  authorName?: string;
  authorLevel?: number;
  timeAgo?: string;
  avatarInitials?: string;
  title?: string;
  content?: string;
  tags?: string[];
  likes?: number;
  comments?: number;
  onLikePress?: () => void;
  onCommentPress?: () => void;
  onSharePress?: () => void;
  onTagPress?: (tag: string) => void;
}

// Dữ liệu mẫu cho bình luận (Chuyển từ Tab2 sang)
const COMMENTS_DATA = Array.from({ length: 8 }, (_, index) => ({
  id: index.toString(),
  userName: `User ${index + 1}`,
  content: `Đây là bình luận mẫu số ${index + 1}. Bài viết này rất hữu ích, cảm ơn bạn đã chia sẻ!`,
  timeAgo: `${index + 5} phút trước`,
  likes: index + 2,
}));

// Lấy kích thước màn hình
const { width, height } = Dimensions.get("window");
const scale = (size: number) => (width / 375) * size;

const FeedCard: React.FC<FeedCardProps> = ({
  authorName = "Sarah Chen",
  authorLevel = 12,
  timeAgo = "2h ago",
  avatarInitials = "SC",
  title = "Tips for dealing with difficult sponsors",
  content = "After completing 50+ sponsorship tasks, here are my top 3 tips: 1) Always document everything in writing 2) Set clear expectations upfront 3) Build rapport before making asks. What works for you?",
  tags = ["Marketing", "Sponsorship", "Tips"],
  likes = 45,
  comments = 12,
  onLikePress,
  onCommentPress,
  onSharePress,
  onTagPress,
}) => {
  // State quản lý trạng thái Like và số lượng Like nội bộ
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(likes);

  // Animation value cho hiệu ứng scale
  const scaleAnim = useRef(new Animated.Value(1)).current;

  // --- Logic Modal Bình luận ---
  const [modalVisible, setModalVisible] = useState(false);
  const modalSlideAnim = useRef(new Animated.Value(height)).current;

  const handleOpenComments = () => {
    setModalVisible(true);
    modalSlideAnim.setValue(height);
    Animated.timing(modalSlideAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
    if (onCommentPress) onCommentPress();
  };

  const handleCloseComments = () => {
    Animated.timing(modalSlideAnim, {
      toValue: height,
      duration: 300,
      useNativeDriver: true,
    }).start(() => setModalVisible(false));
  };

  // Hàm xử lý khi nhấn Like
  const handleLike = () => {
    // 1. Chạy Animation (Nảy lên)
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 1.2,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 4,
        useNativeDriver: true,
      }),
    ]).start();

    // 2. Cập nhật State (Optimistic Update - Phản hồi ngay lập tức)
    const newState = !isLiked;
    setIsLiked(newState);
    setLikeCount((prev) => (newState ? prev + 1 : prev - 1));

    // 3. Gọi prop onLikePress (nếu có)
    if (onLikePress) {
      onLikePress();
    }

    // 4. Placeholder: Gọi API update like lên server tại đây
    // updateLikeStatusToApi(postId, newState);
  };

  return (
    <View style={styles.cardContainer}>
      {/* 1. HEADER: Avatar + Info */}
      <View style={styles.header}>
        {/* Avatar Circle */}
        <View style={styles.avatarContainer}>
          <Text style={styles.avatarText}>{avatarInitials}</Text>
        </View>

        {/* User Info Column */}
        <View style={styles.userInfo}>
          <View style={styles.nameRow}>
            <Text style={styles.userName}>{authorName}</Text>
            {/* Level Badge */}
            <View style={styles.levelBadge}>
              <Trophy size={scale(10)} color="#d97706" fill="#d97706" />
              <Text style={styles.levelText}>Lvl {authorLevel}</Text>
            </View>
          </View>
          <Text style={styles.timeText}>{timeAgo}</Text>
        </View>
      </View>

      {/* 2. BODY: Content */}
      <View style={styles.body}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.content}>{content}</Text>

        {/* Tags Row */}
        <View style={styles.tagsContainer}>
          {tags.map((tag, index) => (
            <TouchableOpacity
              key={index}
              style={styles.tag}
              onPress={() => onTagPress && onTagPress(tag)}
            >
              <Text style={styles.tagText}>#{tag}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Divider Line */}
      <View style={styles.divider} />

      {/* 3. FOOTER: Actions */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.actionButton} onPress={handleLike}>
          <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
            <ThumbsUp
              size={scale(20)}
              color={isLiked ? "#3b82f6" : "#64748b"} // Xanh nếu đã like
              fill={isLiked ? "#3b82f6" : "transparent"} // Fill màu nếu đã like
            />
          </Animated.View>
          <Text style={[styles.actionText, isLiked && styles.activeActionText]}>
            {likeCount}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionButton}
          onPress={handleOpenComments}
        >
          <MessageCircle size={scale(20)} color="#64748b" />
          <Text style={styles.actionText}>{comments}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton} onPress={onSharePress}>
          <Share2 size={scale(20)} color="#64748b" />
          <Text style={styles.actionText}>Share</Text>
        </TouchableOpacity>
      </View>

      {/* --- Modal Bình luận (Tích hợp bên trong FeedCard) --- */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={handleCloseComments}
      >
        <View style={styles.modalOverlay}>
          {/* Vùng bấm ra ngoài để đóng */}
          <TouchableWithoutFeedback onPress={handleCloseComments}>
            <View style={styles.modalBackdrop} />
          </TouchableWithoutFeedback>

          {/* Nội dung Modal (Chiếm 80% màn hình) */}
          <Animated.View
            style={[
              styles.modalContent,
              { transform: [{ translateY: modalSlideAnim }] },
            ]}
          >
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Bình luận</Text>
              <TouchableOpacity onPress={handleCloseComments}>
                <X size={24} color="#0f172a" />
              </TouchableOpacity>
            </View>

            <FlatList
              data={COMMENTS_DATA}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <CommentCard
                  id={item.id}
                  userName={item.userName}
                  content={item.content}
                  timeAgo={item.timeAgo}
                  initialHelpfulCount={item.likes}
                />
              )}
              contentContainerStyle={styles.commentsList}
              showsVerticalScrollIndicator={false}
            />
          </Animated.View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: "#fff",
    borderRadius: scale(16),
    padding: scale(16),
    marginBottom: scale(16),
    // Shadow style
    shadowColor: "#000",
    shadowOffset: { width: 0, height: scale(2) },
    shadowOpacity: 0.05,
    shadowRadius: scale(8),
    elevation: 3,
    borderWidth: 1,
    borderColor: "#f1f5f9", // Slate-100
  },

  // --- Header Styles ---
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: scale(12),
  },
  avatarContainer: {
    width: scale(48),
    height: scale(48),
    borderRadius: scale(24),
    backgroundColor: "#0066ff", // Brand Blue
    justifyContent: "center",
    alignItems: "center",
    marginRight: scale(12),
  },
  avatarText: {
    color: "#fff",
    fontSize: scale(18),
    fontWeight: "600",
  },
  userInfo: {
    flex: 1,
  },
  nameRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: scale(8),
    marginBottom: scale(4),
  },
  userName: {
    fontSize: scale(16),
    fontWeight: "700",
    color: "#0f172a", // Slate-900
  },
  levelBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffedd5", // Orange-100
    paddingHorizontal: scale(8),
    paddingVertical: scale(2),
    borderRadius: scale(12),
    gap: scale(4),
  },
  levelText: {
    fontSize: scale(10),
    fontWeight: "700",
    color: "#d97706", // Orange-600
  },
  timeText: {
    fontSize: scale(13),
    color: "#94a3b8", // Slate-400
  },

  // --- Body Styles ---
  body: {
    marginBottom: scale(16),
  },
  title: {
    fontSize: scale(18),
    fontWeight: "600",
    color: "#0f172a",
    marginBottom: scale(8),
    lineHeight: scale(26),
  },
  content: {
    fontSize: scale(15),
    color: "#334155", // Slate-700
    lineHeight: scale(22),
    marginBottom: scale(12),
  },
  tagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: scale(8),
  },
  tag: {
    backgroundColor: "#f1f5f9", // Slate-100
    paddingHorizontal: scale(10),
    paddingVertical: scale(4),
    borderRadius: scale(6),
  },
  tagText: {
    fontSize: scale(12),
    color: "#475569", // Slate-600
    fontWeight: "500",
  },

  // --- Divider ---
  divider: {
    height: 1,
    backgroundColor: "#f1f5f9", // Slate-100
    marginBottom: scale(12),
  },

  // --- Footer Styles ---
  footer: {
    flexDirection: "row",
    justifyContent: "space-between", // Chia đều khoảng cách
    paddingHorizontal: scale(12), // Thụt vào một chút so với lề
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: scale(6),
    paddingVertical: scale(4),
  },
  actionText: {
    fontSize: scale(14),
    color: "#64748b", // Slate-500
    fontWeight: "500",
  },
  activeActionText: {
    color: "#3b82f6", // Blue-500
    fontWeight: "600",
  },

  // --- Modal Styles ---
  modalOverlay: {
    flex: 1,
    justifyContent: "flex-end", // Đẩy nội dung xuống đáy
    zIndex: 1000,
  },
  modalBackdrop: {
    ...StyleSheet.absoluteFillObject, // Phủ kín màn hình
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Màu đen mờ
  },
  modalContent: {
    height: "80%", // Chiếm 80% chiều cao màn hình
    backgroundColor: "#fff",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingTop: 20,
    // Shadow cho modal nổi lên
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 10,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#0f172a",
  },
  commentsList: {
    paddingHorizontal: 16,
    paddingBottom: 40, // Padding dưới để không bị sát đáy
  },
});

export default FeedCard;
