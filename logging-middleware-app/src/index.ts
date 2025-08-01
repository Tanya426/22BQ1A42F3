// src/index.ts
import express from 'express';
import { requestLogger } from './middleware';
import { Log } from './logger';

const app = express();
app.use(express.json());
app.use(requestLogger); // Use the logging middleware

app.get('/', async (req, res) => {
  await Log('backend', 'info', 'handler', 'Root route accessed');
  res.send('Welcome to Logging Middleware App!');
});

app.post('/login', async (req, res) => {
  const { username } = req.body;

  if (!username) {
    await Log('backend', 'error', 'handler', 'Login failed: missing username');
    return res.status(400).send('Username is required');
  }

  await Log('backend', 'info', 'handler', `Login attempted by user: ${username}`);
  res.send(`Hello, ${username}`);
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
