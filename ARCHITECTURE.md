# Tamini – Business Habit Tracker MVP

## Stack

| Layer | Technology | Why |
|-------|-----------|-----|
| Mobile | React Native + Expo | iOS + Android from one codebase, fastest iteration |
| Navigation | expo-router (file-based) | Clean, typed routes |
| Local DB | expo-sqlite v14 | Offline-first, zero backend cost for MVP |
| State | Zustand | Minimal, no boilerplate |
| AI | Google Gemini 1.5 Flash | Fast, cost-effective for text tasks |
| Notifications | expo-notifications | Built-in, no extra infra |

---

## Data Model (SQLite)

```
user_profile         Habit configuration + onboarding data
habits               Active business habits (max 10 recommended)
habit_logs           Daily tracking events (date + state + value)
coach_reports        AI-generated weekly feedback
```

---

## Screen Architecture

```
/ (index)            → Redirect based on onboarding state
/onboarding          → 6-step AI questionnaire
/onboarding/routines → Select from 3 AI-generated routines
/(tabs)/today        → Main habit tracking (1-2 taps)
/(tabs)/progress     → Week/month analytics (no streak obsession)
/(tabs)/coach        → AI weekly feedback
/habit/[id]          → Habit detail + edit (modal)
/habit/new           → Create habit (modal)
```

---

## AI Calls (Google Gemini 1.5 Flash)

### 1. Onboarding – Generate Routines
**Input:** User profile (activity, time, horizon, priority, goal)
**Output:** 3 complete routines with 3–5 habits each
**Frequency:** Once at signup

### 2. Weekly Coach Report
**Input:** Last 7 days of habit logs
**Output:** Score, strong/weak points, 2–3 concrete suggestions
**Frequency:** On demand (weekly)

### 3. Smart Notifications
**Input:** Today's pending habits, completion patterns
**Output:** Context-aware notification message (<80 chars)
**Frequency:** 1–2x daily at user-defined slots

---

## Design Principles

1. **1–2 taps max** to log a habit
2. **Consistency over streaks** – show "4/7 days" not "12-day streak"
3. **No guilt** – missed days are neutral, never punished
4. **Business-anchored** – every habit links to a business outcome
5. **No gamification** – no points, badges, avatars, XP

---

## User Stories

| # | As a... | I want... | So that... |
|---|---------|-----------|------------|
| 1 | Freelance | AI to propose a pre-built client acquisition routine | I don't start from a blank page |
| 2 | Creator | To see at a glance if I did my 3 priority tasks | I don't need to open multiple tools |
| 3 | Solopreneur | To log "5 LinkedIn messages sent" in 1 tap | It doesn't break my flow |
| 4 | Agency owner | To see my deep work consistency over 30 days | I can spot patterns and adjust |
| 5 | Coach | To get a weekly AI analysis of what's blocking me | I can improve week over week |
| 6 | Consultant | To not feel guilty if I miss 2 days | The app supports me, not punishes me |
| 7 | Creator | To know which business habit drives my revenue most | I can double down on what works |
| 8 | Freelance dev | To receive smart reminders at times I actually work | Notifications are useful, not spam |
| 9 | Solopreneur | To edit my habits as my business evolves | The app grows with me |
| 10 | Agency owner | To limit myself to 5–7 habits max | Avoid cognitive overload |

---

## Roadmap

### v1 (4–6 weeks) – Current MVP
- [x] AI onboarding with 3 routine options
- [x] Today screen (1-tap logging)
- [x] Progress screen (week/month)
- [x] AI weekly coach report
- [x] Habit CRUD
- [x] Smart notifications (2 slots)
- [x] SQLite offline storage

### v1.1 (weeks 7–10)
- [ ] Habit reordering (drag & drop)
- [ ] Widget (iOS/Android) – 1-tap from home screen
- [ ] Goal clarification AI flow
- [ ] Export data (CSV)
- [ ] Onboarding: fine-tune habits before starting
- [ ] Push notifications via Expo EAS

### v2 (months 3–6)
- [ ] Team mode (2–10 people, shared accountability)
- [ ] Revenue / pipeline tracker integration
- [ ] Calendar sync (block deep work time)
- [ ] Wearable integration (Apple Watch)

---

## Environment Setup

```bash
# 1. Clone and install
git clone ...
cd tamini
npm install

# 2. Set your Gemini API key
cp .env.example .env
# Edit .env: EXPO_PUBLIC_GEMINI_API_KEY=your_key

# 3. Run
npx expo start
```

Get your Gemini API key (free tier available): https://aistudio.google.com/app/apikey
