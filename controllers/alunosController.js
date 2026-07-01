import prisma from '../prisma/client.js'; // importa o singleton do Prisma

// select que omite senhaHash — reutilizado em todas as queries de alunos
const selectSemSenha = {
  id: true,
  nome: true,
  email: true,
  cidade: true,
  frase: true,
  planosFuturos: true,
  fotoUrl: true,
  role: true,
  criadoEm: true,
  // senhaHash NÃO está aqui — nunca retornado pela API
};

// GET /alunos — lista todos os alunos
export async function listarAlunos(req, res) {
  const alunos = await prisma.aluno.findMany({
    select: selectSemSenha, // retorna todos os campos EXCETO senhaHash
  });
  res.json(alunos); // responde com o array de alunos em JSON
}

// GET /alunos/:id — busca um aluno pelo ID
export async function buscarAluno(req, res) {
  const { id } = req.params; // extrai o :id da URL
  const aluno = await prisma.aluno.findUnique({
    where: { id: Number(id) }, // converte string → number
    select: selectSemSenha,    // omite senhaHash
  });

  if (!aluno) {
    return res.status(404).json({ erro: 'Aluno não encontrado' }); // null → 404
  }

  res.json(aluno); // retorna o aluno encontrado
}

// --- Stubs para o desafio do aluno ---

// 🎯 POST /alunos — cria um novo aluno
export async function criarAluno(req, res) {
  const { nome, email, senhaHash, cidade, frase, planosFuturos } = req.body;
    const novoAluno = await prisma.aluno.create({
      data: {
        nome: nome, 
        email: email, 
        senhaHash: senhaHash, 
        cidade: cidade, 
        frase: frase, 
        planosFuturos: planosFuturos
      },
      select: selectSemSenha,
    });
    res.status(201).json(novoAluno);
}

// 🎯 PUT /alunos/:id — atualiza um aluno existente
export async function atualizarAluno(req, res) {
  try {
    const { id } = req.params;
    const { nome, email, senhaHash, cidade, frase, planosFuturos } = req.body;
    const alunoAtualizado = await prisma.aluno.update({
      where: { id: Number(id) },
      data: {
        nome: nome, 
        email: email, 
        senhaHash: senhaHash, 
        cidade: cidade, 
        frase: frase, 
        planosFuturos: planosFuturos
      },
      select: selectSemSenha,
    });
    res.json(alunoAtualizado);
  } catch (erro) {
    res.status(404).json({ erro: 'Aluno não encontrado' });
  }
}

// 🎯 DELETE /alunos/:id — deleta um aluno
export async function deletarAluno(req, res) {
  try {
    const { id } = req.params;
    await prisma.aluno.delete({
      where: { id: Number(id) },
    });
    res.status(204).end();
  } catch (erro) {
    res.status(404).json({ erro: 'Aluno não encontrado' });
  }
}
