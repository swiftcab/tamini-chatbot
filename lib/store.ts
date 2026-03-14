/**
 * Tamini – Global State (Zustand)
 * Thin layer over SQLite; handles today's session cache
 */

import { create } from 'zustand';
import { format } from 'date-fns';
import { nanoid } from './utils';
import {
  Habit,
  HabitLog,
  UserProfile,
  LogState,
  WeeklyCoachReport,
  AIRoutine,
  RoutineHabit,
} from '@/types';
import * as db from './db';

// ─── Types ────────────────────────────────────────────────────────────────────

interface AppState {
  // Auth / profile
  profile: UserProfile | null;
  isOnboarded: boolean;

  // Habits
  habits: Habit[];
  todayLogs: HabitLog[];
  todayDate: string;

  // Coach
  latestReport: WeeklyCoachReport | null;

  // UI
  isLoading: boolean;
  error: string | null;

  // Actions
  loadProfile: () => Promise<void>;
  saveProfile: (profile: UserProfile) => Promise<void>;

  loadHabits: () => Promise<void>;
  createHabit: (habit: Habit) => Promise<void>;
  updateHabit: (habit: Partial<Habit> & { id: string }) => Promise<void>;
  deleteHabit: (habitId: string) => Promise<void>;
  reorderHabits: (orderedIds: string[]) => Promise<void>;

  loadTodayLogs: () => Promise<void>;
  toggleHabitDone: (habitId: string) => Promise<void>;
  logHabitValue: (habitId: string, value: number) => Promise<void>;
  logHabitState: (habitId: string, state: LogState, value?: number) => Promise<void>;

  importRoutine: (routine: AIRoutine) => Promise<void>;

  loadLatestReport: () => Promise<void>;
  saveReport: (report: WeeklyCoachReport) => Promise<void>;

  clearError: () => void;
}

// ─── Store ────────────────────────────────────────────────────────────────────

export const useAppStore = create<AppState>((set, get) => ({
  profile: null,
  isOnboarded: false,
  habits: [],
  todayLogs: [],
  todayDate: format(new Date(), 'yyyy-MM-dd'),
  latestReport: null,
  isLoading: false,
  error: null,

  // ── Profile ──────────────────────────────────────────────────────────────

  loadProfile: async () => {
    set({ isLoading: true });
    try {
      const profile = await db.getUserProfile();
      set({
        profile,
        isOnboarded: profile?.onboardingCompleted ?? false,
        isLoading: false,
      });
    } catch (e: any) {
      set({ error: e.message, isLoading: false });
    }
  },

  saveProfile: async (profile: UserProfile) => {
    await db.saveUserProfile(profile);
    set({ profile, isOnboarded: profile.onboardingCompleted });
  },

  // ── Habits ───────────────────────────────────────────────────────────────

  loadHabits: async () => {
    set({ isLoading: true });
    try {
      const habits = await db.getActiveHabits();
      set({ habits, isLoading: false });
    } catch (e: any) {
      set({ error: e.message, isLoading: false });
    }
  },

  createHabit: async (habit: Habit) => {
    await db.createHabit(habit);
    set((s) => ({ habits: [...s.habits, habit].sort((a, b) => a.sortOrder - b.sortOrder) }));
  },

  updateHabit: async (habit: Partial<Habit> & { id: string }) => {
    await db.updateHabit(habit);
    set((s) => ({
      habits: s.habits.map((h) => (h.id === habit.id ? { ...h, ...habit } : h)),
    }));
  },

  deleteHabit: async (habitId: string) => {
    await db.deleteHabit(habitId);
    set((s) => ({ habits: s.habits.filter((h) => h.id !== habitId) }));
  },

  reorderHabits: async (orderedIds: string[]) => {
    const updates = orderedIds.map((id, index) =>
      db.updateHabit({ id, sortOrder: index })
    );
    await Promise.all(updates);
    set((s) => ({
      habits: [...s.habits].sort(
        (a, b) => orderedIds.indexOf(a.id) - orderedIds.indexOf(b.id)
      ),
    }));
  },

  // ── Today Logs ───────────────────────────────────────────────────────────

  loadTodayLogs: async () => {
    const today = format(new Date(), 'yyyy-MM-dd');
    const logs = await db.getLogsForDate(today);
    set({ todayLogs: logs, todayDate: today });
  },

  toggleHabitDone: async (habitId: string) => {
    const { todayLogs, todayDate } = get();
    const existing = todayLogs.find((l) => l.habitId === habitId);

    const newState: LogState =
      !existing || existing.state === 'missed' ? 'done' : 'missed';

    const log: HabitLog = {
      id: existing?.id ?? nanoid(),
      habitId,
      date: todayDate,
      state: newState,
      value: existing?.value,
      createdAt: new Date().toISOString(),
    };

    await db.upsertHabitLog(log);
    set((s) => ({
      todayLogs: [
        ...s.todayLogs.filter((l) => l.habitId !== habitId),
        log,
      ],
    }));
  },

  logHabitValue: async (habitId: string, value: number) => {
    const { todayLogs, todayDate } = get();
    const existing = todayLogs.find((l) => l.habitId === habitId);

    const newValue = (existing?.value ?? 0) + value;
    const habit = get().habits.find((h) => h.id === habitId);
    const newState: LogState =
      habit?.targetValue && newValue >= habit.targetValue ? 'done' : 'partial';

    const log: HabitLog = {
      id: existing?.id ?? nanoid(),
      habitId,
      date: todayDate,
      state: newState,
      value: newValue,
      createdAt: new Date().toISOString(),
    };

    await db.upsertHabitLog(log);
    set((s) => ({
      todayLogs: [
        ...s.todayLogs.filter((l) => l.habitId !== habitId),
        log,
      ],
    }));
  },

  logHabitState: async (habitId: string, state: LogState, value?: number) => {
    const { todayLogs, todayDate } = get();
    const existing = todayLogs.find((l) => l.habitId === habitId);

    const log: HabitLog = {
      id: existing?.id ?? nanoid(),
      habitId,
      date: todayDate,
      state,
      value: value ?? existing?.value,
      createdAt: new Date().toISOString(),
    };

    await db.upsertHabitLog(log);
    set((s) => ({
      todayLogs: [
        ...s.todayLogs.filter((l) => l.habitId !== habitId),
        log,
      ],
    }));
  },

  // ── Import Routine ────────────────────────────────────────────────────────

  importRoutine: async (routine: AIRoutine) => {
    const { createHabit } = get();
    const now = new Date().toISOString();

    const habitPromises = routine.habits.map((rh: RoutineHabit, index: number) => {
      const habit: Habit = {
        id: nanoid(),
        title: rh.title,
        description: rh.description,
        type: rh.type,
        frequency: rh.frequency,
        timesPerWeek: rh.timesPerWeek ?? undefined,
        targetValue: rh.targetValue ?? undefined,
        targetUnit: rh.targetUnit ?? undefined,
        timeSlot: rh.timeSlot,
        linkedObjective: rh.linkedObjective,
        isActive: true,
        routineId: routine.id,
        sortOrder: index,
        createdAt: now,
      };
      return createHabit(habit);
    });

    await Promise.all(habitPromises);
  },

  // ── Coach Reports ─────────────────────────────────────────────────────────

  loadLatestReport: async () => {
    const report = await db.getLatestCoachReport();
    set({ latestReport: report });
  },

  saveReport: async (report: WeeklyCoachReport) => {
    await db.saveCoachReport({ ...report, id: nanoid() });
    set({ latestReport: report });
  },

  clearError: () => set({ error: null }),
}));

// ─── Selectors ────────────────────────────────────────────────────────────────

export function useHabitsForToday() {
  const { habits, todayLogs, todayDate } = useAppStore();
  const dayOfWeek = new Date(todayDate + 'T12:00:00').getDay(); // 0=Sun
  // Normalize to Mon=0 … Sun=6
  const mondayBased = dayOfWeek === 0 ? 6 : dayOfWeek - 1;

  return habits.filter((h) => {
    if (!h.isActive) return false;
    if (h.frequency === 'daily') return true;
    if (h.frequency === 'specific_days') {
      return h.targetDays?.includes(mondayBased) ?? false;
    }
    // x_per_week: always show (user decides when)
    return true;
  });
}

export function useLogForHabit(habitId: string): HabitLog | undefined {
  const { todayLogs } = useAppStore();
  return todayLogs.find((l) => l.habitId === habitId);
}
