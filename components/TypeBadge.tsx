import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { HabitType } from '@/types';
import { HabitTypeColors, HabitTypeLabels, Typography, Spacing, Radius } from '@/constants/theme';

interface TypeBadgeProps {
  type: HabitType;
}

export function TypeBadge({ type }: TypeBadgeProps) {
  const color = HabitTypeColors[type] ?? '#999';
  const label = HabitTypeLabels[type] ?? type;

  return (
    <View style={[styles.badge, { backgroundColor: color + '20', borderColor: color + '40' }]}>
      <Text style={[styles.label, { color }]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    borderRadius: Radius.full,
    borderWidth: 1,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 3,
    alignSelf: 'flex-start',
  },
  label: {
    fontSize: Typography.xs,
    fontWeight: Typography.semibold,
  },
});
