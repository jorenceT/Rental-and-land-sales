const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const db = require('./db');

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT || 4000);

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.get('/api/health', async (_req, res) => {
  try {
    await db.query('SELECT 1');
    res.json({ ok: true, message: 'API and database are healthy' });
  } catch (error) {
    res.status(500).json({ ok: false, error: 'Database connection failed' });
  }
});

app.post('/api/users', async (req, res) => {
  const { fullName, email, phone, role } = req.body;

  if (!fullName || !email) {
    return res.status(400).json({ error: 'fullName and email are required.' });
  }

  try {
    const result = await db.query(
      `INSERT INTO users (full_name, email, phone, role)
       VALUES ($1, $2, $3, $4)
       RETURNING id, full_name, email, phone, role, created_at`,
      [fullName, email, phone || null, role || 'buyer']
    );

    return res.status(201).json(result.rows[0]);
  } catch (error) {
    if (error.code === '23505') {
      return res.status(409).json({ error: 'Email already exists.' });
    }

    return res.status(500).json({ error: 'Unable to save user details.' });
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
