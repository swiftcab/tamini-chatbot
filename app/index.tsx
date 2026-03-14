/**
 * Entry point – redirects based on onboarding status
 */

import { useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { useAppStore } from '@/lib/store';
import { Colors } from '@/constants/theme';

export default function Index() {
  const router = useRouter();
  const { isOnboarded, isLoading, profile } = useAppStore();

  useEffect(() => {
    if (isLoading) return;
    // Small delay so layout renders first
    const t = setTimeout(() => {
      if (isOnboarded) {
        router.replace('/(tabs)/today');
      } else {
        router.replace('/onboarding');
      }
    }, 100);
    return () => clearTimeout(t);
  }, [isLoading, isOnboarded]);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: Colors.background }}>
      <ActivityIndicator color={Colors.primary} size="large" />
    </View>
  );
}
