import { Router } from 'express';
import {
  listarMensagens,
  criarMensagem,
  deletarMensagem
} from '../controllers/mensagensController.js';

const router = Router();

// Note que aqui tiramos qualquer trava de autenticação para ir direto!
router.get('/', listarMensagens);
router.post('/', criarMensagem);
router.delete('/:id', deletarMensagem);

export default router;
