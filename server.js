
import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Load .env.local
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const envPath = path.resolve(__dirname, '.env.local');
if (fs.existsSync(envPath)) {
    const envConfig = fs.readFileSync(envPath, 'utf-8');
    envConfig.split('\n').forEach(line => {
        const parts = line.split('=');
        if (parts.length >= 2) {
            const key = parts[0].trim();
            const value = parts.slice(1).join('=').trim().replace(/^["']|["']$/g, '');
            process.env[key] = value;
        }
    });
}

const app = express();
app.use(cors());
app.use(express.json());

// Helper to load handlers dynamically
const getHandler = async (path) => {
    const module = await import(path);
    return module.default;
};

// Wrap Vercel handler for Express
const wrap = (importPath) => async (req, res) => {
    try {
        const handler = await getHandler(importPath);
        await handler(req, res);
    } catch (err) {
        console.error('Handler Error:', err);
        if (!res.headersSent) res.status(500).json({ error: err.message });
    }
};

app.get('/api/questions', wrap('./api/questions.js'));
app.post('/api/questions', wrap('./api/questions.js'));

app.get('/api/users', wrap('./api/users.js'));
app.post('/api/users', wrap('./api/users.js'));

app.get('/api/schools', wrap('./api/schools.js'));
app.post('/api/schools', wrap('./api/schools.js'));

app.get('/api/exam-results', wrap('./api/exam-results.js'));

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`🚀 API Server running on http://localhost:${PORT}`);
});
