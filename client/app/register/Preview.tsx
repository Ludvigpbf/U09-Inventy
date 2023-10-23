import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "./store";
import { UserData } from "./actions"; // Import the UserData interface
import { API_BASE_URL } from "../../api/authApi";
import axios from "axios";
import { router } from "expo-router";

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
  useEffect(() => {
    console.log(userData);
  });

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
        router.replace(`/`);
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
      <Text style={styles.pageNumber}>4/4</Text>
      {safeUserData && ( // Check if safeUserData is not null
        <View style={styles.previewContainer}>
          <View style={styles.propValueContainer}>
            <Text style={styles.property}>Company: </Text>
            <Text style={styles.value}>{safeUserData.company}</Text>
          </View>
          <View style={styles.propValueContainer}>
            <Text style={styles.property}>Email: </Text>
            <Text style={styles.value}>{safeUserData.email}</Text>
          </View>
          <View style={styles.propValueContainer}>
            <Text style={styles.property}>Plan: </Text>
            <Text style={styles.value}>{safeUserData.plan}</Text>
          </View>
          {safeUserData.billing && (
            <>
              <View style={styles.propValueContainer}>
                <Text style={styles.property}>Billing Company: </Text>
                <Text style={styles.value}>{safeUserData.billing.company}</Text>
              </View>
              <View style={styles.propValueContainer}>
                <Text style={styles.property}>Billing Org Number: </Text>
                <Text style={styles.value}>
                  {safeUserData.billing.orgNumber}
                </Text>
              </View>
              <View style={styles.propValueContainer}>
                <Text style={styles.property}>Billing Address: </Text>
                <Text style={styles.value}>{safeUserData.billing.address}</Text>
              </View>
              <View style={styles.propValueContainer}>
                <Text style={styles.property}>Billing Email: </Text>
                <Text style={styles.value}>{safeUserData.billing.email}</Text>
              </View>
              <View style={styles.propValueContainer}>
                <Text style={styles.property}>Billing Phone: </Text>
                <Text style={styles.value}>{safeUserData.billing.phone}</Text>
              </View>
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
                        <Text style={styles.property}>Department: </Text>
                        <Text style={styles.value}>
                          {department.department}
                        </Text>
                        <Text style={styles.property}>Manager: </Text>
                        <Text style={styles.value}>{department.manager}</Text>
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
    paddingHorizontal: 5,
  },
  header: {
    fontSize: 20,
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  pageNumber: {},
  previewContainer: {
    display: "flex",
    justifyContent: "center",
    alignContent: "center",
    marginTop: 50,
    marginBottom: 50,
    borderWidth: 1,
    padding: 10,
    width: 310,
  },
  propValueContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  property: {},
  value: {
    paddingLeft: 5,
    paddingBottom: 3,

    borderWidth: 1,
    borderRadius: 4,
    width: 140,
  },
});

export default Preview;
