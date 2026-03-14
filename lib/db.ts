/**
 * Tamini – SQLite Database Layer
 * Uses expo-sqlite v14 (async API)
 */

import * as SQLite from 'expo-sqlite';
import { Habit, HabitLog, UserProfile, WeeklyCoachReport } from '@/types';

const DB_NAME = 'tamini.db';
const DB_VERSION = 1;

let _db: SQLite.SQLiteDatabase | null = null;

export async function getDb(): Promise<SQLite.SQLiteDatabase> {
  if (_db) return _db;
  _db = await SQLite.openDatabaseAsync(DB_NAME);
  await initSchema(_db);
  return _db;
}

// ─── Schema ──────────────────────────────────────────────────────────────────

async function initSchema(db: SQLite.SQLiteDatabase): Promise<void> {
  await db.execAsync(`PRAGMA journal_mode = WAL;`);

  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS user_profile (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL DEFAULT '',
      activity_type TEXT NOT NULL,
      daily_time_minutes INTEGER NOT NULL DEFAULT 60,
      goal_horizon TEXT NOT NULL DEFAULT '6months',
      priority TEXT NOT NULL DEFAULT 'mixed',
      onboarding_completed INTEGER NOT NULL DEFAULT 0,
      notification_slots TEXT NOT NULL DEFAULT '[]',
      created_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS habits (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      description TEXT,
      type TEXT NOT NULL,
      frequency TEXT NOT NULL,
      target_days TEXT,
      times_per_week INTEGER,
      target_value REAL,
      target_unit TEXT,
      time_slot TEXT NOT NULL DEFAULT 'flexible',
      linked_objective TEXT,
      is_active INTEGER NOT NULL DEFAULT 1,
      routine_id TEXT,
      sort_order INTEGER NOT NULL DEFAULT 0,
      created_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS habit_logs (
      id TEXT PRIMARY KEY,
      habit_id TEXT NOT NULL,
      date TEXT NOT NULL,
      state TEXT NOT NULL,
      value REAL,
      note TEXT,
      created_at TEXT NOT NULL,
      FOREIGN KEY (habit_id) REFERENCES habits(id) ON DELETE CASCADE,
      UNIQUE (habit_id, date)
    );

    CREATE TABLE IF NOT EXISTS coach_reports (
      id TEXT PRIMARY KEY,
      week_start_date TEXT NOT NULL,
      overall_score INTEGER NOT NULL DEFAULT 0,
      completion_rate REAL NOT NULL DEFAULT 0,
      strong_points TEXT NOT NULL DEFAULT '[]',
      weak_points TEXT NOT NULL DEFAULT '[]',
      suggestions TEXT NOT NULL DEFAULT '[]',
      summary TEXT NOT NULL DEFAULT '',
      generated_at TEXT NOT NULL
    );

    CREATE INDEX IF NOT EXISTS idx_habit_logs_date ON habit_logs(date);
    CREATE INDEX IF NOT EXISTS idx_habit_logs_habit_id ON habit_logs(habit_id);
  `);
}

// ─── User Profile ─────────────────────────────────────────────────────────────

export async function saveUserProfile(profile: UserProfile): Promise<void> {
  const db = await getDb();
  await db.runAsync(
    `INSERT OR REPLACE INTO user_profile
      (id, name, activity_type, daily_time_minutes, goal_horizon, priority,
       onboarding_completed, notification_slots, created_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      profile.id,
      profile.name,
      profile.activityType,
      profile.dailyTimeMinutes,
      profile.goalHorizon,
      profile.priority,
      profile.onboardingCompleted ? 1 : 0,
      JSON.stringify(profile.notificationSlots),
      profile.createdAt,
    ]
  );
}

export async function getUserProfile(): Promise<UserProfile | null> {
  const db = await getDb();
  const row = await db.getFirstAsync<any>('SELECT * FROM user_profile LIMIT 1');
  if (!row) return null;
  return rowToProfile(row);
}

function rowToProfile(row: any): UserProfile {
  return {
    id: row.id,
    name: row.name,
    activityType: row.activity_type,
    dailyTimeMinutes: row.daily_time_minutes,
    goalHorizon: row.goal_horizon,
    priority: row.priority,
    onboardingCompleted: row.onboarding_completed === 1,
    notificationSlots: JSON.parse(row.notification_slots || '[]'),
    createdAt: row.created_at,
  };
}

// ─── Habits ───────────────────────────────────────────────────────────────────

export async function createHabit(habit: Habit): Promise<void> {
  const db = await getDb();
  await db.runAsync(
    `INSERT INTO habits
      (id, title, description, type, frequency, target_days, times_per_week,
       target_value, target_unit, time_slot, linked_objective, is_active,
       routine_id, sort_order, created_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      habit.id,
      habit.title,
      habit.description ?? null,
      habit.type,
      habit.frequency,
      habit.targetDays ? JSON.stringify(habit.targetDays) : null,
      habit.timesPerWeek ?? null,
      habit.targetValue ?? null,
      habit.targetUnit ?? null,
      habit.timeSlot,
      habit.linkedObjective ?? null,
      habit.isActive ? 1 : 0,
      habit.routineId ?? null,
      habit.sortOrder,
      habit.createdAt,
    ]
  );
}

export async function updateHabit(habit: Partial<Habit> & { id: string }): Promise<void> {
  const db = await getDb();
  await db.runAsync(
    `UPDATE habits SET
      title = COALESCE(?, title),
      description = COALESCE(?, description),
      type = COALESCE(?, type),
      frequency = COALESCE(?, frequency),
      target_days = COALESCE(?, target_days),
      times_per_week = COALESCE(?, times_per_week),
      target_value = COALESCE(?, target_value),
      target_unit = COALESCE(?, target_unit),
      time_slot = COALESCE(?, time_slot),
      linked_objective = COALESCE(?, linked_objective),
      is_active = COALESCE(?, is_active),
      sort_order = COALESCE(?, sort_order)
    WHERE id = ?`,
    [
      habit.title ?? null,
      habit.description ?? null,
      habit.type ?? null,
      habit.frequency ?? null,
      habit.targetDays ? JSON.stringify(habit.targetDays) : null,
      habit.timesPerWeek ?? null,
      habit.targetValue ?? null,
      habit.targetUnit ?? null,
      habit.timeSlot ?? null,
      habit.linkedObjective ?? null,
      habit.isActive !== undefined ? (habit.isActive ? 1 : 0) : null,
      habit.sortOrder ?? null,
      habit.id,
    ]
  );
}

export async function deleteHabit(habitId: string): Promise<void> {
  const db = await getDb();
  await db.runAsync('DELETE FROM habits WHERE id = ?', [habitId]);
}

export async function getActiveHabits(): Promise<Habit[]> {
  const db = await getDb();
  const rows = await db.getAllAsync<any>(
    'SELECT * FROM habits WHERE is_active = 1 ORDER BY sort_order ASC'
  );
  return rows.map(rowToHabit);
}

export async function getHabitById(id: string): Promise<Habit | null> {
  const db = await getDb();
  const row = await db.getFirstAsync<any>('SELECT * FROM habits WHERE id = ?', [id]);
  return row ? rowToHabit(row) : null;
}

function rowToHabit(row: any): Habit {
  return {
    id: row.id,
    title: row.title,
    description: row.description ?? undefined,
    type: row.type,
    frequency: row.frequency,
    targetDays: row.target_days ? JSON.parse(row.target_days) : undefined,
    timesPerWeek: row.times_per_week ?? undefined,
    targetValue: row.target_value ?? undefined,
    targetUnit: row.target_unit ?? undefined,
    timeSlot: row.time_slot,
    linkedObjective: row.linked_objective ?? undefined,
    isActive: row.is_active === 1,
    routineId: row.routine_id ?? undefined,
    sortOrder: row.sort_order,
    createdAt: row.created_at,
  };
}

// ─── Habit Logs ───────────────────────────────────────────────────────────────

export async function upsertHabitLog(log: HabitLog): Promise<void> {
  const db = await getDb();
  await db.runAsync(
    `INSERT INTO habit_logs (id, habit_id, date, state, value, note, created_at)
     VALUES (?, ?, ?, ?, ?, ?, ?)
     ON CONFLICT (habit_id, date) DO UPDATE SET
       state = excluded.state,
       value = excluded.value,
       note = excluded.note`,
    [log.id, log.habitId, log.date, log.state, log.value ?? null, log.note ?? null, log.createdAt]
  );
}

export async function getLogsForDate(date: string): Promise<HabitLog[]> {
  const db = await getDb();
  const rows = await db.getAllAsync<any>(
    'SELECT * FROM habit_logs WHERE date = ?',
    [date]
  );
  return rows.map(rowToLog);
}

export async function getLogsForHabit(habitId: string, fromDate: string, toDate: string): Promise<HabitLog[]> {
  const db = await getDb();
  const rows = await db.getAllAsync<any>(
    'SELECT * FROM habit_logs WHERE habit_id = ? AND date >= ? AND date <= ? ORDER BY date DESC',
    [habitId, fromDate, toDate]
  );
  return rows.map(rowToLog);
}

export async function getLogsForDateRange(fromDate: string, toDate: string): Promise<HabitLog[]> {
  const db = await getDb();
  const rows = await db.getAllAsync<any>(
    'SELECT * FROM habit_logs WHERE date >= ? AND date <= ? ORDER BY date ASC',
    [fromDate, toDate]
  );
  return rows.map(rowToLog);
}

function rowToLog(row: any): HabitLog {
  return {
    id: row.id,
    habitId: row.habit_id,
    date: row.date,
    state: row.state,
    value: row.value ?? undefined,
    note: row.note ?? undefined,
    createdAt: row.created_at,
  };
}

// ─── Coach Reports ────────────────────────────────────────────────────────────

export async function saveCoachReport(report: WeeklyCoachReport & { id: string }): Promise<void> {
  const db = await getDb();
  await db.runAsync(
    `INSERT OR REPLACE INTO coach_reports
      (id, week_start_date, overall_score, completion_rate,
       strong_points, weak_points, suggestions, summary, generated_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      report.id,
      report.weekStartDate,
      report.overallScore,
      report.completionRate,
      JSON.stringify(report.strongPoints),
      JSON.stringify(report.weakPoints),
      JSON.stringify(report.suggestions),
      report.summary,
      report.generatedAt,
    ]
  );
}

export async function getLatestCoachReport(): Promise<WeeklyCoachReport | null> {
  const db = await getDb();
  const row = await db.getFirstAsync<any>(
    'SELECT * FROM coach_reports ORDER BY week_start_date DESC LIMIT 1'
  );
  if (!row) return null;
  return {
    weekStartDate: row.week_start_date,
    overallScore: row.overall_score,
    completionRate: row.completion_rate,
    strongPoints: JSON.parse(row.strong_points),
    weakPoints: JSON.parse(row.weak_points),
    suggestions: JSON.parse(row.suggestions),
    summary: row.summary,
    generatedAt: row.generated_at,
  };
}

// ─── Stats Helpers ────────────────────────────────────────────────────────────

export async function getWeeklyCompletionForHabit(
  habitId: string,
  weekStart: string
): Promise<number> {
  const db = await getDb();
  const result = await db.getFirstAsync<{ count: number }>(
    `SELECT COUNT(*) as count FROM habit_logs
     WHERE habit_id = ? AND date >= ? AND date < date(?, '+7 days')
     AND state = 'done'`,
    [habitId, weekStart, weekStart]
  );
  return result?.count ?? 0;
}
