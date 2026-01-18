import { useFocusEffect } from "expo-router";
import { ArrowDownLeft, ArrowUpRight, Receipt } from "lucide-react-native";
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  Dimensions,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import SectorSelection from "./SectorSelection";

// --- Types ---
export interface TransactionItem {
  id: string;
  title: string;
  date: string;
  amount: number;
  type: "earn" | "withdraw"; // Kiếm được hay Rút tiền
}

interface RedeemScreenProps {
  transactions?: TransactionItem[];
}

// Lấy kích thước màn hình
const { width } = Dimensions.get("window");
const scale = (size: number) => (width / 375) * size;

const BANK_OPTIONS = [
  { id: "tpbank", label: "TPBank" },
  { id: "vcb", label: "Vietcombank" },
  { id: "tcb", label: "Techcombank" },
  { id: "mb", label: "MB Bank" },
  { id: "acb", label: "ACB" },
  { id: "vpbank", label: "VPBank" },
];

const TRANSACTIONS: TransactionItem[] = [
  {
    id: "1",
    title: "Completed Task: Fix Login Bug",
    date: "Today, 10:30 AM",
    amount: 120,
    type: "earn",
  },
  {
    id: "2",
    title: "Withdraw to TPBank",
    date: "Yesterday, 4:15 PM",
    amount: 500,
    type: "withdraw",
  },
  {
    id: "3",
    title: "Completed Task: UI Design",
    date: "Oct 24, 2023",
    amount: 350,
    type: "earn",
  },
  {
    id: "4",
    title: "Withdraw to MB Bank",
    date: "Oct 20, 2023",
    amount: 200,
    type: "withdraw",
  },
];

const RedeemScreen: React.FC<RedeemScreenProps> = ({
  transactions = TRANSACTIONS,
}) => {
  const [activeTab, setActiveTab] = useState<"redeem" | "history">("redeem");
  const scrollViewRef = useRef<ScrollView>(null);
  const flatListRef = useRef<FlatList>(null);
  const activeTabRef = useRef(activeTab);

  useEffect(() => {
    activeTabRef.current = activeTab;
  }, [activeTab]);

  useFocusEffect(
    useCallback(() => {
      if (activeTabRef.current === "redeem") {
        scrollViewRef.current?.scrollTo({ y: 0, animated: true });
      } else {
        flatListRef.current?.scrollToOffset({ offset: 0, animated: true });
      }
    }, []),
  );

  // --- Render: Transaction Row (Danh sách) ---
  const renderTransactionItem = ({ item }: { item: TransactionItem }) => {
    const isEarn = item.type === "earn";
    return (
      <View style={styles.transactionRow}>
        {/* Icon mũi tên */}
        <View
          style={[
            styles.transIconContainer,
            isEarn ? styles.bgGreen : styles.bgRed,
          ]}
        >
          {isEarn ? (
            <ArrowDownLeft size={scale(20)} color="#16a34a" /> // Mũi tên xanh chỉ xuống (vào túi)
          ) : (
            <ArrowUpRight size={scale(20)} color="#ef4444" /> // Mũi tên đỏ chỉ lên (bay đi)
          )}
        </View>

        {/* Nội dung */}
        <View style={styles.transContent}>
          <Text style={styles.transTitle}>{item.title}</Text>
          <Text style={styles.transDate}>{item.date}</Text>
        </View>

        {/* Số tiền */}
        <View style={styles.transAmountContainer}>
          <Text
            style={[
              styles.transAmount,
              isEarn ? styles.textGreen : styles.textRed,
            ]}
          >
            {isEarn ? "+" : "-"}
            {item.amount}
          </Text>
          <Receipt size={scale(14)} color={isEarn ? "#16a34a" : "#ef4444"} />
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* 1. TOP TABS SWITCHER */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tabButton, activeTab === "redeem" && styles.activeTab]}
          onPress={() => setActiveTab("redeem")}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "redeem" && styles.activeTabText,
            ]}
          >
            Withdraw
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.tabButton,
            activeTab === "history" && styles.activeTab,
          ]}
          onPress={() => setActiveTab("history")}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "history" && styles.activeTabText,
            ]}
          >
            Transaction History
          </Text>
        </TouchableOpacity>
      </View>

      {/* 2. CONTENT AREA */}
      {activeTab === "redeem" ? (
        // --- VIEW: REDEEM ---
        <ScrollView
          ref={scrollViewRef}
          style={styles.contentContainer}
          showsVerticalScrollIndicator={true}
        >
          <Text style={[styles.sectionTitle, { marginBottom: scale(16) }]}>
            Bank Information
          </Text>

          <View style={styles.formContainer}>
            <SectorSelection
              options={BANK_OPTIONS}
              placeholder="Select Bank"
              initialValue=""
            />
            <TextInput
              style={styles.input}
              placeholder="Account Number"
              placeholderTextColor="#94a3b8"
              keyboardType="numeric"
            />
            <TextInput
              style={styles.input}
              placeholder="Account Holder Name"
              placeholderTextColor="#94a3b8"
            />
            <TextInput
              style={styles.input}
              placeholder="Amount"
              placeholderTextColor="#94a3b8"
              keyboardType="numeric"
            />

            <TouchableOpacity style={styles.withdrawButton}>
              <Text style={styles.withdrawButtonText}>Confirm Withdraw</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      ) : (
        // --- VIEW: HISTORY ---
        <View style={styles.contentContainer}>
          <Text style={[styles.sectionTitle, { marginBottom: scale(16) }]}>
            Recent Transactions
          </Text>
          <FlatList
            ref={flatListRef}
            data={transactions}
            renderItem={renderTransactionItem}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8fafc", // Nền tổng thể hơi xám nhẹ
    padding: scale(16),
  },

  // --- Tabs Styles ---
  tabContainer: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: scale(4),
    marginBottom: scale(20),
    // Shadow
    shadowColor: "#64748b",
    shadowOffset: { width: 0, height: scale(2) },
    shadowOpacity: 0.05,
    shadowRadius: scale(4),
    elevation: 2,
  },
  tabButton: {
    flex: 1,
    paddingVertical: scale(12),
    alignItems: "center",
    borderRadius: scale(8),
  },
  activeTab: {
    backgroundColor: "#0066ff", // Brand Blue
  },
  tabText: {
    fontSize: scale(14),
    fontWeight: "600",
    color: "#64748b",
  },
  activeTabText: {
    color: "#ffffff",
  },

  // --- Content Styles ---
  contentContainer: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: scale(16),
    fontWeight: "600",
    color: "#334155",
  },

  // --- Form Styles ---
  formContainer: {
    gap: scale(16),
  },
  input: {
    backgroundColor: "#fff",
    padding: scale(16),
    borderRadius: scale(12),
    borderWidth: 1,
    borderColor: "#e2e8f0",
    fontSize: scale(15),
    color: "#0f172a",
  },
  withdrawButton: {
    backgroundColor: "#0066ff",
    padding: scale(16),
    borderRadius: scale(12),
    alignItems: "center",
    marginTop: scale(8),
  },
  withdrawButtonText: {
    color: "#fff",
    fontSize: scale(14),
    fontWeight: "600",
  },

  // --- Transaction List Styles ---
  transactionRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: scale(16),
    borderRadius: scale(16),
    marginBottom: scale(12),
    borderWidth: 1,
    borderColor: "#e2e8f0",
    // Shadow
    shadowColor: "#000",
    shadowOffset: { width: 0, height: scale(2) },
    shadowOpacity: 0.03,
    shadowRadius: scale(4),
    elevation: 1,
  },
  transIconContainer: {
    width: scale(40),
    height: scale(40),
    borderRadius: scale(20),
    justifyContent: "center",
    alignItems: "center",
    marginRight: scale(12),
  },
  bgGreen: { backgroundColor: "#dcfce7" }, // Green-100
  bgRed: { backgroundColor: "#fee2e2" }, // Red-100

  transContent: {
    flex: 1,
  },
  transTitle: {
    fontSize: scale(15),
    fontWeight: "500",
    color: "#0f172a",
    marginBottom: scale(4),
  },
  transDate: {
    fontSize: scale(12),
    color: "#64748b",
  },
  transAmountContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: scale(4),
  },
  transAmount: {
    fontSize: scale(16),
    fontWeight: "700",
  },
  textGreen: { color: "#16a34a" },
  textRed: { color: "#ef4444" },
});

export default RedeemScreen;
