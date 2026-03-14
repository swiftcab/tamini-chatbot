/**
 * HeatmapCalendar – 30-day habit activity heatmap
 * Shows consistency patterns without streak obsession
 */

import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { DayCompletion } from '@/types';
import { Colors, Typography, Spacing, Radius } from '@/constants/theme';
import { parseISO, format, startOfMonth, getDaysInMonth, getDay } from 'date-fns';
import { fr } from 'date-fns/locale';

const MONTH_LABELS = ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Jun', 'Jul', 'Aoû', 'Sep', 'Oct', 'Nov', 'Déc'];
const WEEK_DAYS = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];

interface HeatmapCalendarProps {
  days: DayCompletion[];
  accentColor: string;
}

export function HeatmapCalendar({ days, accentColor }: HeatmapCalendarProps) {
  const dayMap = new Map(days.map((d) => [d.date, d]));

  // Build last 28 days in a 4-week grid
  const today = new Date();
  const cells: Array<{ date: string; state: DayCompletion['state'] }> = [];

  for (let i = 27; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const dateStr = format(d, 'yyyy-MM-dd');
    const day = dayMap.get(dateStr);
    cells.push({ date: dateStr, state: day?.state ?? 'none' });
  }

  // Group into weeks (7 per row)
  const weeks: typeof cells[] = [];
  for (let i = 0; i < cells.length; i += 7) {
    weeks.push(cells.slice(i, i + 7));
  }

  return (
    <View style={styles.container}>
      {/* Day labels */}
      <View style={styles.dayLabels}>
        {WEEK_DAYS.map((d, i) => (
          <Text key={i} style={styles.dayLabel}>{d}</Text>
        ))}
      </View>

      {/* Grid */}
      <View style={styles.grid}>
        {weeks.map((week, wi) => (
          <View key={wi} style={styles.week}>
            {week.map((cell, di) => (
              <View
                key={cell.date}
                style={[styles.cell, { backgroundColor: getCellColor(cell.state, accentColor) }]}
              />
            ))}
          </View>
        ))}
      </View>

      {/* Legend */}
      <View style={styles.legend}>
        <Text style={styles.legendLabel}>Moins</Text>
        {[0, 0.3, 0.6, 1].map((opacity, i) => (
          <View
            key={i}
            style={[
              styles.legendCell,
              {
                backgroundColor:
                  opacity === 0 ? Colors.surfaceElevated : accentColor + Math.round(opacity * 255).toString(16).padStart(2, '0'),
              },
            ]}
          />
        ))}
        <Text style={styles.legendLabel}>Plus</Text>
      </View>
    </View>
  );
}

function getCellColor(state: DayCompletion['state'], accentColor: string): string {
  switch (state) {
    case 'done': return accentColor;
    case 'partial': return accentColor + '66';
    case 'missed': return Colors.surfaceElevated;
    default: return Colors.border + '40';
  }
}

const CELL_SIZE = 32;
const CELL_GAP = 4;

const styles = StyleSheet.create({
  container: {
    gap: Spacing.sm,
  },
  dayLabels: {
    flexDirection: 'row',
    gap: CELL_GAP,
  },
  dayLabel: {
    width: CELL_SIZE,
    textAlign: 'center',
    fontSize: 10,
    color: Colors.textMuted,
    fontWeight: Typography.medium,
  },
  grid: {
    gap: CELL_GAP,
  },
  week: {
    flexDirection: 'row',
    gap: CELL_GAP,
  },
  cell: {
    width: CELL_SIZE,
    height: CELL_SIZE,
    borderRadius: Radius.sm,
  },
  legend: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: Spacing.xs,
  },
  legendCell: {
    width: 12,
    height: 12,
    borderRadius: 2,
  },
  legendLabel: {
    fontSize: 10,
    color: Colors.textMuted,
  },
});
