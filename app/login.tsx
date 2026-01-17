import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Dimensions,
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const { height: screenHeight, width: screenWidth } = Dimensions.get("window");

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = () => {
    if (!username || !password) {
      setError("vui lòng nhập tài khoảng và mật khẩu");
    } else {
      setError("");
      router.push("/(tabs)/tab1");
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <Image
        source={require("../assets/images/logo.png")}
        style={styles.logo}
      />
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.registerButton]}
          onPress={() => {}}
        >
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: screenWidth * 0.05,
    backgroundColor: "white",
  },
  logo: {
    width: screenWidth * 0.3,
    height: screenWidth * 0.3,
    marginBottom: screenHeight * 0.05,
  },
  title: {
    fontSize: screenWidth * 0.08,
    marginBottom: screenHeight * 0.03,
  },
  input: {
    width: "100%",
    height: screenHeight * 0.06,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: screenHeight * 0.015,
    paddingHorizontal: screenWidth * 0.04,
    borderRadius: 5,
  },
  errorText: {
    color: "red",
    marginBottom: screenHeight * 0.015,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  button: {
    backgroundColor: "#007BFF",
    padding: screenHeight * 0.015,
    borderRadius: 5,
    alignItems: "center",
    width: "48%",
  },
  registerButton: {
    backgroundColor: "gray",
  },
  buttonText: {
    color: "white",
    fontSize: screenWidth * 0.04,
  },
});

export default Login;
