import React from "react";
import { useDispatch } from "react-redux";
import { Button } from "react-native";
import { router } from "expo-router";
import { clearToken } from "../app/slices/authSlice";

const LogoutButton = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    // Dispatch logout action
    dispatch(clearToken());
    router.replace("/");
  };

  return <Button title="Logout" onPress={handleLogout} />;
};

export default LogoutButton;
