import { format, subDays, startOfWeek, eachDayOfInterval, parseISO } from 'date-fns';
import { fr } from 'date-fns/locale';
import { HabitLog, Habit, DayCompletion, HabitStats } from '@/types';

// ─── ID Generation ────────────────────────────────────────────────────────────

export function nanoid(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2, 9);
}

// ─── Date Helpers ─────────────────────────────────────────────────────────────

export function today(): string {
  return format(new Date(), 'yyyy-MM-dd');
}

export function formatDate(date: string, fmt = 'dd MMM'): string {
  return format(parseISO(date), fmt, { locale: fr });
}

export function formatFriendlyDate(date: string): string {
  const d = parseISO(date);
  const t = new Date();
  const todayStr = format(t, 'yyyy-MM-dd');
  const yesterdayStr = format(subDays(t, 1), 'yyyy-MM-dd');

  if (date === todayStr) return "Aujourd'hui";
  if (date === yesterdayStr) return 'Hier';
  return format(d, 'EEEE d MMM', { locale: fr });
}

export function getLast7Days(): string[] {
  return Array.from({ length: 7 }, (_, i) =>
    format(subDays(new Date(), 6 - i), 'yyyy-MM-dd')
  );
}

export function getLast30Days(): string[] {
  return Array.from({ length: 30 }, (_, i) =>
    format(subDays(new Date(), 29 - i), 'yyyy-MM-dd')
  );
}

export function getWeekStart(date = new Date()): string {
  return format(startOfWeek(date, { weekStartsOn: 1 }), 'yyyy-MM-dd');
}

export function getDaysInWeek(weekStart: string): string[] {
  const start = parseISO(weekStart);
  return eachDayOfInterval({ start, end: subDays(new Date(), 0) })
    .slice(0, 7)
    .map((d) => format(d, 'yyyy-MM-dd'));
}

// ─── Stats Computation ────────────────────────────────────────────────────────

export function computeHabitStats(habit: Habit, allLogs: HabitLog[]): HabitStats {
  const habitLogs = allLogs.filter((l) => l.habitId === habit.id);
  const logMap = new Map(habitLogs.map((l) => [l.date, l]));

  const last7 = getLast7Days();
  const last30 = getLast30Days();

  const last7Days: DayCompletion[] = last7.map((date) => {
    const log = logMap.get(date);
    return { date, state: log?.state ?? 'none', value: log?.value };
  });

  const last30Days: DayCompletion[] = last30.map((date) => {
    const log = logMap.get(date);
    return { date, state: log?.state ?? 'none', value: log?.value };
  });

  const done7 = last7Days.filter((d) => d.state === 'done').length;
  const done30 = last30Days.filter((d) => d.state === 'done').length;

  const expectedPerWeek =
    habit.frequency === 'daily'
      ? 7
      : habit.frequency === 'x_per_week'
      ? (habit.timesPerWeek ?? 3)
      : (habit.targetDays?.length ?? 3);

  const expectedPer30 = (expectedPerWeek / 7) * 30;

  return {
    habitId: habit.id,
    last7Days,
    last30Days,
    completionRateLast7: expectedPerWeek > 0 ? done7 / expectedPerWeek : 0,
    completionRateLast30: expectedPer30 > 0 ? done30 / expectedPer30 : 0,
    currentConsistencyStreak: 0, // TODO: compute week streaks
    bestWeek: done7, // simplified
    totalLogged: habitLogs.filter((l) => l.state === 'done').length,
  };
}

// ─── Completion Helpers ───────────────────────────────────────────────────────

export function getCompletionColor(rate: number): string {
  if (rate >= 0.8) return '#10B981'; // green
  if (rate >= 0.5) return '#F59E0B'; // amber
  return '#5A5A72'; // muted
}

export function getCompletionLabel(done: number, expected: number): string {
  return `${done}/${expected} jours`;
}

// ─── Minutes Formatting ───────────────────────────────────────────────────────

export function formatMinutes(minutes: number): string {
  if (minutes < 60) return `${minutes} min`;
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return m > 0 ? `${h}h${m.toString().padStart(2, '0')}` : `${h}h`;
}
