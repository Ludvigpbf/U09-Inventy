import { Button, StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "./store";
import { UserData } from "./actions"; // Import the UserData interface
import { API_BASE_URL } from "../../api/authApi";
import axios from "axios";

const Preview = () => {
  // Use the useSelector hook to access the user data
  const userData: UserData | null = useSelector(
    (state: RootState) => state.user
  );

  // Create a function to filter out sensitive data (e.g., password)
  const getSafeUserData = (userData: UserData | null): UserData | null => {
    if (userData) {
      // Make a copy of userData, removing the password property
      const safeData = { ...userData };

      return safeData;
    }
    return null; // Return null if userData is null
  };

  const createUser = async (userData: UserData | null) => {
    try {
      // Make a POST request to your backend API
      const response = await axios.post(`${API_BASE_URL}/user/user`, userData);
      return response.data;
    } catch (error) {
      // Handle errors
      console.error("Error creating user:", error);
      throw error;
    }
  };

  const safeUserData = getSafeUserData(userData);

  const handleCreateUser = async () => {
    if (userData) {
      const userDataToCreate = {
        company: userData.company,
        email: userData.email,
        password: userData.password,
        plan: userData.plan,
        billing: userData.billing,
        departments: userData.departments,
      };

      try {
        const createdUser = await createUser(userDataToCreate);
        console.log("User created on the server:", createdUser);
        // Navigate to the next screen or handle the response as needed
      } catch (error) {
        console.error("Error creating user:", error);
      }
    } else {
      console.error("userData is null.");
      // Handle the case where userData is null
    }
  };

  return (
    <View style={styles.container}>
      <Text>4/4</Text>
      {safeUserData && ( // Check if safeUserData is not null
        <View>
          <Text>Company: {safeUserData.company}</Text>
          <Text>Email: {safeUserData.email}</Text>
          <Text>Plan: {safeUserData.plan}</Text>
          {safeUserData.billing && (
            <>
              <Text>Billing Company: {safeUserData.billing.company}</Text>
              <Text>Billing Org Number: {safeUserData.billing.orgNumber}</Text>
              <Text>Billing Address: {safeUserData.billing.address}</Text>
              <Text>Billing Email: {safeUserData.billing.email}</Text>
              <Text>Billing Phone: {safeUserData.billing.phone}</Text>
            </>
          )}
          {safeUserData.departments && safeUserData.departments.length > 0 && (
            <View>
              {safeUserData.departments &&
                safeUserData.departments.length > 0 && (
                  <View>
                    <Text>Departments:</Text>
                    {safeUserData.departments.map((department, index) => (
                      <View key={index}>
                        <Text>Department: {department.department}</Text>
                        <Text>Manager: {department.manager}</Text>
                      </View>
                    ))}
                  </View>
                )}
            </View>
          )}
        </View>
      )}
      <Button title="Sign Up" onPress={handleCreateUser} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  header: {
    fontSize: 20,
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
});

export default Preview;
