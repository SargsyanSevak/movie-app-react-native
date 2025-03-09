import React, { useState, useEffect } from "react";
import { View, Text, Button, Alert } from "react-native";
import * as LocalAuthentication from "expo-local-authentication";
import { useAuthStore } from "~/store/auth.store";

const FaceIDAuth = () => {
  const [isFaceIDAvailable, setIsFaceIDAvailable] = useState(false);
  const { setIsSuccess } = useAuthStore();
  useEffect(() => {
    checkFaceIDSupport();
  }, []);

  const checkFaceIDSupport = async () => {
    const compatible = await LocalAuthentication.hasHardwareAsync();
    const enrolled = await LocalAuthentication.isEnrolledAsync();

    if (compatible && enrolled) {
      setIsFaceIDAvailable(true);
    } else {
      Alert.alert("Face ID is not available on this device.");
    }
  };

  const handleFaceIDAuth = async () => {
    const result = await LocalAuthentication.authenticateAsync({
      promptMessage: "Authenticate with Face ID",
      fallbackLabel: "Use Passcode",
      cancelLabel: "Cancel",
    });

    if (result.success) {
      setIsSuccess(true);
    } else {
      setIsSuccess(false);
      Alert.alert("Authentication Failed", "Try again.");
    }
  };

  useEffect(() => {
    if (isFaceIDAvailable) {
      handleFaceIDAuth();
    }
  }, [isFaceIDAvailable]);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Face ID Authentication</Text>
      {isFaceIDAvailable ? (
        <Button title="Authenticate with Face ID" onPress={handleFaceIDAuth} />
      ) : (
        <Text>Face ID is not available</Text>
      )}
    </View>
  );
};

export default FaceIDAuth;
