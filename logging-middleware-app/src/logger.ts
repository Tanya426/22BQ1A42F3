// src/logger.ts
import axios from 'axios';

type Stack = 'frontend' | 'backend';
type Level = 'info' | 'warn' | 'error' | 'debug' | 'fatal';
type Package = 'handler' | 'middleware' | 'db';

const LOG_API_URL = 'http://20.244.56.144/evaluation-service/logs';

export async function Log(stack: Stack, level: Level, pkg: Package, message: string) {
  try {
    const payload = { stack, level, package: pkg, message };

    await axios.post(LOG_API_URL, payload, {
      headers: {
        'Content-Type': 'application/json'
        // Add auth token here if required later
      }
    });

    console.log(`[${level.toUpperCase()}] [${pkg}] ${message}`);
  } catch (error) {
    console.error('Error sending log:', error);
  }
}
