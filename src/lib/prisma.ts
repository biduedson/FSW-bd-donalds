// Importa o PrismaClient da biblioteca @prisma/client para interagir com o banco de dados
import { PrismaClient } from "@prisma/client";

// Declara uma variável global chamada `cachedPrisma` para armazenar uma instância do PrismaClient
// Isso impede a criação de múltiplas instâncias em ambiente de desenvolvimento (Hot Reload no Next.js)
declare global {
  //eslint-disable-next-line no-var
  var cachedPrisma: PrismaClient; // Define uma variável global para armazenar o PrismaClient
}

// Declara a variável prisma para armazenar a instância do PrismaClient
let prisma: PrismaClient;

// Verifica se o ambiente é de produção
if (process.env.NODE_ENV === "production") {
  // Em produção, cria uma nova instância do PrismaClient normalmente
  prisma = new PrismaClient();
} else {
  // Se não estiver em produção (ou seja, ambiente de desenvolvimento)
  // Verifica se já existe uma instância armazenada na variável global
  if (!global.cachedPrisma) {
    // Se não existir, cria uma nova instância do PrismaClient e a armazena na variável global
    global.cachedPrisma = new PrismaClient();
  }

  // Usa a instância global existente para evitar múltiplas conexões ao banco
  prisma = global.cachedPrisma;
}

// Exporta a instância do Prisma para ser utilizada em toda a aplicação
export const db = prisma;
