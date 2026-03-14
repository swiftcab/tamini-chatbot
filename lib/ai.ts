/**
 * Tamini – Google Gemini AI Integration
 * Handles: onboarding routines, weekly coach, goal clarification, smart notifications
 */

import { GoogleGenerativeAI, GenerationConfig } from '@google/generative-ai';
import Constants from 'expo-constants';
import {
  OnboardingAnswers,
  AIRoutine,
  WeeklyCoachReport,
  HabitLog,
  Habit,
  CoachSuggestion,
} from '@/types';

// API key stored in app.json > extra or env
const GEMINI_API_KEY =
  Constants.expoConfig?.extra?.geminiApiKey ?? process.env.EXPO_PUBLIC_GEMINI_API_KEY ?? '';

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

const defaultConfig: GenerationConfig = {
  temperature: 0.7,
  topK: 40,
  topP: 0.95,
  maxOutputTokens: 2048,
};

function getModel(temperature = 0.7) {
  return genAI.getGenerativeModel({
    model: 'gemini-1.5-flash',
    generationConfig: { ...defaultConfig, temperature },
  });
}

// ─── Utility ─────────────────────────────────────────────────────────────────

async function generateJSON<T>(prompt: string, temperature = 0.7): Promise<T> {
  const model = getModel(temperature);
  const result = await model.generateContent(
    `${prompt}\n\nIMPORTANT: Respond ONLY with valid JSON, no markdown, no explanation.`
  );
  const text = result.response.text().trim();
  // Strip possible markdown code fences
  const json = text.replace(/^```json?\s*/i, '').replace(/\s*```$/i, '');
  return JSON.parse(json) as T;
}

// ─── 1. Onboarding: Generate 3 Business Routines ─────────────────────────────

export async function generateRoutines(answers: OnboardingAnswers): Promise<AIRoutine[]> {
  const prompt = `
Tu es un expert en productivité business pour solopreneurs et freelances.

Profil utilisateur :
- Prénom : ${answers.name}
- Activité : ${answers.activityType}
- Temps disponible : ${answers.dailyTimeMinutes} minutes/jour
- Horizon d'objectif : ${answers.goalHorizon}
- Priorité business : ${answers.priority}
- Objectif principal (formulation libre) : "${answers.mainGoal}"

Ta mission : générer exactement 3 routines business différentes et complémentaires, adaptées à ce profil.

Chaque routine doit avoir :
- 3 à 5 habitudes concrètes et actionnables
- Une logique de progression réaliste (pas trop ambitieux)
- Un lien clair avec un impact business mesurable

Types d'habitudes possibles : prospection, content, deep_work, client_follow, learning, health_support
Fréquences possibles : daily, x_per_week, specific_days
Créneaux possibles : morning, afternoon, evening, flexible

Génère un JSON avec ce schéma exact :
[
  {
    "id": "routine_1",
    "name": "Nom court de la routine",
    "tagline": "Bénéfice en 1 phrase percutante",
    "description": "Description en 2-3 phrases du focus et de l'impact attendu",
    "targetProfile": "Pour qui c'est idéal",
    "estimatedDailyMinutes": 45,
    "habits": [
      {
        "title": "Titre court et actionnable",
        "description": "Ce que ça implique concrètement",
        "type": "prospection",
        "frequency": "daily",
        "timesPerWeek": null,
        "targetValue": 10,
        "targetUnit": "messages",
        "timeSlot": "morning",
        "linkedObjective": "Impact business direct"
      }
    ]
  }
]

Rends les noms des routines distinctifs et les habitudes ultra-concrètes (ex: "Envoyer 10 messages LinkedIn", pas "Faire de la prospection").
`;

  return generateJSON<AIRoutine[]>(prompt, 0.8);
}

// ─── 2. Goal Clarification ────────────────────────────────────────────────────

export async function clarifyGoal(vaguGoal: string, activityType: string): Promise<{
  clarifiedGoal: string;
  suggestedHabits: Array<{ title: string; why: string }>;
}> {
  const prompt = `
Tu es un coach business expert en productivité.

Un ${activityType} a exprimé cet objectif vague : "${vaguGoal}"

1. Reformule-le en objectif SMART (spécifique, mesurable, atteignable, en 3-6 mois).
2. Propose 3 habitudes actionnables qui permettent d'atteindre cet objectif.

JSON attendu :
{
  "clarifiedGoal": "Objectif SMART reformulé",
  "suggestedHabits": [
    { "title": "Habitude actionnable", "why": "Lien direct avec l'objectif" }
  ]
}
`;

  return generateJSON(prompt, 0.6);
}

// ─── 3. Weekly Coach Report ───────────────────────────────────────────────────

export async function generateWeeklyCoachReport(
  habits: Habit[],
  logs: HabitLog[],
  weekStartDate: string,
  userProfile: { activityType: string; priority: string }
): Promise<Omit<WeeklyCoachReport, 'weekStartDate' | 'generatedAt'>> {
  // Build summary data for the AI
  const habitsSummary = habits.map((h) => {
    const habitLogs = logs.filter((l) => l.habitId === h.id);
    const doneDays = habitLogs.filter((l) => l.state === 'done').length;
    const totalExpected = h.frequency === 'daily' ? 7 : (h.timesPerWeek ?? 3);
    const values = habitLogs.filter((l) => l.value != null).map((l) => l.value!);
    const avgValue = values.length > 0 ? values.reduce((a, b) => a + b, 0) / values.length : null;

    return {
      id: h.id,
      title: h.title,
      type: h.type,
      doneDays,
      totalExpected,
      completionRate: totalExpected > 0 ? doneDays / totalExpected : 0,
      avgValue,
      targetValue: h.targetValue,
      targetUnit: h.targetUnit,
      linkedObjective: h.linkedObjective,
    };
  });

  const overallRate =
    habitsSummary.length > 0
      ? habitsSummary.reduce((sum, h) => sum + h.completionRate, 0) / habitsSummary.length
      : 0;

  const prompt = `
Tu es un coach business bienveillant mais direct.

Profil utilisateur : ${userProfile.activityType}, priorité = ${userProfile.priority}
Semaine du : ${weekStartDate}

Données de la semaine :
${JSON.stringify(habitsSummary, null, 2)}

Taux de complétion global : ${Math.round(overallRate * 100)}%

Ta mission : générer un bilan hebdomadaire business, bienveillant mais factuel.
- PAS de culpabilisation si des habitudes ont été ratées
- Focus sur la progression et les patterns
- Suggestions concrètes et actionnables (pas génériques)
- Ton : mentor qui connaît le business

JSON attendu :
{
  "overallScore": 75,
  "completionRate": 0.75,
  "strongPoints": ["Ce qui a bien marché (2-3 points)"],
  "weakPoints": ["Ce qui a bloqué (1-2 points, formulé sans culpabilité)"],
  "suggestions": [
    {
      "habitId": "id ou null",
      "habitTitle": "titre ou null",
      "type": "reduce_frequency | change_timeslot | lower_target | add_habit | remove_habit | reframe",
      "message": "Suggestion concrète en 1-2 phrases"
    }
  ],
  "summary": "Paragraphe de 3-4 phrases : bilan de la semaine, momentum, cap pour la semaine prochaine"
}
`;

  const result = await generateJSON<{
    overallScore: number;
    completionRate: number;
    strongPoints: string[];
    weakPoints: string[];
    suggestions: CoachSuggestion[];
    summary: string;
  }>(prompt, 0.7);

  return result;
}

// ─── 4. Smart Notification Messages ──────────────────────────────────────────

export async function generateNotificationMessage(
  habitTitle: string,
  habitType: string,
  completedToday: number,
  totalToday: number,
  typicalSlipDay: string | null
): Promise<string> {
  const prompt = `
Tu es un coach business concis (max 80 caractères).

Contexte :
- Habitude à rappeler : "${habitTitle}" (type: ${habitType})
- Habitudes complétées aujourd'hui : ${completedToday}/${totalToday}
- Jour habituel de décrochage : ${typicalSlipDay ?? 'aucun pattern détecté'}

Génère UN message de notification court, motivant, ancré dans la réalité business.
Pas de clichés motivationnels. Pas de culpabilité. Concret et direct.

JSON : { "message": "Votre message ici" }
`;

  const result = await generateJSON<{ message: string }>(prompt, 0.9);
  return result.message;
}

// ─── 5. Routine Adjustment Suggestion ────────────────────────────────────────

export async function suggestRoutineAdjustment(
  habits: Array<{ title: string; completionRate: number; targetValue?: number }>,
  issue: string
): Promise<string> {
  const prompt = `
Coach business, réponse en 2-3 phrases max.

Habitudes actuelles et taux de complétion :
${habits.map((h) => `- ${h.title}: ${Math.round(h.completionRate * 100)}%`).join('\n')}

Problème soulevé : "${issue}"

Donne un conseil d'ajustement concret et actionnable.
JSON : { "advice": "Votre conseil" }
`;

  const result = await generateJSON<{ advice: string }>(prompt, 0.7);
  return result.advice;
}
