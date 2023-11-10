import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link, Tabs } from "expo-router";
import { Pressable, View, useColorScheme } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../../constants/Colors";
import ModalScreen from "../Modal";
import PrivateRoute from "../../components/PrivateRoute";
import { useSelector } from "react-redux";
import { selectIsAuthenticated } from "../slices/authSlice";

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const isUserAuthenticated = useSelector(selectIsAuthenticated);
  return (
    <Tabs
      screenOptions={{
        /* tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint, */
        tabBarActiveTintColor: "#FF9933",
      }}
    >
      <Tabs.Screen name="lists" options={{ tabBarButton: () => null }} />

      {/* <PrivateRoute isAuthed={isUserAuthenticated}> */}
      <Tabs.Screen
        name="period"
        options={{
          title: "Inventory",

          headerTitleAlign: "center",
          tabBarIcon: ({ color }) => (
            <Ionicons name="ios-clipboard-outline" size={24} color={color} />
          ),
          headerRight: () => (
            <Link href="/Modal" asChild>
              <Pressable>
                {({ pressed }) => (
                  <Ionicons
                    name="ios-menu-outline"
                    size={24}
                    /*  color={Colors[colorScheme ?? "light"].text} */
                    color={"black"}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),
        }}
      />
      {/*   </PrivateRoute> */}
      {
        <Tabs.Screen
          name="items"
          options={{
            title: "Items",
            headerTitleAlign: "center",
            tabBarIcon: ({ color }) => (
              <Ionicons name="ios-cube-outline" size={24} color={color} />
            ),
            headerRight: () => (
              <Link href="/ModalScreen" asChild>
                <Pressable>
                  {({ pressed }) => (
                    <FontAwesome
                      name="info-circle"
                      size={25}
                      /* color={Colors[colorScheme ?? "light"].text} */
                      color={"black"}
                      style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                    />
                  )}
                </Pressable>
              </Link>
            ),
          }}
        />
      }
      <Tabs.Screen
        name="Dashboard"
        options={{
          title: "Dashboard",
          headerTitleAlign: "center",
          tabBarIcon: ({ color }) => (
            <Ionicons name="ios-home-outline" size={24} color={color} />
          ),
          headerRight: () => (
            <Link href="/AccountSettings" asChild>
              <Pressable>
                {({ pressed }) => (
                  <Ionicons
                    name="ios-menu-outline"
                    size={24}
                    /*  color={Colors[colorScheme ?? "light"].text} */
                    color={"black"}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),
        }}
      />

      <Tabs.Screen
        name="statistics"
        options={{
          title: "Statistics",
          headerTitleAlign: "center",
          tabBarIcon: ({ color }) => (
            <Ionicons name="ios-stats-chart-outline" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          headerTitleAlign: "center",
          tabBarIcon: ({ color }) => (
            <Ionicons name="ios-settings-outline" size={24} color={color} />
          ),
          headerLeft: () => (
            <>
              <Pressable>
                {({ pressed }) => (
                  <Ionicons
                    name="ios-moon-outline"
                    size={20}
                    /* color={Colors[colorScheme ?? "light"].text} */
                    color={"black"}
                    style={{ marginLeft: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
              <Pressable>
                {({ pressed }) => (
                  <Ionicons
                    name="ios-sunny-outline"
                    size={20}
                    /* color={Colors[colorScheme ?? "light"].text} */
                    color={"black"}
                    style={{ marginLeft: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </>
          ),
          headerRight: () => (
            <Link href="/Modal" asChild>
              <Pressable>
                {({ pressed }) => (
                  <Ionicons
                    name="ios-menu-outline"
                    size={24}
                    /*   color={Colors[colorScheme ?? "light"].text} */
                    color={"black"}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),
        }}
      />
    </Tabs>
  );
}
