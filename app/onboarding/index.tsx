/**
 * Onboarding – Step-by-step AI questionnaire
 * 5 questions → calls Gemini → redirects to routine selection
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Pressable,
  TextInput,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Colors, Typography, Spacing, Radius } from '@/constants/theme';
import { Button } from '@/components/Button';
import { generateRoutines } from '@/lib/ai';
import { OnboardingAnswers, ActivityType, GoalHorizon, BusinessPriority, AIRoutine } from '@/types';
import { nanoid } from '@/lib/utils';
import { useAppStore } from '@/lib/store';

// ─── Step Definitions ────────────────────────────────────────────────────────

type Step = 'name' | 'activity' | 'time' | 'horizon' | 'priority' | 'goal';

const STEPS: Step[] = ['name', 'activity', 'time', 'horizon', 'priority', 'goal'];

const ACTIVITY_OPTIONS: { value: ActivityType; label: string; emoji: string }[] = [
  { value: 'freelance_dev', label: 'Dev freelance', emoji: '💻' },
  { value: 'coach', label: 'Coach / Consultant', emoji: '🎯' },
  { value: 'marketing_agency', label: 'Agence marketing', emoji: '📈' },
  { value: 'content_creator', label: 'Créateur de contenu', emoji: '🎬' },
  { value: 'consultant', label: 'Consultant indep.', emoji: '💼' },
  { value: 'other', label: 'Autre activité', emoji: '⚡' },
];

const TIME_OPTIONS = [
  { value: 30, label: '30 min', sub: 'Ultra-court' },
  { value: 60, label: '1 heure', sub: 'Essentiel' },
  { value: 90, label: '1h30', sub: 'Ambitieux' },
  { value: 120, label: '2h+', sub: 'Intensif' },
];

const HORIZON_OPTIONS: { value: GoalHorizon; label: string; sub: string }[] = [
  { value: '3months', label: '3 mois', sub: 'Résultats rapides' },
  { value: '6months', label: '6 mois', sub: 'Traction solide' },
  { value: '12months', label: '12 mois', sub: 'Transformation' },
];

const PRIORITY_OPTIONS: { value: BusinessPriority; label: string; sub: string; emoji: string }[] = [
  { value: 'revenue', label: 'Revenu', sub: 'CA et pipeline', emoji: '💰' },
  { value: 'audience', label: 'Audience', sub: 'Visibilité et reach', emoji: '📣' },
  { value: 'organization', label: 'Organisation', sub: 'Efficacité opérationnelle', emoji: '🗂️' },
  { value: 'mixed', label: 'Équilibré', sub: 'Un peu de tout', emoji: '⚖️' },
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function OnboardingScreen() {
  const router = useRouter();
  const { saveProfile } = useAppStore();

  const [currentStep, setCurrentStep] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);
  const [answers, setAnswers] = useState<Partial<OnboardingAnswers>>({});

  const step = STEPS[currentStep];
  const progress = (currentStep + 1) / STEPS.length;

  function setAnswer<K extends keyof OnboardingAnswers>(key: K, value: OnboardingAnswers[K]) {
    setAnswers((prev) => ({ ...prev, [key]: value }));
  }

  function canAdvance(): boolean {
    switch (step) {
      case 'name': return (answers.name?.trim().length ?? 0) > 0;
      case 'activity': return !!answers.activityType;
      case 'time': return !!answers.dailyTimeMinutes;
      case 'horizon': return !!answers.goalHorizon;
      case 'priority': return !!answers.priority;
      case 'goal': return (answers.mainGoal?.trim().length ?? 0) > 0;
      default: return false;
    }
  }

  async function handleNext() {
    if (!canAdvance()) return;

    if (currentStep < STEPS.length - 1) {
      setCurrentStep((s) => s + 1);
      return;
    }

    // Last step: generate routines
    setIsGenerating(true);
    try {
      const fullAnswers = answers as OnboardingAnswers;
      const routines = await generateRoutines(fullAnswers);

      // Save profile (not yet completed, waiting for routine selection)
      await saveProfile({
        id: nanoid(),
        name: fullAnswers.name,
        activityType: fullAnswers.activityType,
        dailyTimeMinutes: fullAnswers.dailyTimeMinutes,
        goalHorizon: fullAnswers.goalHorizon,
        priority: fullAnswers.priority,
        onboardingCompleted: false,
        notificationSlots: ['08:00', '19:00'],
        createdAt: new Date().toISOString(),
      });

      router.push({
        pathname: '/onboarding/routines',
        params: { routines: JSON.stringify(routines) },
      });
    } catch (err: any) {
      Alert.alert(
        'Erreur',
        'Impossible de générer vos routines. Vérifiez votre connexion et réessayez.',
        [{ text: 'OK' }]
      );
    } finally {
      setIsGenerating(false);
    }
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.brand}>Tamini</Text>
        <Text style={styles.stepIndicator}>{currentStep + 1} / {STEPS.length}</Text>
      </View>

      {/* Progress bar */}
      <View style={styles.progressTrack}>
        <View style={[styles.progressFill, { width: `${progress * 100}%` }]} />
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <StepContent
          step={step}
          answers={answers}
          setAnswer={setAnswer}
        />
      </ScrollView>

      {/* Footer */}
      <View style={styles.footer}>
        {currentStep > 0 && (
          <Button
            label="Retour"
            variant="ghost"
            onPress={() => setCurrentStep((s) => s - 1)}
            style={styles.backBtn}
          />
        )}
        <Button
          label={currentStep === STEPS.length - 1 ? 'Générer mes routines' : 'Continuer'}
          onPress={handleNext}
          disabled={!canAdvance()}
          loading={isGenerating}
          fullWidth={currentStep === 0}
          style={styles.nextBtn}
        />
      </View>
    </KeyboardAvoidingView>
  );
}

// ─── Step Content ─────────────────────────────────────────────────────────────

function StepContent({
  step,
  answers,
  setAnswer,
}: {
  step: Step;
  answers: Partial<OnboardingAnswers>;
  setAnswer: <K extends keyof OnboardingAnswers>(key: K, value: OnboardingAnswers[K]) => void;
}) {
  switch (step) {
    case 'name':
      return (
        <View style={styles.stepContainer}>
          <Text style={styles.stepTitle}>Bonjour 👋</Text>
          <Text style={styles.stepSubtitle}>
            Je suis votre coach IA business. Comment vous appelez-vous ?
          </Text>
          <TextInput
            style={styles.textInput}
            placeholder="Votre prénom"
            placeholderTextColor={Colors.textMuted}
            value={answers.name ?? ''}
            onChangeText={(v) => setAnswer('name', v)}
            autoFocus
            returnKeyType="done"
          />
        </View>
      );

    case 'activity':
      return (
        <View style={styles.stepContainer}>
          <Text style={styles.stepTitle}>Quelle est votre activité ?</Text>
          <Text style={styles.stepSubtitle}>
            Pour personnaliser vos routines business.
          </Text>
          <View style={styles.optionsGrid}>
            {ACTIVITY_OPTIONS.map((opt) => (
              <OptionCard
                key={opt.value}
                emoji={opt.emoji}
                label={opt.label}
                selected={answers.activityType === opt.value}
                onPress={() => setAnswer('activityType', opt.value)}
              />
            ))}
          </View>
        </View>
      );

    case 'time':
      return (
        <View style={styles.stepContainer}>
          <Text style={styles.stepTitle}>Temps dispo par jour ?</Text>
          <Text style={styles.stepSubtitle}>
            Pour vos habitudes business (hors travail client).
          </Text>
          <View style={styles.optionsList}>
            {TIME_OPTIONS.map((opt) => (
              <OptionRow
                key={opt.value}
                label={opt.label}
                sub={opt.sub}
                selected={answers.dailyTimeMinutes === opt.value}
                onPress={() => setAnswer('dailyTimeMinutes', opt.value)}
              />
            ))}
          </View>
        </View>
      );

    case 'horizon':
      return (
        <View style={styles.stepContainer}>
          <Text style={styles.stepTitle}>Horizon de votre objectif ?</Text>
          <Text style={styles.stepSubtitle}>
            Sur quelle durée voulez-vous mesurer votre progression ?
          </Text>
          <View style={styles.optionsList}>
            {HORIZON_OPTIONS.map((opt) => (
              <OptionRow
                key={opt.value}
                label={opt.label}
                sub={opt.sub}
                selected={answers.goalHorizon === opt.value}
                onPress={() => setAnswer('goalHorizon', opt.value)}
              />
            ))}
          </View>
        </View>
      );

    case 'priority':
      return (
        <View style={styles.stepContainer}>
          <Text style={styles.stepTitle}>Priorité business n°1 ?</Text>
          <Text style={styles.stepSubtitle}>
            Votre focus principal pour les prochains mois.
          </Text>
          <View style={styles.optionsGrid}>
            {PRIORITY_OPTIONS.map((opt) => (
              <OptionCard
                key={opt.value}
                emoji={opt.emoji}
                label={opt.label}
                sub={opt.sub}
                selected={answers.priority === opt.value}
                onPress={() => setAnswer('priority', opt.value)}
              />
            ))}
          </View>
        </View>
      );

    case 'goal':
      return (
        <View style={styles.stepContainer}>
          <Text style={styles.stepTitle}>Votre objectif en quelques mots ?</Text>
          <Text style={styles.stepSubtitle}>
            Dites-le librement, l'IA le clarifiera. Ex: "Trouver 3 clients B2B d'ici 6 mois"
          </Text>
          <TextInput
            style={[styles.textInput, styles.textArea]}
            placeholder="Décrivez votre objectif business principal..."
            placeholderTextColor={Colors.textMuted}
            value={answers.mainGoal ?? ''}
            onChangeText={(v) => setAnswer('mainGoal', v)}
            multiline
            numberOfLines={4}
            textAlignVertical="top"
          />
        </View>
      );

    default:
      return null;
  }
}

// ─── Subcomponents ────────────────────────────────────────────────────────────

function OptionCard({
  emoji,
  label,
  sub,
  selected,
  onPress,
}: {
  emoji: string;
  label: string;
  sub?: string;
  selected: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable
      style={[styles.optionCard, selected && styles.optionCardSelected]}
      onPress={onPress}
    >
      <Text style={styles.optionEmoji}>{emoji}</Text>
      <Text style={[styles.optionCardLabel, selected && styles.optionSelectedLabel]}>{label}</Text>
      {sub && <Text style={styles.optionCardSub}>{sub}</Text>}
    </Pressable>
  );
}

function OptionRow({
  label,
  sub,
  selected,
  onPress,
}: {
  label: string;
  sub: string;
  selected: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable
      style={[styles.optionRow, selected && styles.optionRowSelected]}
      onPress={onPress}
    >
      <View style={{ flex: 1 }}>
        <Text style={[styles.optionRowLabel, selected && styles.optionSelectedLabel]}>{label}</Text>
        <Text style={styles.optionRowSub}>{sub}</Text>
      </View>
      <View style={[styles.radio, selected && styles.radioSelected]}>
        {selected && <View style={styles.radioInner} />}
      </View>
    </Pressable>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.xl,
    paddingTop: Spacing.xxxl + Spacing.lg,
    paddingBottom: Spacing.base,
  },
  brand: {
    fontSize: Typography.lg,
    fontWeight: Typography.bold,
    color: Colors.primary,
    letterSpacing: 0.5,
  },
  stepIndicator: {
    fontSize: Typography.sm,
    color: Colors.textMuted,
  },
  progressTrack: {
    height: 2,
    backgroundColor: Colors.border,
    marginHorizontal: Spacing.xl,
  },
  progressFill: {
    height: '100%',
    backgroundColor: Colors.primary,
    borderRadius: Radius.full,
  },
  scroll: { flex: 1 },
  scrollContent: { padding: Spacing.xl, paddingTop: Spacing.xxl },
  stepContainer: { gap: Spacing.lg },
  stepTitle: {
    fontSize: Typography.xxl,
    fontWeight: Typography.bold,
    color: Colors.textPrimary,
    lineHeight: Typography.xxl * 1.2,
  },
  stepSubtitle: {
    fontSize: Typography.base,
    color: Colors.textSecondary,
    lineHeight: Typography.base * 1.6,
  },
  textInput: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.md,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: Spacing.base,
    fontSize: Typography.md,
    color: Colors.textPrimary,
    marginTop: Spacing.sm,
  },
  textArea: { minHeight: 120, paddingTop: Spacing.base },
  optionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.md,
    marginTop: Spacing.sm,
  },
  optionCard: {
    width: '47%',
    backgroundColor: Colors.surface,
    borderRadius: Radius.lg,
    borderWidth: 1.5,
    borderColor: Colors.border,
    padding: Spacing.base,
    gap: Spacing.xs,
  },
  optionCardSelected: {
    borderColor: Colors.primary,
    backgroundColor: Colors.primary + '15',
  },
  optionEmoji: { fontSize: 24 },
  optionCardLabel: { fontSize: Typography.sm, fontWeight: Typography.semibold, color: Colors.textPrimary },
  optionCardSub: { fontSize: Typography.xs, color: Colors.textMuted },
  optionSelectedLabel: { color: Colors.primary },
  optionsList: { gap: Spacing.sm, marginTop: Spacing.sm },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderRadius: Radius.lg,
    borderWidth: 1.5,
    borderColor: Colors.border,
    padding: Spacing.base,
  },
  optionRowSelected: {
    borderColor: Colors.primary,
    backgroundColor: Colors.primary + '15',
  },
  optionRowLabel: { fontSize: Typography.base, fontWeight: Typography.semibold, color: Colors.textPrimary },
  optionRowSub: { fontSize: Typography.sm, color: Colors.textMuted, marginTop: 2 },
  radio: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: Colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioSelected: { borderColor: Colors.primary },
  radioInner: { width: 10, height: 10, borderRadius: 5, backgroundColor: Colors.primary },
  footer: {
    flexDirection: 'row',
    gap: Spacing.md,
    padding: Spacing.xl,
    paddingBottom: Spacing.xxxl,
  },
  backBtn: { flex: 0, minWidth: 80 },
  nextBtn: { flex: 1 },
});
