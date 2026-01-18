import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import EarnedAmount from "../Components/EarnedAmount";
import RedeemScreen from "../Components/Reddem";
import TokenAmount from "../Components/TokenAmount";

const Tab4 = () => {
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      <View style={[styles.header, { paddingTop: insets.top + 16 }]}>
        <Text style={styles.headerTitle}>Token Wallet</Text>
      </View>
      <View style={styles.content}>
        <TokenAmount />
        <View style={styles.row}>
          <EarnedAmount label="This Month" amount="+36" />
          <EarnedAmount />
        </View>
      </View>
      <RedeemScreen />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8fafc",
  },
  header: {
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f1f5f9",
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "800",
    color: "#0f172a",
    letterSpacing: -0.5,
  },
  content: {
    padding: 16,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default Tab4;
