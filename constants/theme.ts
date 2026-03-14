// ─── Design System ────────────────────────────────────────────────────────────
// Professional, minimal, business-oriented

export const Colors = {
  // Backgrounds
  background: '#0A0A0F',
  surface: '#13131A',
  surfaceElevated: '#1C1C28',
  border: '#2A2A38',

  // Brand
  primary: '#4F7FFA', // Electric blue — action, CTA
  primaryLight: '#7BA3FF',
  primaryDark: '#2D5EE8',

  // Habit types
  prospection: '#F59E0B', // Amber — revenue
  content: '#8B5CF6',    // Purple — creation
  deep_work: '#4F7FFA',  // Blue — focus
  client_follow: '#10B981', // Green — delivery
  learning: '#06B6D4',   // Cyan — growth
  health_support: '#F87171', // Red — energy

  // Semantic
  success: '#10B981',
  warning: '#F59E0B',
  error: '#EF4444',
  partial: '#F59E0B',

  // Text
  textPrimary: '#F1F1F5',
  textSecondary: '#9191A8',
  textMuted: '#5A5A72',
  textInverse: '#0A0A0F',
} as const;

export const Typography = {
  // Font sizes
  xs: 11,
  sm: 13,
  base: 15,
  md: 17,
  lg: 20,
  xl: 24,
  xxl: 30,
  xxxl: 38,

  // Line heights
  tight: 1.2,
  normal: 1.5,
  relaxed: 1.7,

  // Weights
  regular: '400' as const,
  medium: '500' as const,
  semibold: '600' as const,
  bold: '700' as const,
} as const;

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  base: 16,
  lg: 20,
  xl: 24,
  xxl: 32,
  xxxl: 48,
} as const;

export const Radius = {
  sm: 6,
  md: 10,
  lg: 16,
  xl: 24,
  full: 9999,
} as const;

export const HabitTypeColors: Record<string, string> = {
  prospection: Colors.prospection,
  content: Colors.content,
  deep_work: Colors.deep_work,
  client_follow: Colors.client_follow,
  learning: Colors.learning,
  health_support: Colors.health_support,
};

export const HabitTypeLabels: Record<string, string> = {
  prospection: 'Prospection',
  content: 'Création de contenu',
  deep_work: 'Deep Work',
  client_follow: 'Suivi clients',
  learning: 'Formation',
  health_support: 'Énergie',
};

export const TimeSlotLabels: Record<string, string> = {
  morning: 'Matin',
  afternoon: 'Après-midi',
  evening: 'Soir',
  flexible: 'Flexible',
};

export const ActivityTypeLabels: Record<string, string> = {
  freelance_dev: 'Développeur freelance',
  coach: 'Coach / Consultant',
  marketing_agency: 'Agence marketing',
  content_creator: 'Créateur de contenu',
  consultant: 'Consultant indépendant',
  other: 'Autre',
};
