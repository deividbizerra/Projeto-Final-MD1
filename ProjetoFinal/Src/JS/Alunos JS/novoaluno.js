// Seleciona o formulário de alunos
const formulario = document.getElementById("formAlunos");

// Função assíncrona para buscar todas as turmas
const buscarTurmas = async () => {
  const response = await fetch(
    `https://api-projetofinal-arnia-md1.onrender.com/turmas`
  );
  const turmaJson = await response.json();
  return turmaJson;
};

// Função para carregar as opções do select de turmas
const carregarSelect = async () => {
  // Busca todas as turmas usando a função "buscarTurmas"
  const turmas = await buscarTurmas();
  const turmaSelect = document.getElementById("turma");

  // Adiciona uma opção vazia para selecionar uma turma
  const opVazia = new Option("Selecione uma turma...", null);
  turmaSelect.options.add(opVazia);

  // Itera sobre as turmas e adiciona cada uma delas como uma opção no select
  turmas.forEach((turma) => {
    const opcoes = new Option(turma.turma);
    turmaSelect.options.add(opcoes);
  });
};

// Função assíncrona para cadastrar um novo aluno
const cadastrarNovoAluno = async (aluno) => {
  try {
    // Faz uma requisição POST para a API para cadastrar o novo aluno
    await fetch(`https://api-projetofinal-arnia-md1.onrender.com/alunos`, {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      // Inclui os dados do aluno no corpo da requisição, incluindo o nome, email e turma
      body: JSON.stringify(aluno),
    });
    // Redireciona o usuário de volta para a página de alunos após o cadastro
    window.location = "../Alunos/alunos.html";
  } catch (error) {
    console.log(error);
  }
};

// Adiciona um listener de evento para o evento "submit" do formulário "formAlunos"
formulario.addEventListener("submit", async (e) => {
  e.preventDefault();

  // Obtém os valores dos campos do formulário
  const nome = formulario.elements["nome"].value;
  const email = formulario.elements["email"].value;
  const turmaSelect = document.getElementById("turma");
  const turmaOption = turmaSelect.options[turmaSelect.selectedIndex];
  const turmaName = turmaOption.text;

  // Cria um objeto "aluno" com os valores dos campos do formulário
  const aluno = {
    nome,
    email,
    turma: turmaName,
  };

  // Chama a função "cadastrarNovoAluno" para cadastrar o novo aluno
  cadastrarNovoAluno(aluno);
});

// Chama a função para carregar as opções do select de turmas
carregarSelect();
