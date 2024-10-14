import React from "react";
import { DarkTheme, ThemeProvider } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import "react-native-reanimated";
import { useColorScheme } from "@/hooks/useColorScheme";
import * as FileSystem from "expo-file-system";
import { Asset } from "expo-asset";
import { ActivityIndicator, Text, View } from "react-native";
import { SQLiteProvider } from "expo-sqlite";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

//connect to sqlite
const loadDatabase = async () => {
  const dbName = "todo.db";
  const dbAsset = require("../assets/todo.db");
  const dbUri = Asset.fromModule(dbAsset).uri;
  const dbFilePath = `${FileSystem.documentDirectory}SQLite/${dbName}`;

  const fileInfo = await FileSystem.getInfoAsync(dbFilePath);
  if (!fileInfo.exists) {
    await FileSystem.makeDirectoryAsync(
      `${FileSystem.documentDirectory}SQLite`,
      { intermediates: true }
    );
    await FileSystem.downloadAsync(dbUri, dbFilePath);
  }
};

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [dbLoaded, setDbLoaded] = useState<boolean>(false);
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    loadDatabase()
      .then(() => setDbLoaded(true))
      .catch((e) => console.error(e));
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  if (!dbLoaded)
    return (
      <View>
        <ActivityIndicator size={"large"} />
        <Text>Loading database ...</Text>
      </View>
    );

  return (
    <ThemeProvider value={DarkTheme}>
      <React.Suspense 
      fallback={
        <View>
        <ActivityIndicator size={"large"} />
        <Text>Loading database ...</Text>
      </View>
      }>
        <SQLiteProvider databaseName="todo.db" useSuspense>
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="+not-found" />
          </Stack>
        </SQLiteProvider>
      </React.Suspense>
    </ThemeProvider>
  );
}
