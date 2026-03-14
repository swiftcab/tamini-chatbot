/**
 * Today Screen – Main habit tracking interface
 * Core loop: open app → tap habits → done in < 30 seconds
 */

import React, { useCallback, useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Pressable,
  Modal,
  TextInput,
  Alert,
  RefreshControl,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Colors, Typography, Spacing, Radius } from '@/constants/theme';
import { HabitCard } from '@/components/HabitCard';
import { ProgressRing } from '@/components/ProgressRing';
import { Button } from '@/components/Button';
import { useAppStore, useHabitsForToday, useLogForHabit } from '@/lib/store';
import { Habit, LogState } from '@/types';
import { formatFriendlyDate, today } from '@/lib/utils';

export default function TodayScreen() {
  const router = useRouter();
  const {
    profile,
    todayLogs,
    loadTodayLogs,
    loadHabits,
    toggleHabitDone,
    logHabitValue,
    logHabitState,
    isLoading,
  } = useAppStore();

  const habitsForToday = useHabitsForToday();
  const [refreshing, setRefreshing] = useState(false);
  const [valueModal, setValueModal] = useState<{
    habit: Habit;
    visible: boolean;
  } | null>(null);
  const [valueInput, setValueInput] = useState('');

  const todayStr = today();
  const doneCount = todayLogs.filter((l) => l.state === 'done').length;
  const todayHabitsCount = habitsForToday.length;
  const progress = todayHabitsCount > 0 ? doneCount / todayHabitsCount : 0;

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await Promise.all([loadHabits(), loadTodayLogs()]);
    setRefreshing(false);
  }, []);

  const handleToggle = useCallback(
    async (habitId: string) => {
      await toggleHabitDone(habitId);
    },
    [toggleHabitDone]
  );

  const handleIncrement = useCallback(
    async (habitId: string, value: number) => {
      await logHabitValue(habitId, value);
    },
    [logHabitValue]
  );

  const handleLongPress = useCallback(
    (habitId: string) => {
      router.push(`/habit/${habitId}`);
    },
    [router]
  );

  function openValueModal(habit: Habit) {
    setValueInput('');
    setValueModal({ habit, visible: true });
  }

  async function submitValue() {
    if (!valueModal) return;
    const num = parseFloat(valueInput);
    if (isNaN(num) || num <= 0) {
      Alert.alert('Valeur invalide', 'Entrez un nombre positif.');
      return;
    }
    await logHabitValue(valueModal.habit.id, num);
    setValueModal(null);
  }

  const allDone = doneCount === todayHabitsCount && todayHabitsCount > 0;

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={Colors.primary}
          />
        }
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>
              {getGreeting(profile?.name)}
            </Text>
            <Text style={styles.dateLabel}>{formatFriendlyDate(todayStr)}</Text>
          </View>

          {/* Daily progress ring */}
          <ProgressRing
            progress={progress}
            size={72}
            strokeWidth={5}
            color={allDone ? Colors.success : Colors.primary}
            label={`${doneCount}/${todayHabitsCount}`}
            sublabel="faites"
          />
        </View>

        {/* Progress banner */}
        {allDone && (
          <View style={styles.completedBanner}>
            <Text style={styles.completedText}>
              Toutes vos habitudes du jour sont complètes. Excellent travail.
            </Text>
          </View>
        )}

        {/* Habits list */}
        {habitsForToday.length === 0 ? (
          <EmptyState onAdd={() => router.push('/habit/new')} />
        ) : (
          <View style={styles.habitsList}>
            <Text style={styles.sectionTitle}>Habitudes du jour</Text>
            {habitsForToday.map((habit) => {
              const log = todayLogs.find((l) => l.habitId === habit.id);
              return (
                <HabitCard
                  key={habit.id}
                  habit={habit}
                  log={log}
                  onToggle={handleToggle}
                  onIncrement={handleIncrement}
                  onLongPress={handleLongPress}
                />
              );
            })}
          </View>
        )}

        {/* Quick add value button for habits with targets */}
        {habitsForToday.some((h) => h.targetValue != null && todayLogs.find((l) => l.habitId === h.id)?.state !== 'done') && (
          <View style={styles.quickActions}>
            <Text style={styles.sectionTitle}>Ajouter rapidement</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={styles.quickChips}>
                {habitsForToday
                  .filter((h) => h.targetValue != null && todayLogs.find((l) => l.habitId === h.id)?.state !== 'done')
                  .map((habit) => (
                    <Pressable
                      key={habit.id}
                      style={styles.quickChip}
                      onPress={() => openValueModal(habit)}
                    >
                      <Text style={styles.quickChipText}>
                        + {habit.targetUnit ?? 'unité'} · {habit.title}
                      </Text>
                    </Pressable>
                  ))}
              </View>
            </ScrollView>
          </View>
        )}

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Value Input Modal */}
      <Modal
        visible={!!valueModal?.visible}
        transparent
        animationType="fade"
        onRequestClose={() => setValueModal(null)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>{valueModal?.habit.title}</Text>
            <Text style={styles.modalSubtitle}>
              Combien de {valueModal?.habit.targetUnit ?? 'unités'} à ajouter ?
            </Text>
            <TextInput
              style={styles.modalInput}
              keyboardType="numeric"
              placeholder="Ex: 5"
              placeholderTextColor={Colors.textMuted}
              value={valueInput}
              onChangeText={setValueInput}
              autoFocus
            />
            <View style={styles.modalActions}>
              <Button label="Annuler" variant="ghost" onPress={() => setValueModal(null)} />
              <Button label="Ajouter" onPress={submitValue} />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function getGreeting(name?: string): string {
  const hour = new Date().getHours();
  const firstName = name?.split(' ')[0] ?? '';
  if (hour < 12) return `Bonjour${firstName ? ', ' + firstName : ''}.`;
  if (hour < 18) return `Bon après-midi${firstName ? ', ' + firstName : ''}.`;
  return `Bonsoir${firstName ? ', ' + firstName : ''}.`;
}

function EmptyState({ onAdd }: { onAdd: () => void }) {
  return (
    <View style={styles.emptyState}>
      <Text style={styles.emptyTitle}>Aucune habitude active</Text>
      <Text style={styles.emptySubtitle}>
        Ajoutez votre première habitude business pour commencer.
      </Text>
      <Button label="Ajouter une habitude" onPress={onAdd} style={{ marginTop: Spacing.lg }} />
    </View>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  scroll: { flex: 1 },
  scrollContent: { paddingHorizontal: Spacing.xl },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: Spacing.xxxl + Spacing.lg,
    paddingBottom: Spacing.xl,
  },
  greeting: {
    fontSize: Typography.xl,
    fontWeight: Typography.bold,
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  dateLabel: {
    fontSize: Typography.base,
    color: Colors.textSecondary,
  },
  completedBanner: {
    backgroundColor: Colors.success + '18',
    borderRadius: Radius.lg,
    borderWidth: 1,
    borderColor: Colors.success + '40',
    padding: Spacing.base,
    marginBottom: Spacing.lg,
  },
  completedText: {
    fontSize: Typography.sm,
    color: Colors.success,
    lineHeight: Typography.sm * 1.5,
  },
  habitsList: { gap: Spacing.xs },
  sectionTitle: {
    fontSize: Typography.xs,
    fontWeight: Typography.semibold,
    color: Colors.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: Spacing.md,
    marginTop: Spacing.base,
  },
  quickActions: { marginTop: Spacing.sm },
  quickChips: { flexDirection: 'row', gap: Spacing.sm, paddingBottom: Spacing.sm },
  quickChip: {
    backgroundColor: Colors.surfaceElevated,
    borderRadius: Radius.full,
    paddingHorizontal: Spacing.base,
    paddingVertical: Spacing.xs,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  quickChipText: { fontSize: Typography.sm, color: Colors.textSecondary },
  emptyState: {
    alignItems: 'center',
    paddingVertical: Spacing.xxxl,
    gap: Spacing.sm,
  },
  emptyTitle: { fontSize: Typography.lg, fontWeight: Typography.semibold, color: Colors.textPrimary },
  emptySubtitle: { fontSize: Typography.base, color: Colors.textSecondary, textAlign: 'center' },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spacing.xl,
  },
  modalCard: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.xl,
    padding: Spacing.xl,
    width: '100%',
    gap: Spacing.base,
  },
  modalTitle: { fontSize: Typography.md, fontWeight: Typography.bold, color: Colors.textPrimary },
  modalSubtitle: { fontSize: Typography.sm, color: Colors.textSecondary },
  modalInput: {
    backgroundColor: Colors.surfaceElevated,
    borderRadius: Radius.md,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: Spacing.base,
    fontSize: Typography.xl,
    color: Colors.textPrimary,
    textAlign: 'center',
  },
  modalActions: { flexDirection: 'row', justifyContent: 'flex-end', gap: Spacing.md },
});
