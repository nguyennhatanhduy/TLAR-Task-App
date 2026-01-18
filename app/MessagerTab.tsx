import { useRouter } from "expo-router";
import {
  ChevronLeft,
  MoreVertical,
  Paperclip,
  Phone,
  Send,
  Smile,
} from "lucide-react-native";
import React, { useEffect, useRef, useState } from "react";
import {
  Dimensions,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

// --- Định nghĩa kiểu dữ liệu ---
interface Message {
  id: string;
  text: string;
  sender: "me" | "other";
  timestamp: string;
}

// --- Dữ liệu mẫu ---
const INITIAL_MESSAGES: Message[] = [
  {
    id: "1",
    text: 'Hi David! I saw you claimed the "Design Tet Poster" task.',
    sender: "me",
    timestamp: "10:30 AM",
  },
  {
    id: "2",
    text: "Yes! Im really excited about it. Do you have any specific requirements for the color palette?",
    sender: "other",
    timestamp: "10:32 AM",
  },
  {
    id: "3",
    text: "Just keep it traditional but modern. Red and Gold are must-haves.",
    sender: "me",
    timestamp: "10:33 AM",
  },
  {
    id: "4",
    text: "Got it. I will send you the first draft by tomorrow evening.",
    sender: "other",
    timestamp: "10:35 AM",
  },
  {
    id: "5",
    text: "Perfect. Let me know if you need any assets.",
    sender: "me",
    timestamp: "10:36 AM",
  },
];

// Lấy kích thước màn hình
const { width } = Dimensions.get("window");
const scale = (size: number) => (width / 375) * size;

const ChatDetailScreen = () => {
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [inputText, setInputText] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const router = useRouter();

  // Ref để điều khiển cuộn danh sách
  const flatListRef = useRef<FlatList>(null);

  // Hàm gửi tin nhắn
  const handleSend = () => {
    if (inputText.trim().length === 0) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: "me",
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages((prev) => [...prev, newMessage]);
    setInputText("");
  };

  // Tự động cuộn xuống dưới cùng khi có tin nhắn mới
  useEffect(() => {
    setTimeout(() => {
      flatListRef.current?.scrollToEnd({ animated: true });
    }, 100);
  }, [messages, isFocused]);

  // --- Sub-component: Bong bóng tin nhắn ---
  const renderItem = ({ item }: { item: Message }) => {
    const isMe = item.sender === "me";
    return (
      <View
        style={[
          styles.messageWrapper,
          isMe ? styles.messageWrapperMe : styles.messageWrapperOther,
        ]}
      >
        {!isMe && (
          // Avatar nhỏ bên cạnh tin nhắn người khác
          <View style={styles.smallAvatar}>
            <Text style={styles.smallAvatarText}>DK</Text>
          </View>
        )}
        <View
          style={[styles.bubble, isMe ? styles.bubbleMe : styles.bubbleOther]}
        >
          <Text
            style={[
              styles.messageText,
              isMe ? styles.textMe : styles.textOther,
            ]}
          >
            {item.text}
          </Text>
          <Text
            style={[styles.timeText, isMe ? styles.timeMe : styles.timeOther]}
          >
            {item.timestamp}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      {/* 1. HEADER */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => router.back()}
        >
          <ChevronLeft size={scale(24)} color="#0f172a" />
        </TouchableOpacity>

        <View style={styles.headerInfo}>
          <Text style={styles.headerName}>David Kim</Text>
          <View style={styles.statusContainer}>
            <View style={styles.onlineDot} />
            <Text style={styles.statusText}>Online</Text>
          </View>
        </View>

        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.iconButton}>
            <Phone size={scale(20)} color="#0f172a" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <MoreVertical size={scale(20)} color="#0f172a" />
          </TouchableOpacity>
        </View>
      </View>

      {/* 2. BODY: Message List */}
      {/* KeyboardAvoidingView là chìa khoá để bàn phím không che tin nhắn */}
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? scale(5) : 0}
      >
        <FlatList
          ref={flatListRef}
          data={messages}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />

        {/* 3. FOOTER: Input Bar */}
        <View style={styles.inputContainer}>
          <TouchableOpacity style={styles.attachButton}>
            <Paperclip size={scale(20)} color="#64748b" />
          </TouchableOpacity>

          <View style={styles.inputFieldWrapper}>
            <TextInput
              style={styles.textInput}
              placeholder="Type a message..."
              placeholderTextColor="#94a3b8"
              value={inputText}
              onChangeText={setInputText}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              multiline // Cho phép xuống dòng
            />
            <TouchableOpacity style={styles.smileyButton}>
              <Smile size={scale(20)} color="#94a3b8" />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={[
              styles.sendButton,
              !inputText.trim() && styles.sendButtonDisabled,
            ]}
            onPress={handleSend}
            disabled={!inputText.trim()}
          >
            <Send
              size={scale(20)}
              color="#fff"
              style={{ marginLeft: scale(2) }}
            />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  // --- Header Styles ---
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: scale(16),
    paddingVertical: scale(12),
    borderBottomWidth: 1,
    borderBottomColor: "#f1f5f9",
    backgroundColor: "#fff",
  },
  headerInfo: {
    flex: 1,
    marginLeft: scale(12),
  },
  headerName: {
    fontSize: scale(16),
    fontWeight: "700",
    color: "#0f172a",
  },
  statusContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: scale(2),
  },
  onlineDot: {
    width: scale(8),
    height: scale(8),
    borderRadius: scale(4),
    backgroundColor: "#22c55e", // Green for online
    marginRight: scale(6),
  },
  statusText: {
    fontSize: scale(12),
    color: "#64748b",
  },
  headerActions: {
    flexDirection: "row",
    gap: scale(8),
  },
  iconButton: {
    padding: scale(8),
  },

  // --- List Styles ---
  keyboardView: {
    flex: 1,
  },
  listContent: {
    paddingHorizontal: scale(16),
    paddingBottom: scale(20),
    paddingTop: scale(20),
  },
  messageWrapper: {
    marginBottom: scale(16),
    flexDirection: "row",
    alignItems: "flex-end", // Căn đáy để avatar nằm ngang hàng với bong bóng
  },
  messageWrapperMe: {
    justifyContent: "flex-end",
  },
  messageWrapperOther: {
    justifyContent: "flex-start",
  },

  // Avatar nhỏ trong chat
  smallAvatar: {
    width: scale(28),
    height: scale(28),
    borderRadius: scale(14),
    backgroundColor: "#e2e8f0",
    justifyContent: "center",
    alignItems: "center",
    marginRight: scale(8),
    marginBottom: scale(2), // Căn chỉnh với đáy bubble
  },
  smallAvatarText: {
    fontSize: scale(10),
    fontWeight: "700",
    color: "#64748b",
  },

  // Bubble Styles
  bubble: {
    maxWidth: "75%", // Không bao giờ chiếm hết màn hình
    paddingHorizontal: scale(16),
    paddingVertical: scale(12),
    borderRadius: scale(20),
  },
  bubbleMe: {
    backgroundColor: "#0066ff", // Brand Blue
    borderBottomRightRadius: scale(4), // Góc nhọn thể hiện hướng nói
  },
  bubbleOther: {
    backgroundColor: "#f1f5f9", // Slate-100
    borderBottomLeftRadius: scale(4),
  },
  messageText: {
    fontSize: scale(15),
    lineHeight: scale(22),
  },
  textMe: {
    color: "#fff",
  },
  textOther: {
    color: "#1e293b", // Slate-800
  },
  timeText: {
    fontSize: scale(10),
    marginTop: scale(4),
    alignSelf: "flex-end",
  },
  timeMe: {
    color: "rgba(255,255,255,0.7)",
  },
  timeOther: {
    color: "#94a3b8",
  },

  // --- Input Styles ---
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: scale(16),
    paddingVertical: scale(12),
    borderTopWidth: 1,
    borderTopColor: "#f1f5f9",
    backgroundColor: "#fff",
  },
  attachButton: {
    marginRight: scale(12),
    padding: scale(4),
  },
  inputFieldWrapper: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f8fafc", // Slate-50
    borderRadius: scale(24),
    paddingHorizontal: scale(16),
    paddingVertical: Platform.OS === "ios" ? scale(10) : scale(4), // Android padding mặc định lớn
    marginRight: scale(12),
    borderWidth: 1,
    borderColor: "#e2e8f0",
  },
  textInput: {
    flex: 1,
    fontSize: scale(15),
    color: "#0f172a",
    maxHeight: scale(100), // Giới hạn chiều cao khi gõ nhiều dòng
  },
  smileyButton: {
    marginLeft: scale(8),
  },
  sendButton: {
    width: scale(44),
    height: scale(44),
    borderRadius: scale(22),
    backgroundColor: "#0066ff",
    justifyContent: "center",
    alignItems: "center",
    // Shadow
    shadowColor: "#0066ff",
    shadowOffset: { width: 0, height: scale(2) },
    shadowOpacity: 0.2,
    shadowRadius: scale(4),
    elevation: 2,
  },
  sendButtonDisabled: {
    backgroundColor: "#cbd5e1", // Slate-300
    shadowOpacity: 0,
    elevation: 0,
  },
});

export default ChatDetailScreen;
