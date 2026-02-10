# CLAUDE.md - Tamini Chatbot WhatsApp

## Project Overview

Chatbot WhatsApp pour **Tamini Insurance**, première compagnie d'assurance Takaful (islamique) à Djibouti. Digitalise le parcours client : éducation Takaful, devis auto instantané, upload documents OCR, paiement Orange Money, génération attestation PDF.

**Stack:** Node.js + Express | PostgreSQL + Redis | Twilio WhatsApp | Dialogflow NLP | Google Vision OCR | Orange Money | PDFKit

## Project Structure

```
tamini-chatbot/
├── src/
│   ├── index.js                    # Express server entry point + routes
│   ├── config/
│   │   ├── twilio.js               # Twilio client init + signature validation
│   │   ├── database.js             # PostgreSQL pool + Redis client + schema init
│   │   └── apis.js                 # Orange Money, S3, HubSpot config objects
│   ├── controllers/
│   │   ├── webhookController.js    # Twilio + Orange Money webhook handlers + escalation
│   │   ├── messageRouter.js        # State machine: routes messages by conversation state
│   │   ├── devisController.js      # Sequential quote flow (type→marque→année→valeur→usage→sinistre)
│   │   ├── paiementController.js   # Orange Money payment initiation + success handler
│   │   └── documentController.js   # Document upload → OCR → validation
│   ├── services/
│   │   ├── dialogflowService.js    # NLP intent detection (local patterns fallback)
│   │   ├── pricingService.js       # Auto insurance pricing calculation (3 formulas)
│   │   ├── pdfService.js           # PDF generation: devis + attestation (PDFKit)
│   │   ├── ocrService.js           # Google Vision OCR + carte grise/permis parsing
│   │   ├── orangeMoneyService.js   # Orange Money API (mock mode when no key)
│   │   └── whatsappService.js      # Send messages/buttons/documents via Twilio
│   ├── utils/
│   │   ├── validators.js           # sanitizeInput, isValidPhone, parseValeur, detectLanguage
│   │   ├── formatters.js           # formatFDJ, formatDate, generatePolicyNumber
│   │   └── logger.js               # Winston structured logging
│   ├── templates/messages/
│   │   └── index.js                # Bilingual message templates (FR/AR) + getMessage()
│   └── dialogflow/
│       └── intents.json            # Dialogflow intent definitions for import
├── tests/
│   ├── unit/                       # Unit tests for services, utils, templates
│   └── integration/                # API endpoint tests (supertest)
├── docs/
├── assets/
├── .env.example                    # All environment variables with descriptions
├── .gitignore
└── package.json
```

## Key Commands

```bash
# Install dependencies
npm install

# Start server (production)
npm start

# Start with hot reload (development)
npm run dev

# Run all tests with coverage
npm test

# Run only unit tests
npm run test:unit

# Run only integration tests
npm run test:integration
```

## Architecture

### Conversation State Machine

The chatbot uses a Redis-backed state machine (`messageRouter.js`) to track each user's position in the flow:

```
IDLE → ONBOARDING → DEVIS_TYPE → DEVIS_MARQUE → DEVIS_ANNEE → DEVIS_VALEUR → DEVIS_USAGE → DEVIS_SINISTRE → DEVIS_RESULT → DOCS_UPLOAD → PAYMENT → IDLE
                                                                                                                    ↓
                                                                                                              AGENT_TAKEOVER
```

State is stored in Redis with 1h TTL: `conv:{phone}` → `{ state, data, lang }`

### Services

- **pricingService**: Calculates 3 formulas (Tiers/Tiers+/Tous Risques). Base = 3% vehicle value, adjusted by age, usage, claims history.
- **pdfService**: Generates A4 PDF quotes and attestations using PDFKit.
- **dialogflowService**: Local pattern-matching NLP with Dialogflow API as optional upgrade. 7 intents with FR/AR responses.
- **ocrService**: Google Vision OCR (mock mode without key). Parses carte grise (immatriculation, marque) and permis (nom, validité).
- **orangeMoneyService**: Payment creation/verification (mock mode without key).
- **whatsappService**: All outbound messaging through Twilio (mock mode without credentials).

### Mock/Standalone Mode

The app runs without external services (PostgreSQL, Redis, Twilio, Google Vision, Orange Money). Each service checks for credentials and falls back to mock mode, logging warnings. This allows full local development and testing.

### API Endpoints

| Method | Path                       | Description                         |
|--------|----------------------------|-------------------------------------|
| GET    | `/health`                  | Health check                        |
| POST   | `/webhooks/twilio`         | Incoming WhatsApp messages          |
| POST   | `/webhooks/orange-money`   | Payment confirmation callback       |

## Environment Variables

See `.env.example` for full list. Key groups:

- **Server**: `NODE_ENV`, `PORT`, `BASE_URL`
- **Database**: `DATABASE_URL` (PostgreSQL), `REDIS_URL`
- **Twilio**: `TWILIO_ACCOUNT_SID`, `TWILIO_AUTH_TOKEN`, `TWILIO_WHATSAPP_NUMBER`
- **Dialogflow**: `DIALOGFLOW_PROJECT_ID`, `DIALOGFLOW_KEY_PATH`
- **Google Vision**: `GOOGLE_VISION_KEY_PATH`
- **Orange Money**: `ORANGE_MONEY_API_URL`, `ORANGE_MONEY_MERCHANT_ID`, `ORANGE_MONEY_API_KEY`
- **AWS S3**: `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, `AWS_REGION`, `AWS_S3_BUCKET`

## Development Workflow

### Getting Started

1. `npm install`
2. `cp .env.example .env` (works in mock mode without filling values)
3. `npm run dev`
4. Send POST to `http://localhost:3000/webhooks/twilio` with `From=whatsapp:+25377123456&Body=Bonjour&NumMedia=0`

### Adding a New FAQ Intent

1. Add pattern + responses to `LOCAL_INTENTS` array in `src/services/dialogflowService.js`
2. Add matching entry in `src/dialogflow/intents.json` for Dialogflow sync
3. Add test in `tests/unit/dialogflowService.test.js`

### Adding a New Insurance Product

1. Add pricing logic in `src/services/pricingService.js`
2. Add PDF template in `src/services/pdfService.js`
3. Add menu option in `src/templates/messages/index.js`
4. Add controller for the flow in `src/controllers/`
5. Wire it into `messageRouter.js` state machine

## Conventions

- **JavaScript only** (no TypeScript) - keep it simple for MVP
- **Winston logging** - never use `console.log`, always `logger.info/error/debug`
- **All secrets in `.env`** - nothing hardcoded
- **Input validation** - use `sanitizeInput()` for all user text, `parseValeur()` for amounts
- **Bilingual messages** - always use `getMessage(key, lang)` from templates, never inline strings
- **Error handling** - try/catch in all controllers, log with Sentry context
- **No frameworks beyond Express** - no frontend frameworks, no GraphQL, no microservices
- **Monolith architecture** - single Node.js process for MVP

## Testing

- **Framework**: Jest
- **Unit tests**: `tests/unit/` - cover services (pricing, OCR, NLP, formatters, validators, messages)
- **Integration tests**: `tests/integration/` - cover webhook endpoints with supertest
- **Mock mode**: All external services (Twilio, Google Vision, Orange Money) have built-in mock modes for testing
- **Run**: `npm test` (with coverage report)

## Database Schema

Tables (auto-created in `src/config/database.js`):

- **users**: phone, language, name
- **conversations**: user_phone, state, state_data (JSONB)
- **messages**: user_phone, direction (inbound/outbound), content, message_type
- **devis**: user_phone, type, data (JSONB), tarifs (JSONB), pdf_url
- **contrats**: devis_id, user_phone, statut, transaction_id, numero_police, date_debut, date_fin
- **documents**: user_phone, type, ocr_data (JSONB), image_url, verified
