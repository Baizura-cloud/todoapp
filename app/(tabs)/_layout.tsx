import { Tabs } from "expo-router";
import React from "react";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { TouchableOpacity, View } from "react-native";

export default function TabLayout() {
  interface CustomProps {
    children: any;
    onPress?: any;
  }
  const colorScheme = useColorScheme();
  const CustomFloatingButton = ({ children, onPress }: CustomProps) => (
    <TouchableOpacity
      onPress={onPress}
      style={{
        top: -30,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View
        style={{
          width: 70,
          height: 70,
          borderRadius: 35,
          backgroundColor: "gray",
        }}
      >
        {children}
      </View>
    </TouchableOpacity>
  );
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          position: "absolute",
          bottom: 25,
          left: 20,
          right: 20,
          elevation: 0,
          backgroundColor: "#ccc",
          borderRadius: 15,
          height: 70,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Task",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name="document-text" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="newTask"
        options={{
          title: "Task",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "add-outline" : "add-outline"}
              color="white"
            />
          ),
          tabBarButton: (props) => <CustomFloatingButton {...props} />,
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: "Archive",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name="archive" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
