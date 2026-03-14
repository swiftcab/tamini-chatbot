/**
 * HabitCard – The core interaction unit
 * Tap = toggle done/missed
 * Long press = open detail
 * Value button = +1 increment
 */

import React, { useCallback } from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import * as Haptics from 'expo-haptics';
import { Habit, HabitLog, LogState } from '@/types';
import { Colors, Typography, Spacing, Radius, HabitTypeColors } from '@/constants/theme';
import { formatMinutes } from '@/lib/utils';

interface HabitCardProps {
  habit: Habit;
  log?: HabitLog;
  onToggle: (habitId: string) => void;
  onIncrement: (habitId: string, value: number) => void;
  onLongPress: (habitId: string) => void;
  style?: ViewStyle;
}

export function HabitCard({
  habit,
  log,
  onToggle,
  onIncrement,
  onLongPress,
  style,
}: HabitCardProps) {
  const isDone = log?.state === 'done';
  const isPartial = log?.state === 'partial';
  const accentColor = HabitTypeColors[habit.type] ?? Colors.primary;

  const handlePress = useCallback(async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onToggle(habit.id);
  }, [habit.id, onToggle]);

  const handleLongPress = useCallback(async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    onLongPress(habit.id);
  }, [habit.id, onLongPress]);

  const handleIncrement = useCallback(async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onIncrement(habit.id, 1);
  }, [habit.id, onIncrement]);

  const progressText = getProgressText(habit, log);
  const completionRatio = getCompletionRatio(habit, log);

  return (
    <Pressable
      style={({ pressed }) => [
        styles.card,
        isDone && styles.cardDone,
        pressed && styles.cardPressed,
        style,
      ]}
      onPress={handlePress}
      onLongPress={handleLongPress}
      delayLongPress={400}
    >
      {/* Left accent bar */}
      <View style={[styles.accentBar, { backgroundColor: accentColor, opacity: isDone ? 0.4 : 1 }]} />

      {/* Content */}
      <View style={styles.content}>
        <View style={styles.topRow}>
          <Text
            style={[styles.title, isDone && styles.titleDone]}
            numberOfLines={1}
          >
            {habit.title}
          </Text>
          <StateIndicator state={log?.state} accentColor={accentColor} />
        </View>

        {/* Progress bar for quantitative habits */}
        {habit.targetValue != null && (
          <View style={styles.progressContainer}>
            <View style={styles.progressTrack}>
              <View
                style={[
                  styles.progressFill,
                  {
                    backgroundColor: accentColor,
                    width: `${Math.min(completionRatio * 100, 100)}%`,
                    opacity: isDone ? 0.5 : 1,
                  },
                ]}
              />
            </View>
            <Text style={styles.progressLabel}>{progressText}</Text>
          </View>
        )}

        {/* Linked objective */}
        {habit.linkedObjective && !isDone && (
          <Text style={styles.objective} numberOfLines={1}>
            {habit.linkedObjective}
          </Text>
        )}
      </View>

      {/* Quick increment button (for quantitative habits) */}
      {habit.targetValue != null && !isDone && (
        <Pressable
          style={({ pressed }) => [
            styles.incrementBtn,
            { borderColor: accentColor },
            pressed && { opacity: 0.6 },
          ]}
          onPress={handleIncrement}
          hitSlop={8}
        >
          <Text style={[styles.incrementText, { color: accentColor }]}>
            +1
          </Text>
        </Pressable>
      )}
    </Pressable>
  );
}

// ─── State Indicator ──────────────────────────────────────────────────────────

function StateIndicator({
  state,
  accentColor,
}: {
  state?: LogState;
  accentColor: string;
}) {
  if (state === 'done') {
    return (
      <View style={[styles.stateCircle, { backgroundColor: accentColor }]}>
        <Text style={styles.stateCheck}>✓</Text>
      </View>
    );
  }
  if (state === 'partial') {
    return (
      <View style={[styles.stateCircle, { backgroundColor: 'transparent', borderColor: accentColor, borderWidth: 2 }]}>
        <View style={[styles.stateHalf, { backgroundColor: accentColor }]} />
      </View>
    );
  }
  return (
    <View style={[styles.stateCircle, { borderColor: Colors.border, borderWidth: 1.5 }]} />
  );
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function getProgressText(habit: Habit, log?: HabitLog): string {
  const current = log?.value ?? 0;
  const target = habit.targetValue ?? 0;
  const unit = habit.targetUnit ?? '';
  if (unit === 'minutes') {
    return `${formatMinutes(current)} / ${formatMinutes(target)}`;
  }
  return `${current} / ${target} ${unit}`;
}

function getCompletionRatio(habit: Habit, log?: HabitLog): number {
  if (!habit.targetValue || !log?.value) return 0;
  return log.value / habit.targetValue;
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderRadius: Radius.lg,
    marginBottom: Spacing.md,
    overflow: 'hidden',
    minHeight: 68,
  },
  cardDone: {
    opacity: 0.65,
  },
  cardPressed: {
    opacity: 0.85,
    transform: [{ scale: 0.985 }],
  },
  accentBar: {
    width: 4,
    alignSelf: 'stretch',
  },
  content: {
    flex: 1,
    paddingHorizontal: Spacing.base,
    paddingVertical: Spacing.md,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: Spacing.sm,
  },
  title: {
    flex: 1,
    fontSize: Typography.base,
    fontWeight: Typography.semibold,
    color: Colors.textPrimary,
  },
  titleDone: {
    textDecorationLine: 'line-through',
    color: Colors.textMuted,
  },
  objective: {
    fontSize: Typography.xs,
    color: Colors.textMuted,
    marginTop: Spacing.xs,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    marginTop: Spacing.sm,
  },
  progressTrack: {
    flex: 1,
    height: 3,
    backgroundColor: Colors.border,
    borderRadius: Radius.full,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: Radius.full,
  },
  progressLabel: {
    fontSize: Typography.xs,
    color: Colors.textSecondary,
    minWidth: 70,
    textAlign: 'right',
  },
  stateCircle: {
    width: 26,
    height: 26,
    borderRadius: 13,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  stateCheck: {
    color: Colors.textInverse,
    fontSize: 13,
    fontWeight: Typography.bold,
  },
  stateHalf: {
    width: '50%',
    height: '100%',
    alignSelf: 'flex-end',
  },
  incrementBtn: {
    marginRight: Spacing.base,
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: Radius.sm,
    borderWidth: 1.5,
  },
  incrementText: {
    fontSize: Typography.sm,
    fontWeight: Typography.bold,
  },
});
