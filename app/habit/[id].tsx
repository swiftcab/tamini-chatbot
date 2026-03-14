/**
 * Habit Detail / Edit Screen (Modal)
 * Shows stats + allows editing configuration
 */

import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TextInput,
  Pressable,
  Alert,
  Switch,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Colors, Typography, Spacing, Radius, HabitTypeColors, HabitTypeLabels, TimeSlotLabels } from '@/constants/theme';
import { Button } from '@/components/Button';
import { TypeBadge } from '@/components/TypeBadge';
import { WeekGrid } from '@/components/WeekGrid';
import { HeatmapCalendar } from '@/components/HeatmapCalendar';
import { useAppStore } from '@/lib/store';
import { Habit, HabitType, HabitFrequency, TimeSlot } from '@/types';
import { computeHabitStats, getLast30Days, formatMinutes } from '@/lib/utils';
import * as db from '@/lib/db';
import { HabitLog } from '@/types';
import { nanoid } from '@/lib/utils';

const HABIT_TYPES: HabitType[] = ['prospection', 'content', 'deep_work', 'client_follow', 'learning', 'health_support'];
const TIME_SLOTS: TimeSlot[] = ['morning', 'afternoon', 'evening', 'flexible'];

export default function HabitDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { habits, updateHabit, deleteHabit, createHabit, loadHabits } = useAppStore();

  const isNew = id === 'new';
  const existingHabit = habits.find((h) => h.id === id);

  const [editing, setEditing] = useState(isNew);
  const [logs, setLogs] = useState<HabitLog[]>([]);

  // Form state
  const [title, setTitle] = useState(existingHabit?.title ?? '');
  const [type, setType] = useState<HabitType>(existingHabit?.type ?? 'deep_work');
  const [frequency, setFrequency] = useState<HabitFrequency>(existingHabit?.frequency ?? 'daily');
  const [timesPerWeek, setTimesPerWeek] = useState(existingHabit?.timesPerWeek?.toString() ?? '3');
  const [targetValue, setTargetValue] = useState(existingHabit?.targetValue?.toString() ?? '');
  const [targetUnit, setTargetUnit] = useState(existingHabit?.targetUnit ?? '');
  const [timeSlot, setTimeSlot] = useState<TimeSlot>(existingHabit?.timeSlot ?? 'flexible');
  const [linkedObjective, setLinkedObjective] = useState(existingHabit?.linkedObjective ?? '');
  const [isActive, setIsActive] = useState(existingHabit?.isActive ?? true);

  useEffect(() => {
    if (!isNew && existingHabit) {
      async function loadLogs() {
        const last30 = getLast30Days();
        const loaded = await db.getLogsForHabit(existingHabit!.id, last30[0], last30[29]);
        setLogs(loaded);
      }
      loadLogs();
    }
  }, [id]);

  const stats = existingHabit ? computeHabitStats(existingHabit, logs) : null;

  async function handleSave() {
    if (!title.trim()) {
      Alert.alert('Titre requis', 'Donnez un titre à cette habitude.');
      return;
    }

    if (isNew) {
      const habit: Habit = {
        id: nanoid(),
        title: title.trim(),
        type,
        frequency,
        timesPerWeek: frequency === 'x_per_week' ? parseInt(timesPerWeek, 10) : undefined,
        targetValue: targetValue ? parseFloat(targetValue) : undefined,
        targetUnit: targetUnit.trim() || undefined,
        timeSlot,
        linkedObjective: linkedObjective.trim() || undefined,
        isActive: true,
        sortOrder: habits.length,
        createdAt: new Date().toISOString(),
      };
      await createHabit(habit);
    } else {
      await updateHabit({
        id: id!,
        title: title.trim(),
        type,
        frequency,
        timesPerWeek: frequency === 'x_per_week' ? parseInt(timesPerWeek, 10) : undefined,
        targetValue: targetValue ? parseFloat(targetValue) : undefined,
        targetUnit: targetUnit.trim() || undefined,
        timeSlot,
        linkedObjective: linkedObjective.trim() || undefined,
        isActive,
      });
    }

    await loadHabits();
    router.back();
  }

  async function handleDelete() {
    Alert.alert(
      'Supprimer cette habitude ?',
      'Tous vos logs associés seront également supprimés.',
      [
        { text: 'Annuler', style: 'cancel' },
        {
          text: 'Supprimer',
          style: 'destructive',
          onPress: async () => {
            await deleteHabit(id!);
            await loadHabits();
            router.back();
          },
        },
      ]
    );
  }

  const accentColor = HabitTypeColors[type] ?? Colors.primary;

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.closeBtn}>
          <Text style={styles.closeBtnText}>✕</Text>
        </Pressable>
        <Text style={styles.headerTitle}>
          {isNew ? 'Nouvelle habitude' : (editing ? 'Modifier' : existingHabit?.title)}
        </Text>
        {!isNew && !editing && (
          <Pressable onPress={() => setEditing(true)}>
            <Text style={styles.editBtnText}>Modifier</Text>
          </Pressable>
        )}
      </View>

      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent}>
        {/* Stats section (only for existing habits in view mode) */}
        {!editing && stats && existingHabit && (
          <>
            <View style={styles.statsHeader}>
              <TypeBadge type={existingHabit.type} />
              <View style={styles.statsRow}>
                <StatItem
                  value={`${stats.last7Days.filter((d) => d.state === 'done').length}/7`}
                  label="Cette semaine"
                  color={accentColor}
                />
                <StatItem
                  value={`${Math.round(stats.completionRateLast30 * 100)}%`}
                  label="30 jours"
                  color={accentColor}
                />
                <StatItem
                  value={stats.totalLogged.toString()}
                  label="Total"
                  color={accentColor}
                />
              </View>
            </View>

            <Text style={styles.sectionLabel}>7 derniers jours</Text>
            <View style={styles.gridCard}>
              <WeekGrid
                days={stats.last7Days}
                habitType={existingHabit.type}
                doneCount={stats.last7Days.filter((d) => d.state === 'done').length}
                expectedCount={
                  existingHabit.frequency === 'daily' ? 7 : (existingHabit.timesPerWeek ?? 3)
                }
              />
            </View>

            <Text style={styles.sectionLabel}>28 derniers jours</Text>
            <View style={styles.gridCard}>
              <HeatmapCalendar days={stats.last30Days} accentColor={accentColor} />
            </View>

            {existingHabit.linkedObjective && (
              <View style={styles.objectiveCard}>
                <Text style={styles.objectiveLabel}>Lié à l'objectif</Text>
                <Text style={styles.objectiveText}>{existingHabit.linkedObjective}</Text>
              </View>
            )}
          </>
        )}

        {/* Edit form */}
        {editing && (
          <>
            <View style={styles.formGroup}>
              <Text style={styles.fieldLabel}>Titre de l'habitude *</Text>
              <TextInput
                style={styles.textInput}
                value={title}
                onChangeText={setTitle}
                placeholder="Ex: Envoyer 10 messages LinkedIn"
                placeholderTextColor={Colors.textMuted}
              />
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.fieldLabel}>Type</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View style={styles.typeRow}>
                  {HABIT_TYPES.map((t) => (
                    <Pressable
                      key={t}
                      style={[
                        styles.typeChip,
                        type === t && { backgroundColor: HabitTypeColors[t] + '30', borderColor: HabitTypeColors[t] },
                      ]}
                      onPress={() => setType(t)}
                    >
                      <Text style={[styles.typeChipText, type === t && { color: HabitTypeColors[t] }]}>
                        {HabitTypeLabels[t]}
                      </Text>
                    </Pressable>
                  ))}
                </View>
              </ScrollView>
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.fieldLabel}>Fréquence</Text>
              <View style={styles.segmentRow}>
                {(['daily', 'x_per_week'] as HabitFrequency[]).map((f) => (
                  <Pressable
                    key={f}
                    style={[styles.segment, frequency === f && styles.segmentActive]}
                    onPress={() => setFrequency(f)}
                  >
                    <Text style={[styles.segmentText, frequency === f && styles.segmentTextActive]}>
                      {f === 'daily' ? 'Quotidien' : 'X fois/sem'}
                    </Text>
                  </Pressable>
                ))}
              </View>
              {frequency === 'x_per_week' && (
                <TextInput
                  style={[styles.textInput, { marginTop: Spacing.sm }]}
                  value={timesPerWeek}
                  onChangeText={setTimesPerWeek}
                  keyboardType="numeric"
                  placeholder="Ex: 3"
                  placeholderTextColor={Colors.textMuted}
                />
              )}
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.fieldLabel}>Objectif quantitatif (optionnel)</Text>
              <View style={styles.row}>
                <TextInput
                  style={[styles.textInput, { flex: 1 }]}
                  value={targetValue}
                  onChangeText={setTargetValue}
                  keyboardType="numeric"
                  placeholder="Ex: 90"
                  placeholderTextColor={Colors.textMuted}
                />
                <TextInput
                  style={[styles.textInput, { flex: 1 }]}
                  value={targetUnit}
                  onChangeText={setTargetUnit}
                  placeholder="minutes / messages"
                  placeholderTextColor={Colors.textMuted}
                />
              </View>
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.fieldLabel}>Créneau horaire</Text>
              <View style={styles.segmentRow}>
                {TIME_SLOTS.map((slot) => (
                  <Pressable
                    key={slot}
                    style={[styles.segment, timeSlot === slot && styles.segmentActive]}
                    onPress={() => setTimeSlot(slot)}
                  >
                    <Text style={[styles.segmentText, timeSlot === slot && styles.segmentTextActive]}>
                      {TimeSlotLabels[slot]}
                    </Text>
                  </Pressable>
                ))}
              </View>
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.fieldLabel}>Lié à l'objectif (optionnel)</Text>
              <TextInput
                style={styles.textInput}
                value={linkedObjective}
                onChangeText={setLinkedObjective}
                placeholder="Ex: Atteindre 5k€/mois"
                placeholderTextColor={Colors.textMuted}
              />
            </View>

            {!isNew && (
              <View style={styles.formGroup}>
                <View style={styles.switchRow}>
                  <Text style={styles.fieldLabel}>Habitude active</Text>
                  <Switch
                    value={isActive}
                    onValueChange={setIsActive}
                    trackColor={{ false: Colors.border, true: Colors.primary + '80' }}
                    thumbColor={isActive ? Colors.primary : Colors.textMuted}
                  />
                </View>
              </View>
            )}
          </>
        )}

        {/* Actions */}
        {editing && (
          <View style={styles.actions}>
            <Button label="Enregistrer" onPress={handleSave} fullWidth size="lg" />
            {!isNew && (
              <Button
                label="Supprimer cette habitude"
                variant="danger"
                onPress={handleDelete}
                fullWidth
              />
            )}
          </View>
        )}

        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function StatItem({ value, label, color }: { value: string; label: string; color: string }) {
  return (
    <View style={styles.statItem}>
      <Text style={[styles.statValue, { color }]}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.xl,
    paddingTop: Spacing.xl,
    paddingBottom: Spacing.base,
  },
  closeBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.surfaceElevated,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeBtnText: { color: Colors.textSecondary, fontSize: Typography.sm },
  headerTitle: { fontSize: Typography.md, fontWeight: Typography.semibold, color: Colors.textPrimary, flex: 1, textAlign: 'center' },
  editBtnText: { color: Colors.primary, fontSize: Typography.sm, fontWeight: Typography.semibold },
  scroll: { flex: 1 },
  scrollContent: { padding: Spacing.xl, gap: Spacing.base },
  statsHeader: { gap: Spacing.base },
  statsRow: { flexDirection: 'row', gap: Spacing.base },
  statItem: { flex: 1, backgroundColor: Colors.surface, borderRadius: Radius.lg, padding: Spacing.base, alignItems: 'center' },
  statValue: { fontSize: Typography.xl, fontWeight: Typography.bold },
  statLabel: { fontSize: Typography.xs, color: Colors.textMuted, marginTop: 2 },
  sectionLabel: {
    fontSize: Typography.xs,
    fontWeight: Typography.semibold,
    color: Colors.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  gridCard: { backgroundColor: Colors.surface, borderRadius: Radius.xl, padding: Spacing.lg },
  objectiveCard: { backgroundColor: Colors.surface, borderRadius: Radius.lg, padding: Spacing.base },
  objectiveLabel: { fontSize: Typography.xs, color: Colors.textMuted, marginBottom: 4 },
  objectiveText: { fontSize: Typography.sm, color: Colors.textPrimary, fontStyle: 'italic' },
  formGroup: { gap: Spacing.sm },
  fieldLabel: { fontSize: Typography.sm, fontWeight: Typography.semibold, color: Colors.textSecondary },
  textInput: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.md,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: Spacing.base,
    fontSize: Typography.base,
    color: Colors.textPrimary,
  },
  typeRow: { flexDirection: 'row', gap: Spacing.sm },
  typeChip: {
    paddingHorizontal: Spacing.base,
    paddingVertical: Spacing.sm,
    borderRadius: Radius.full,
    borderWidth: 1.5,
    borderColor: Colors.border,
    backgroundColor: Colors.surface,
  },
  typeChipText: { fontSize: Typography.sm, color: Colors.textSecondary, fontWeight: Typography.medium },
  segmentRow: { flexDirection: 'row', backgroundColor: Colors.surface, borderRadius: Radius.md, padding: 3, gap: 3 },
  segment: { flex: 1, paddingVertical: Spacing.sm, borderRadius: Radius.sm - 2, alignItems: 'center' },
  segmentActive: { backgroundColor: Colors.surfaceElevated },
  segmentText: { fontSize: Typography.sm, color: Colors.textMuted },
  segmentTextActive: { color: Colors.textPrimary, fontWeight: Typography.semibold },
  row: { flexDirection: 'row', gap: Spacing.sm },
  switchRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  actions: { gap: Spacing.md, marginTop: Spacing.base },
});
