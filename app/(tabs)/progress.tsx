/**
 * Progress Screen – Weekly + Monthly analytics
 * Focus: consistency metrics, not streaks
 * "4 jours sur 7" > "streak de 12 jours"
 */

import React, { useEffect, useMemo, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Pressable,
} from 'react-native';
import { Colors, Typography, Spacing, Radius, HabitTypeColors } from '@/constants/theme';
import { WeekGrid } from '@/components/WeekGrid';
import { HeatmapCalendar } from '@/components/HeatmapCalendar';
import { TypeBadge } from '@/components/TypeBadge';
import { useAppStore } from '@/lib/store';
import {
  getLast7Days,
  getLast30Days,
  getWeekStart,
  computeHabitStats,
} from '@/lib/utils';
import * as db from '@/lib/db';
import { HabitLog, HabitStats } from '@/types';

type TabKey = 'week' | 'month';

export default function ProgressScreen() {
  const { habits } = useAppStore();
  const [activeTab, setActiveTab] = useState<TabKey>('week');
  const [logs, setLogs] = useState<HabitLog[]>([]);
  const [statsMap, setStatsMap] = useState<Map<string, HabitStats>>(new Map());

  useEffect(() => {
    async function load() {
      const from = getLast30Days()[0];
      const to = getLast30Days()[29];
      const allLogs = await db.getLogsForDateRange(from, to);
      setLogs(allLogs);

      const map = new Map<string, HabitStats>();
      for (const habit of habits) {
        map.set(habit.id, computeHabitStats(habit, allLogs));
      }
      setStatsMap(map);
    }
    load();
  }, [habits]);

  const weekStart = getWeekStart();
  const last7 = getLast7Days();
  const last30 = getLast30Days();

  // Summary stats
  const weeklyOverall = useMemo(() => {
    if (habits.length === 0) return 0;
    const rates = habits.map((h) => {
      const stats = statsMap.get(h.id);
      return stats?.completionRateLast7 ?? 0;
    });
    return rates.reduce((a, b) => a + b, 0) / rates.length;
  }, [habits, statsMap]);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Progrès</Text>
        <Text style={styles.subtitle}>Votre constance business</Text>
      </View>

      {/* Tab switcher */}
      <View style={styles.tabRow}>
        {(['week', 'month'] as TabKey[]).map((tab) => (
          <Pressable
            key={tab}
            style={[styles.tab, activeTab === tab && styles.tabActive]}
            onPress={() => setActiveTab(tab)}
          >
            <Text style={[styles.tabLabel, activeTab === tab && styles.tabLabelActive]}>
              {tab === 'week' ? 'Cette semaine' : '30 derniers jours'}
            </Text>
          </Pressable>
        ))}
      </View>

      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent}>
        {/* Overall score card */}
        <View style={styles.scoreCard}>
          <View>
            <Text style={styles.scoreLabel}>Constance globale</Text>
            <Text style={styles.scoreValue}>
              {Math.round(weeklyOverall * 100)}
              <Text style={styles.scoreUnit}>%</Text>
            </Text>
            <Text style={styles.scoreHint}>
              {weeklyOverall >= 0.8
                ? 'Excellente constance. Maintenez le cap.'
                : weeklyOverall >= 0.5
                ? 'Bonne progression. Restez régulier.'
                : 'Démarrez doucement, la constance se construit.'}
            </Text>
          </View>
          <ConsistencyMeter value={weeklyOverall} />
        </View>

        {/* Per-habit breakdown */}
        <Text style={styles.sectionTitle}>Par habitude</Text>

        {habits.map((habit) => {
          const stats = statsMap.get(habit.id);
          if (!stats) return null;

          const accentColor = HabitTypeColors[habit.type] ?? Colors.primary;
          const expectedPerWeek =
            habit.frequency === 'daily'
              ? 7
              : habit.frequency === 'x_per_week'
              ? (habit.timesPerWeek ?? 3)
              : (habit.targetDays?.length ?? 3);

          const doneThisWeek = stats.last7Days.filter((d) => d.state === 'done').length;

          return (
            <View key={habit.id} style={styles.habitBlock}>
              <View style={styles.habitBlockHeader}>
                <View style={{ flex: 1, gap: 4 }}>
                  <Text style={styles.habitBlockTitle}>{habit.title}</Text>
                  <TypeBadge type={habit.type} />
                </View>
                <View style={styles.rateCircle}>
                  <Text style={[styles.rateText, { color: accentColor }]}>
                    {Math.round((activeTab === 'week' ? stats.completionRateLast7 : stats.completionRateLast30) * 100)}%
                  </Text>
                </View>
              </View>

              {activeTab === 'week' ? (
                <WeekGrid
                  days={stats.last7Days}
                  habitType={habit.type}
                  doneCount={doneThisWeek}
                  expectedCount={expectedPerWeek}
                />
              ) : (
                <HeatmapCalendar
                  days={stats.last30Days}
                  accentColor={accentColor}
                />
              )}

              {habit.linkedObjective && (
                <Text style={styles.habitObjective}>
                  Objectif : {habit.linkedObjective}
                </Text>
              )}
            </View>
          );
        })}

        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}

// ─── ConsistencyMeter ─────────────────────────────────────────────────────────

function ConsistencyMeter({ value }: { value: number }) {
  const segments = 5;
  const filled = Math.round(value * segments);

  return (
    <View style={styles.meterContainer}>
      {Array.from({ length: segments }, (_, i) => (
        <View
          key={i}
          style={[
            styles.meterSegment,
            {
              backgroundColor:
                i < filled
                  ? value >= 0.8
                    ? Colors.success
                    : value >= 0.5
                    ? Colors.warning
                    : Colors.error
                  : Colors.border,
            },
          ]}
        />
      ))}
    </View>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  header: {
    paddingHorizontal: Spacing.xl,
    paddingTop: Spacing.xxxl + Spacing.lg,
    paddingBottom: Spacing.base,
  },
  title: { fontSize: Typography.xxl, fontWeight: Typography.bold, color: Colors.textPrimary },
  subtitle: { fontSize: Typography.base, color: Colors.textSecondary, marginTop: 4 },
  tabRow: {
    flexDirection: 'row',
    paddingHorizontal: Spacing.xl,
    gap: Spacing.sm,
    marginBottom: Spacing.base,
  },
  tab: {
    paddingHorizontal: Spacing.base,
    paddingVertical: Spacing.sm,
    borderRadius: Radius.full,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  tabActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  tabLabel: { fontSize: Typography.sm, color: Colors.textSecondary, fontWeight: Typography.medium },
  tabLabelActive: { color: Colors.textInverse },
  scroll: { flex: 1 },
  scrollContent: { paddingHorizontal: Spacing.xl, gap: Spacing.lg },
  scoreCard: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.xl,
    padding: Spacing.xl,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  scoreLabel: { fontSize: Typography.sm, color: Colors.textMuted, marginBottom: 4 },
  scoreValue: { fontSize: Typography.xxxl, fontWeight: Typography.bold, color: Colors.textPrimary },
  scoreUnit: { fontSize: Typography.xl, color: Colors.textSecondary },
  scoreHint: { fontSize: Typography.xs, color: Colors.textSecondary, marginTop: 6, maxWidth: 200 },
  meterContainer: { gap: 6 },
  meterSegment: { width: 28, height: 8, borderRadius: 4 },
  sectionTitle: {
    fontSize: Typography.xs,
    fontWeight: Typography.semibold,
    color: Colors.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  habitBlock: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.xl,
    padding: Spacing.lg,
    gap: Spacing.base,
  },
  habitBlockHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  habitBlockTitle: { fontSize: Typography.base, fontWeight: Typography.semibold, color: Colors.textPrimary },
  rateCircle: {
    backgroundColor: Colors.surfaceElevated,
    borderRadius: Radius.lg,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
  },
  rateText: { fontSize: Typography.md, fontWeight: Typography.bold },
  habitObjective: { fontSize: Typography.xs, color: Colors.textMuted, fontStyle: 'italic' },
});
