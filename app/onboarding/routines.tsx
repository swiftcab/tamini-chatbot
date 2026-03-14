/**
 * Onboarding – Routine Selection
 * Shows 3 AI-generated routines, lets user pick one and fine-tune
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Pressable,
  StyleSheet,
  Alert,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Colors, Typography, Spacing, Radius, HabitTypeColors, HabitTypeLabels, TimeSlotLabels } from '@/constants/theme';
import { Button } from '@/components/Button';
import { TypeBadge } from '@/components/TypeBadge';
import { AIRoutine, RoutineHabit } from '@/types';
import { useAppStore } from '@/lib/store';
import { scheduleHabitReminders } from '@/lib/notifications';
import { formatMinutes } from '@/lib/utils';

export default function RoutinesScreen() {
  const router = useRouter();
  const { routines: routinesJson } = useLocalSearchParams<{ routines: string }>();
  const { importRoutine, saveProfile, profile, habits } = useAppStore();

  const routines: AIRoutine[] = JSON.parse(routinesJson ?? '[]');
  const [selectedRoutineId, setSelectedRoutineId] = useState<string | null>(
    routines[0]?.id ?? null
  );
  const [isImporting, setIsImporting] = useState(false);
  const [expandedRoutine, setExpandedRoutine] = useState<string | null>(routines[0]?.id ?? null);

  const selectedRoutine = routines.find((r) => r.id === selectedRoutineId);

  async function handleStart() {
    if (!selectedRoutine) return;
    setIsImporting(true);
    try {
      await importRoutine(selectedRoutine);

      // Mark onboarding as complete
      if (profile) {
        await saveProfile({
          ...profile,
          onboardingCompleted: true,
          notificationSlots: ['08:00', '19:00'],
        });
      }

      // Schedule notifications
      await scheduleHabitReminders(habits, ['08:00', '19:00']);

      router.replace('/(tabs)/today');
    } catch (err: any) {
      Alert.alert('Erreur', err.message);
    } finally {
      setIsImporting(false);
    }
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Vos routines personnalisées</Text>
        <Text style={styles.subtitle}>
          L'IA a généré 3 routines adaptées à votre profil. Choisissez celle qui vous correspond le mieux.
        </Text>
      </View>

      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent}>
        {routines.map((routine) => (
          <RoutineCard
            key={routine.id}
            routine={routine}
            selected={selectedRoutineId === routine.id}
            expanded={expandedRoutine === routine.id}
            onSelect={() => {
              setSelectedRoutineId(routine.id);
              setExpandedRoutine(routine.id);
            }}
            onToggleExpand={() =>
              setExpandedRoutine((prev) => (prev === routine.id ? null : routine.id))
            }
          />
        ))}

        <View style={{ height: Spacing.xxxl }} />
      </ScrollView>

      {/* Footer */}
      <View style={styles.footer}>
        {selectedRoutine && (
          <Text style={styles.footerHint}>
            {selectedRoutine.habits.length} habitudes · ~{selectedRoutine.estimatedDailyMinutes} min/jour
          </Text>
        )}
        <Button
          label="Démarrer avec cette routine"
          onPress={handleStart}
          disabled={!selectedRoutineId}
          loading={isImporting}
          fullWidth
          size="lg"
        />
      </View>
    </View>
  );
}

// ─── Routine Card ─────────────────────────────────────────────────────────────

function RoutineCard({
  routine,
  selected,
  expanded,
  onSelect,
  onToggleExpand,
}: {
  routine: AIRoutine;
  selected: boolean;
  expanded: boolean;
  onSelect: () => void;
  onToggleExpand: () => void;
}) {
  return (
    <Pressable
      style={[styles.card, selected && styles.cardSelected]}
      onPress={onSelect}
    >
      {/* Card header */}
      <View style={styles.cardHeader}>
        <View style={styles.cardHeaderLeft}>
          <View style={styles.radioOuter}>
            {selected && <View style={styles.radioInner} />}
          </View>
          <View style={{ flex: 1 }}>
            <Text style={[styles.routineName, selected && styles.routineNameSelected]}>
              {routine.name}
            </Text>
            <Text style={styles.routineTagline}>{routine.tagline}</Text>
          </View>
        </View>
        <Pressable onPress={onToggleExpand} hitSlop={8} style={styles.expandBtn}>
          <Text style={styles.expandIcon}>{expanded ? '▲' : '▼'}</Text>
        </Pressable>
      </View>

      {/* Stats row */}
      <View style={styles.statsRow}>
        <StatPill label={`${routine.habits.length} habitudes`} />
        <StatPill label={`~${routine.estimatedDailyMinutes} min/j`} />
        <StatPill label={routine.targetProfile} />
      </View>

      {/* Expanded: habits list */}
      {expanded && (
        <>
          <View style={styles.divider} />
          <Text style={styles.habitsTitle}>Habitudes incluses</Text>
          {routine.habits.map((habit, i) => (
            <HabitPreviewRow key={i} habit={habit} />
          ))}
          <Text style={styles.description}>{routine.description}</Text>
        </>
      )}
    </Pressable>
  );
}

function HabitPreviewRow({ habit }: { habit: RoutineHabit }) {
  const color = HabitTypeColors[habit.type] ?? Colors.primary;
  const timeLabel = TimeSlotLabels[habit.timeSlot] ?? habit.timeSlot;
  const freqLabel = habit.timesPerWeek
    ? `${habit.timesPerWeek}x/sem`
    : habit.frequency === 'daily'
    ? 'Quotidien'
    : 'Variable';

  const valueLabel =
    habit.targetValue && habit.targetUnit
      ? habit.targetUnit === 'minutes'
        ? formatMinutes(habit.targetValue)
        : `${habit.targetValue} ${habit.targetUnit}`
      : null;

  return (
    <View style={styles.habitRow}>
      <View style={[styles.habitDot, { backgroundColor: color }]} />
      <View style={{ flex: 1 }}>
        <Text style={styles.habitTitle}>{habit.title}</Text>
        <Text style={styles.habitMeta}>
          {freqLabel} · {timeLabel}{valueLabel ? ` · ${valueLabel}` : ''}
        </Text>
        <Text style={styles.habitObjective}>{habit.linkedObjective}</Text>
      </View>
    </View>
  );
}

function StatPill({ label }: { label: string }) {
  return (
    <View style={styles.statPill}>
      <Text style={styles.statPillText}>{label}</Text>
    </View>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  header: {
    paddingHorizontal: Spacing.xl,
    paddingTop: Spacing.xxxl + Spacing.lg,
    paddingBottom: Spacing.lg,
    gap: Spacing.sm,
  },
  title: {
    fontSize: Typography.xxl,
    fontWeight: Typography.bold,
    color: Colors.textPrimary,
  },
  subtitle: {
    fontSize: Typography.base,
    color: Colors.textSecondary,
    lineHeight: Typography.base * 1.5,
  },
  scroll: { flex: 1 },
  scrollContent: { padding: Spacing.xl, gap: Spacing.base },
  card: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.xl,
    borderWidth: 1.5,
    borderColor: Colors.border,
    padding: Spacing.lg,
    gap: Spacing.md,
  },
  cardSelected: {
    borderColor: Colors.primary,
    backgroundColor: Colors.primary + '08',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: Spacing.sm,
  },
  cardHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: Spacing.md,
    flex: 1,
  },
  radioOuter: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
  },
  radioInner: { width: 10, height: 10, borderRadius: 5, backgroundColor: Colors.primary },
  routineName: {
    fontSize: Typography.md,
    fontWeight: Typography.bold,
    color: Colors.textPrimary,
  },
  routineNameSelected: { color: Colors.primary },
  routineTagline: {
    fontSize: Typography.sm,
    color: Colors.textSecondary,
    marginTop: 3,
  },
  expandBtn: { paddingTop: 4 },
  expandIcon: { color: Colors.textMuted, fontSize: 10 },
  statsRow: { flexDirection: 'row', gap: Spacing.sm, flexWrap: 'wrap' },
  statPill: {
    backgroundColor: Colors.surfaceElevated,
    borderRadius: Radius.full,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 4,
  },
  statPillText: { fontSize: Typography.xs, color: Colors.textSecondary },
  divider: { height: 1, backgroundColor: Colors.border },
  habitsTitle: {
    fontSize: Typography.sm,
    fontWeight: Typography.semibold,
    color: Colors.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  habitRow: {
    flexDirection: 'row',
    gap: Spacing.md,
    paddingVertical: Spacing.xs,
  },
  habitDot: { width: 8, height: 8, borderRadius: 4, marginTop: 5 },
  habitTitle: { fontSize: Typography.base, fontWeight: Typography.medium, color: Colors.textPrimary },
  habitMeta: { fontSize: Typography.xs, color: Colors.textMuted, marginTop: 2 },
  habitObjective: { fontSize: Typography.xs, color: Colors.textSecondary, marginTop: 2, fontStyle: 'italic' },
  description: {
    fontSize: Typography.sm,
    color: Colors.textSecondary,
    lineHeight: Typography.sm * 1.6,
    marginTop: Spacing.xs,
  },
  footer: {
    padding: Spacing.xl,
    paddingBottom: Spacing.xxxl,
    gap: Spacing.sm,
  },
  footerHint: {
    textAlign: 'center',
    fontSize: Typography.sm,
    color: Colors.textMuted,
  },
});
