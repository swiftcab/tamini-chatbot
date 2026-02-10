const { Pool } = require('pg');
const redis = require('redis');
const logger = require('../utils/logger');

let pool = null;
let redisClient = null;

async function initDatabase() {
  pool = new Pool({ connectionString: process.env.DATABASE_URL });

  pool.on('error', (err) => {
    logger.error('PostgreSQL pool error', { error: err.message });
  });

  await pool.query(`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      phone VARCHAR(20) UNIQUE NOT NULL,
      language VARCHAR(2) DEFAULT 'FR',
      name VARCHAR(255),
      created_at TIMESTAMP DEFAULT NOW(),
      updated_at TIMESTAMP DEFAULT NOW()
    );

    CREATE TABLE IF NOT EXISTS conversations (
      id SERIAL PRIMARY KEY,
      user_phone VARCHAR(20) NOT NULL,
      state VARCHAR(50) DEFAULT 'IDLE',
      state_data JSONB DEFAULT '{}',
      created_at TIMESTAMP DEFAULT NOW(),
      updated_at TIMESTAMP DEFAULT NOW()
    );

    CREATE TABLE IF NOT EXISTS messages (
      id SERIAL PRIMARY KEY,
      user_phone VARCHAR(20) NOT NULL,
      direction VARCHAR(10) NOT NULL CHECK(direction IN ('inbound', 'outbound')),
      content TEXT NOT NULL,
      message_type VARCHAR(20) DEFAULT 'text',
      created_at TIMESTAMP DEFAULT NOW()
    );

    CREATE TABLE IF NOT EXISTS devis (
      id SERIAL PRIMARY KEY,
      user_phone VARCHAR(20) NOT NULL,
      type VARCHAR(20) DEFAULT 'AUTO',
      data JSONB NOT NULL,
      tarifs JSONB NOT NULL,
      pdf_url TEXT,
      created_at TIMESTAMP DEFAULT NOW()
    );

    CREATE TABLE IF NOT EXISTS contrats (
      id SERIAL PRIMARY KEY,
      devis_id INTEGER REFERENCES devis(id),
      user_phone VARCHAR(20) NOT NULL,
      statut VARCHAR(20) DEFAULT 'PENDING',
      transaction_id VARCHAR(100),
      numero_police VARCHAR(20) UNIQUE,
      date_debut TIMESTAMP,
      date_fin TIMESTAMP,
      created_at TIMESTAMP DEFAULT NOW()
    );

    CREATE TABLE IF NOT EXISTS documents (
      id SERIAL PRIMARY KEY,
      user_phone VARCHAR(20) NOT NULL,
      type VARCHAR(30) NOT NULL,
      ocr_data JSONB,
      image_url TEXT,
      verified BOOLEAN DEFAULT FALSE,
      created_at TIMESTAMP DEFAULT NOW()
    );
  `);

  logger.info('PostgreSQL connected and tables initialized');
}

async function initRedis() {
  redisClient = redis.createClient({ url: process.env.REDIS_URL });

  redisClient.on('error', (err) => {
    logger.error('Redis client error', { error: err.message });
  });

  await redisClient.connect();
  logger.info('Redis connected');
}

function getPool() {
  return pool;
}

function getRedis() {
  return redisClient;
}

module.exports = { initDatabase, initRedis, getPool, getRedis };
