// ─── Core Domain Types ───────────────────────────────────────────────────────

export type ActivityType =
  | 'freelance_dev'
  | 'coach'
  | 'marketing_agency'
  | 'content_creator'
  | 'consultant'
  | 'other';

export type GoalHorizon = '3months' | '6months' | '12months';

export type BusinessPriority = 'revenue' | 'audience' | 'organization' | 'mixed';

export type HabitType =
  | 'prospection'
  | 'content'
  | 'deep_work'
  | 'client_follow'
  | 'learning'
  | 'health_support';

export type HabitFrequency = 'daily' | 'x_per_week' | 'specific_days';

export type TimeSlot = 'morning' | 'afternoon' | 'evening' | 'flexible';

export type LogState = 'done' | 'partial' | 'missed';

// ─── User Profile ─────────────────────────────────────────────────────────────

export interface UserProfile {
  id: string;
  name: string;
  activityType: ActivityType;
  dailyTimeMinutes: number; // minutes available per day
  goalHorizon: GoalHorizon;
  priority: BusinessPriority;
  onboardingCompleted: boolean;
  notificationSlots: string[]; // e.g. ["08:00", "18:00"]
  createdAt: string;
}

// ─── Habit ────────────────────────────────────────────────────────────────────

export interface Habit {
  id: string;
  title: string;
  description?: string;
  type: HabitType;
  frequency: HabitFrequency;
  targetDays?: number[]; // 0=Mon … 6=Sun for specific_days
  timesPerWeek?: number; // for x_per_week
  targetValue?: number; // e.g. 10 (messages), 90 (minutes)
  targetUnit?: string; // 'messages' | 'minutes' | 'calls' | 'posts' | ...
  timeSlot: TimeSlot;
  linkedObjective?: string; // e.g. "Atteindre 5k€/mois de CA"
  isActive: boolean;
  routineId?: string;
  sortOrder: number;
  createdAt: string;
}

// ─── Habit Log ────────────────────────────────────────────────────────────────

export interface HabitLog {
  id: string;
  habitId: string;
  date: string; // YYYY-MM-DD
  state: LogState;
  value?: number; // actual value logged
  note?: string;
  createdAt: string;
}

// ─── AI Routine ───────────────────────────────────────────────────────────────

export interface RoutineHabit {
  title: string;
  description: string;
  type: HabitType;
  frequency: HabitFrequency;
  timesPerWeek?: number;
  targetValue?: number;
  targetUnit?: string;
  timeSlot: TimeSlot;
  linkedObjective: string;
}

export interface AIRoutine {
  id: string;
  name: string;
  tagline: string; // short value prop
  description: string;
  targetProfile: string;
  estimatedDailyMinutes: number;
  habits: RoutineHabit[];
}

// ─── AI Coach Report ──────────────────────────────────────────────────────────

export interface WeeklyCoachReport {
  weekStartDate: string; // YYYY-MM-DD
  overallScore: number; // 0-100
  completionRate: number; // 0-1
  strongPoints: string[];
  weakPoints: string[];
  suggestions: CoachSuggestion[];
  summary: string;
  generatedAt: string;
}

export interface CoachSuggestion {
  habitId?: string;
  habitTitle?: string;
  type: 'reduce_frequency' | 'change_timeslot' | 'lower_target' | 'add_habit' | 'remove_habit' | 'reframe';
  message: string;
}

// ─── Onboarding State ─────────────────────────────────────────────────────────

export interface OnboardingAnswers {
  name: string;
  activityType: ActivityType;
  dailyTimeMinutes: number;
  goalHorizon: GoalHorizon;
  priority: BusinessPriority;
  mainGoal: string; // free text, clarified by AI
}

// ─── Stats / Analytics ────────────────────────────────────────────────────────

export interface HabitStats {
  habitId: string;
  last7Days: DayCompletion[];
  last30Days: DayCompletion[];
  completionRateLast7: number; // 0-1
  completionRateLast30: number; // 0-1
  currentConsistencyStreak: number; // consecutive weeks with ≥ target days
  bestWeek: number; // max days completed in a single week
  totalLogged: number;
}

export interface DayCompletion {
  date: string; // YYYY-MM-DD
  state: LogState | 'none'; // 'none' = no log for that day
  value?: number;
}

// ─── Navigation Params ────────────────────────────────────────────────────────

export type RootStackParamList = {
  '(tabs)': undefined;
  'onboarding/index': undefined;
  'onboarding/routines': { routines: string }; // JSON stringified AIRoutine[]
  'habit/[id]': { id: string };
};
