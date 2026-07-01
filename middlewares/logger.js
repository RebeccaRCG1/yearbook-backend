export default function logger(req, res, next) {
  // 1. Marca o início da requisição em milissegundos
  const inicio = Date.now(); 
  
  const agora = new Date().toISOString();     
  const metodo = req.method;                  
  const url = req.originalUrl;                 

  // 2. Aguarda a resposta terminar de ser enviada
  res.on('finish', () => {
    // 3. Calcula o tempo total gasto
    const duracao = Date.now() - inicio;
    
    // 4. Pega o status code final (ex: 200, 404)
    const status = res.statusCode; 

    // 5. Exibe exatamente no formato do slide: [DATA] METODO URL -> STATUS (TEMPOms)
    console.log(`[${agora}] ${metodo} ${url} -> ${status} (${duracao}ms)`);
  });

  // 6. Segue o fluxo
  next();                                     
}