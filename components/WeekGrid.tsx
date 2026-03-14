/**
 * WeekGrid – Shows 7-day completion for a single habit
 * Core metric: "4 jours sur 7" (no streak obsession)
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { DayCompletion } from '@/types';
import { Colors, Typography, Spacing, Radius, HabitTypeColors } from '@/constants/theme';
import { formatDate } from '@/lib/utils';

const DAY_LABELS = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];

interface WeekGridProps {
  days: DayCompletion[];
  habitType: string;
  doneCount: number;
  expectedCount: number;
}

export function WeekGrid({ days, habitType, doneCount, expectedCount }: WeekGridProps) {
  const accentColor = HabitTypeColors[habitType] ?? Colors.primary;

  return (
    <View style={styles.container}>
      <View style={styles.daysRow}>
        {days.map((day, i) => (
          <View key={day.date} style={styles.dayColumn}>
            <Text style={styles.dayLabel}>{DAY_LABELS[i]}</Text>
            <DayDot state={day.state} accentColor={accentColor} isToday={i === days.length - 1} />
          </View>
        ))}
      </View>
      <Text style={styles.summary}>
        <Text style={[styles.summaryBold, { color: accentColor }]}>{doneCount}</Text>
        <Text style={styles.summaryMuted}> sur {expectedCount} jours</Text>
      </Text>
    </View>
  );
}

function DayDot({
  state,
  accentColor,
  isToday,
}: {
  state: DayCompletion['state'];
  accentColor: string;
  isToday: boolean;
}) {
  const bg =
    state === 'done'
      ? accentColor
      : state === 'partial'
      ? accentColor + '55'
      : state === 'missed'
      ? Colors.surfaceElevated
      : Colors.border;

  return (
    <View
      style={[
        styles.dot,
        { backgroundColor: bg },
        isToday && styles.dotToday,
      ]}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-start',
  },
  daysRow: {
    flexDirection: 'row',
    gap: Spacing.xs,
  },
  dayColumn: {
    alignItems: 'center',
    gap: 4,
  },
  dayLabel: {
    fontSize: 10,
    color: Colors.textMuted,
    fontWeight: Typography.medium,
  },
  dot: {
    width: 28,
    height: 28,
    borderRadius: 7,
  },
  dotToday: {
    borderWidth: 2,
    borderColor: Colors.textSecondary,
  },
  summary: {
    marginTop: Spacing.sm,
    fontSize: Typography.sm,
  },
  summaryBold: {
    fontWeight: Typography.bold,
    fontSize: Typography.md,
  },
  summaryMuted: {
    color: Colors.textSecondary,
  },
});
