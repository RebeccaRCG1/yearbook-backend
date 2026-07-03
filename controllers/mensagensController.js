import prisma from '../prisma/client.js'; // importa o singleton do Prisma

// GET /mensagens - lista todas as mensagens
export async function listarMensagens(req, res) {
  try {
    const mensagens = await prisma.mensagem.findMany({
      orderBy: { criadoEm: 'desc' }, // mais recentes primeiro
      include: {
        autor: {
          select: {
            nome: true,
            fotoUrl: true
          }
        }
      }
    });
    return res.json(mensagens);
  } catch (error) {
    return res.status(500).json({ error: "Erro ao listar mensagens" });
  }
}

// POST /mensagens - cria uma nova mensagem
export async function criarMensagem(req, res) {
  const { texto, autorId } = req.body;

  if (!texto) {
    return res.status(400).json({ error: "O texto da mensagem é obrigatório" });
  }

  try {
    const novaMensagem = await prisma.mensagem.create({
      data: { texto, autorId }
    });
    return res.status(201).json(novaMensagem);
  } catch (error) {
    return res.status(500).json({ error: "Erro ao criar mensagem" });
  }
}

// DELETE /mensagens/:id - deleta uma mensagem
export async function deletarMensagem(req, res) {
  const { id } = req.params;

  try {
    await prisma.mensagem.delete({
      where: { id: Number(id) }
    });
    return res.status(204).send();
  } catch (error) {
    return res.status(404).json({ error: "Mensagem não encontrada" });
  }
}
