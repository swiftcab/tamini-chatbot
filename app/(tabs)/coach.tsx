/**
 * Coach IA Screen – Weekly AI feedback
 * Simple, actionable, no guilt
 */

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { Colors, Typography, Spacing, Radius } from '@/constants/theme';
import { Button } from '@/components/Button';
import { useAppStore } from '@/lib/store';
import { generateWeeklyCoachReport } from '@/lib/ai';
import { getLast7Days, getWeekStart, formatDate } from '@/lib/utils';
import * as db from '@/lib/db';
import { HabitLog, CoachSuggestion } from '@/types';
import { nanoid } from '@/lib/utils';

export default function CoachScreen() {
  const { habits, profile, latestReport, saveReport, loadLatestReport } = useAppStore();
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    loadLatestReport();
  }, []);

  async function generateReport() {
    if (habits.length === 0) {
      Alert.alert('Pas d\'habitudes', 'Ajoutez des habitudes avant de générer un bilan.');
      return;
    }

    setIsGenerating(true);
    try {
      const weekStart = getWeekStart();
      const last7 = getLast7Days();
      const logs = await db.getLogsForDateRange(last7[0], last7[6]);

      const reportData = await generateWeeklyCoachReport(
        habits,
        logs,
        weekStart,
        {
          activityType: profile?.activityType ?? 'consultant',
          priority: profile?.priority ?? 'mixed',
        }
      );

      const report = {
        ...reportData,
        weekStartDate: weekStart,
        generatedAt: new Date().toISOString(),
      };

      await saveReport(report);
    } catch (err: any) {
      Alert.alert(
        'Erreur',
        'Impossible de générer le bilan. Vérifiez votre connexion.',
        [{ text: 'OK' }]
      );
    } finally {
      setIsGenerating(false);
    }
  }

  const report = latestReport;
  const weekLabel = report
    ? `Semaine du ${formatDate(report.weekStartDate, 'd MMM')}`
    : null;

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Coach IA</Text>
        <Text style={styles.subtitle}>Bilan hebdomadaire de vos habitudes business</Text>
      </View>

      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent}>
        {/* Generate / Refresh button */}
        <View style={styles.generateRow}>
          <Button
            label={report ? 'Nouveau bilan' : 'Générer mon bilan'}
            onPress={generateReport}
            loading={isGenerating}
            variant={report ? 'secondary' : 'primary'}
          />
          {weekLabel && (
            <Text style={styles.weekLabel}>{weekLabel}</Text>
          )}
        </View>

        {isGenerating && (
          <View style={styles.loadingCard}>
            <ActivityIndicator color={Colors.primary} />
            <Text style={styles.loadingText}>
              Analyse de vos habitudes en cours...
            </Text>
          </View>
        )}

        {report && !isGenerating && (
          <>
            {/* Score */}
            <View style={styles.scoreCard}>
              <View style={styles.scoreLeft}>
                <Text style={styles.scoreLabel}>Score de la semaine</Text>
                <Text style={[
                  styles.scoreValue,
                  { color: getScoreColor(report.overallScore) }
                ]}>
                  {report.overallScore}
                  <Text style={styles.scoreMax}>/100</Text>
                </Text>
              </View>
              <View style={styles.completionPill}>
                <Text style={styles.completionText}>
                  {Math.round(report.completionRate * 100)}% de complétion
                </Text>
              </View>
            </View>

            {/* Summary */}
            <View style={styles.summaryCard}>
              <Text style={styles.cardLabel}>Résumé</Text>
              <Text style={styles.summaryText}>{report.summary}</Text>
            </View>

            {/* Strong points */}
            {report.strongPoints.length > 0 && (
              <View style={[styles.listCard, styles.greenCard]}>
                <Text style={[styles.cardLabel, { color: Colors.success }]}>
                  Ce qui a bien marché
                </Text>
                {report.strongPoints.map((point, i) => (
                  <PointRow key={i} text={point} type="strong" />
                ))}
              </View>
            )}

            {/* Weak points */}
            {report.weakPoints.length > 0 && (
              <View style={[styles.listCard, styles.amberCard]}>
                <Text style={[styles.cardLabel, { color: Colors.warning }]}>
                  Points d'attention
                </Text>
                {report.weakPoints.map((point, i) => (
                  <PointRow key={i} text={point} type="weak" />
                ))}
              </View>
            )}

            {/* Suggestions */}
            {report.suggestions.length > 0 && (
              <View style={styles.suggestionsSection}>
                <Text style={styles.sectionTitle}>Suggestions d'ajustement</Text>
                {report.suggestions.map((suggestion, i) => (
                  <SuggestionCard key={i} suggestion={suggestion} />
                ))}
              </View>
            )}

            <View style={styles.disclaimer}>
              <Text style={styles.disclaimerText}>
                Généré par IA · {formatDate(report.generatedAt, 'd MMM à HH:mm')}
              </Text>
            </View>
          </>
        )}

        {!report && !isGenerating && (
          <View style={styles.emptyState}>
            <Text style={styles.emptyTitle}>Votre coach IA est prêt</Text>
            <Text style={styles.emptyText}>
              Après quelques jours d'utilisation, générez votre premier bilan.
              L'IA analysera vos patterns et vous proposera des ajustements concrets.
            </Text>
          </View>
        )}

        <View style={{ height: 60 }} />
      </ScrollView>
    </View>
  );
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function PointRow({ text, type }: { text: string; type: 'strong' | 'weak' }) {
  return (
    <View style={styles.pointRow}>
      <Text style={styles.pointDot}>{type === 'strong' ? '▸' : '▸'}</Text>
      <Text style={styles.pointText}>{text}</Text>
    </View>
  );
}

function SuggestionCard({ suggestion }: { suggestion: CoachSuggestion }) {
  const typeIcons: Record<string, string> = {
    reduce_frequency: '↓',
    change_timeslot: '⏰',
    lower_target: '◎',
    add_habit: '+',
    remove_habit: '−',
    reframe: '↺',
  };

  return (
    <View style={styles.suggestionCard}>
      <View style={styles.suggestionIcon}>
        <Text style={styles.suggestionIconText}>{typeIcons[suggestion.type] ?? '•'}</Text>
      </View>
      <View style={{ flex: 1 }}>
        {suggestion.habitTitle && (
          <Text style={styles.suggestionHabit}>{suggestion.habitTitle}</Text>
        )}
        <Text style={styles.suggestionMessage}>{suggestion.message}</Text>
      </View>
    </View>
  );
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function getScoreColor(score: number): string {
  if (score >= 75) return Colors.success;
  if (score >= 50) return Colors.warning;
  return Colors.error;
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
  scroll: { flex: 1 },
  scrollContent: { padding: Spacing.xl, gap: Spacing.base },
  generateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: Spacing.base,
  },
  weekLabel: { fontSize: Typography.sm, color: Colors.textMuted },
  loadingCard: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.xl,
    padding: Spacing.xl,
    alignItems: 'center',
    gap: Spacing.base,
  },
  loadingText: { fontSize: Typography.base, color: Colors.textSecondary },
  scoreCard: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.xl,
    padding: Spacing.xl,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  scoreLeft: { gap: 4 },
  scoreLabel: { fontSize: Typography.sm, color: Colors.textMuted },
  scoreValue: { fontSize: 48, fontWeight: Typography.bold },
  scoreMax: { fontSize: Typography.lg, color: Colors.textMuted },
  completionPill: {
    backgroundColor: Colors.surfaceElevated,
    borderRadius: Radius.full,
    paddingHorizontal: Spacing.base,
    paddingVertical: Spacing.sm,
  },
  completionText: { fontSize: Typography.sm, color: Colors.textSecondary },
  summaryCard: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.xl,
    padding: Spacing.xl,
    gap: Spacing.sm,
  },
  cardLabel: {
    fontSize: Typography.xs,
    fontWeight: Typography.semibold,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    color: Colors.textMuted,
  },
  summaryText: { fontSize: Typography.base, color: Colors.textPrimary, lineHeight: Typography.base * 1.7 },
  listCard: {
    borderRadius: Radius.xl,
    padding: Spacing.xl,
    gap: Spacing.md,
    borderWidth: 1,
  },
  greenCard: {
    backgroundColor: Colors.success + '10',
    borderColor: Colors.success + '30',
  },
  amberCard: {
    backgroundColor: Colors.warning + '10',
    borderColor: Colors.warning + '30',
  },
  pointRow: { flexDirection: 'row', gap: Spacing.sm, alignItems: 'flex-start' },
  pointDot: { color: Colors.textMuted, marginTop: 2 },
  pointText: { flex: 1, fontSize: Typography.sm, color: Colors.textPrimary, lineHeight: Typography.sm * 1.6 },
  sectionTitle: {
    fontSize: Typography.xs,
    fontWeight: Typography.semibold,
    color: Colors.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  suggestionsSection: { gap: Spacing.sm },
  suggestionCard: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.lg,
    padding: Spacing.base,
    flexDirection: 'row',
    gap: Spacing.md,
    alignItems: 'flex-start',
  },
  suggestionIcon: {
    width: 32,
    height: 32,
    borderRadius: Radius.sm,
    backgroundColor: Colors.primary + '20',
    alignItems: 'center',
    justifyContent: 'center',
  },
  suggestionIconText: { color: Colors.primary, fontWeight: Typography.bold, fontSize: Typography.md },
  suggestionHabit: { fontSize: Typography.xs, color: Colors.primary, fontWeight: Typography.semibold, marginBottom: 3 },
  suggestionMessage: { fontSize: Typography.sm, color: Colors.textPrimary, lineHeight: Typography.sm * 1.6 },
  emptyState: { alignItems: 'center', gap: Spacing.base, paddingVertical: Spacing.xxl },
  emptyTitle: { fontSize: Typography.lg, fontWeight: Typography.semibold, color: Colors.textPrimary },
  emptyText: { fontSize: Typography.base, color: Colors.textSecondary, textAlign: 'center', lineHeight: Typography.base * 1.6 },
  disclaimer: { alignItems: 'center' },
  disclaimerText: { fontSize: Typography.xs, color: Colors.textMuted },
});
