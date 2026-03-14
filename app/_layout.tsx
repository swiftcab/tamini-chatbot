import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { View, ActivityIndicator } from 'react-native';
import { useAppStore } from '@/lib/store';
import { Colors } from '@/constants/theme';

export default function RootLayout() {
  const { loadProfile, loadHabits, loadTodayLogs, loadLatestReport, isLoading } = useAppStore();

  useEffect(() => {
    async function bootstrap() {
      await loadProfile();
      await loadHabits();
      await loadTodayLogs();
      await loadLatestReport();
    }
    bootstrap();
  }, []);

  return (
    <>
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: Colors.background },
          animation: 'fade',
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen name="onboarding/index" options={{ animation: 'slide_from_right' }} />
        <Stack.Screen name="onboarding/routines" options={{ animation: 'slide_from_right' }} />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen
          name="habit/[id]"
          options={{
            presentation: 'modal',
            animation: 'slide_from_bottom',
          }}
        />
      </Stack>
    </>
  );
}
