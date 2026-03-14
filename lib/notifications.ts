/**
 * Tamini – Smart Notification Service
 */

import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';
import { Habit } from '@/types';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export async function requestNotificationPermissions(): Promise<boolean> {
  if (Platform.OS === 'web') return false;
  const { status } = await Notifications.requestPermissionsAsync();
  return status === 'granted';
}

export async function scheduleHabitReminders(
  habits: Habit[],
  timeSlots: string[] // e.g. ["08:00", "19:00"]
): Promise<void> {
  // Cancel all existing scheduled notifications first
  await Notifications.cancelAllScheduledNotificationsAsync();

  if (habits.length === 0 || timeSlots.length === 0) return;

  for (const slot of timeSlots.slice(0, 2)) {
    const [hourStr, minuteStr] = slot.split(':');
    const hour = parseInt(hourStr, 10);
    const minute = parseInt(minuteStr, 10);

    const morningHabits = habits.filter(
      (h) => h.timeSlot === 'morning' || h.timeSlot === 'flexible'
    );
    const eveningHabits = habits.filter((h) => h.timeSlot === 'evening');
    const relevantHabits = hour < 12 ? morningHabits : eveningHabits.length > 0 ? eveningHabits : habits;

    if (relevantHabits.length === 0) continue;

    const habitNames = relevantHabits
      .slice(0, 3)
      .map((h) => h.title)
      .join(', ');

    const body =
      relevantHabits.length === 1
        ? `Rappel : ${relevantHabits[0].title}`
        : `${relevantHabits.length} habitudes à faire · ${habitNames}`;

    await Notifications.scheduleNotificationAsync({
      content: {
        title: 'Tamini',
        body,
        data: { type: 'habit_reminder' },
      },
      trigger: {
        hour,
        minute,
        repeats: true,
      },
    });
  }
}

export async function sendInstantNotification(title: string, body: string): Promise<void> {
  await Notifications.scheduleNotificationAsync({
    content: { title, body },
    trigger: null, // immediate
  });
}
