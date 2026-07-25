import prisma from '../prisma/client.js';

// GET /mensagens - lista todas as mensagens (mais recentes primeiro, com dados do autor)
export async function listarMensagens(req, res, next) {
  try {
    const mensagens = await prisma.mensagem.findMany({
      orderBy: { criadoEm: 'desc' },
      include: {
        autor: {
          select: {
            nome: true,
            fotoUrl: true,
          },
        },
      },
    });
    res.json(mensagens);
  } catch (erro) {
    next(erro);
  }
}

// POST /mensagens - cria uma nova mensagem
export async function criarMensagem(req, res, next) {
  try {
    const { texto, imagemUrl, autorId } = req.body;

    // Validação: texto é obrigatório
    if (!texto) {
      return res.status(400).json({ erro: 'O campo texto é obrigatório' });
    }

    const novaMensagem = await prisma.mensagem.create({
      data: {
        texto,
        imagemUrl,
        autorId: Number(autorId), // Converte autorId para número inteiro
      },
    });

    res.status(201).json(novaMensagem);
  } catch (erro) {
    next(erro);
  }
}

// DELETE /mensagens/:id - deleta uma mensagem
export async function deletarMensagem(req, res, next) {
  try {
    const { id } = req.params;

    await prisma.mensagem.delete({
      where: { id: Number(id) },
    });

    res.status(204).end();
  } catch (erro) {
    res.status(404).json({ erro: 'Mensagem não encontrada' });
  }
}