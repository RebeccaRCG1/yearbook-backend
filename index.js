import express from 'express';
// 1. Adicione o import do logger bem aqui no topo:
import logger from './middlewares/logger.js';
import alunosRouter from './routes/alunos.js';

const app = express();
const PORT = 3000;

// IMPORTANTE: A ordem aqui importa muito!
app.use(express.json()); // 1º - parseia o JSON do body
app.use(logger);         // 2º - registra o log de cada requisição (coloque antes das rotas)

// --- Rotas ---
app.get('/', (req, res) => {
  res.json({ mensagem: 'Yearbook API está no ar! 🎓' });
});

app.get('/status', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date() });
});

app.use('/alunos', alunosRouter);

if (process.env.VERCEL !== '1') {
  app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
  });
}

export default app;