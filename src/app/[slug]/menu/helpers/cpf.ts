// Função para validar CPF em TypeScript
export const isValidCpf = (cpf: string): boolean => {
  // Remove pontos e traços do CPF para garantir que apenas os números sejam considerados
  cpf = cpf.replace(/[.-]/g, "");

  // Verifica se o CPF tem exatamente 11 dígitos e se não é uma sequência repetida (ex: 111.111.111-11)
  if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) {
    return false;
  }

  // Função auxiliar para calcular os dígitos verificadores do CPF
  const calcDigit = (factor: number) => {
    let total = 0;
    for (let i = 0; i < factor - 1; i++) {
      total += parseInt(cpf[i]) * (factor - i);
    }
    const remainder = (total * 10) % 11;
    return remainder === 10 ? 0 : remainder;
  };

  // Calcula o primeiro e o segundo dígito verificador
  const digit1 = calcDigit(10);
  const digit2 = calcDigit(11);

  // Retorna true se os dígitos calculados coincidirem com os dígitos fornecidos no CPF
  return digit1 === parseInt(cpf[9]) && digit2 === parseInt(cpf[10]);
};
