// Seleciona o formulário de alunos
const formulario = document.getElementById("formAlunos");
const Erroname = document.querySelector("#nome");
const Erroemail = document.querySelector("#email");
const ErroTurma = document.querySelector("#turma");
const perfil = document.querySelector("#perfil");

// Recupera o ID do usuário da URL
const urlParams = new URLSearchParams(window.location.search);
const usuarioId = urlParams.get("id");

// Função para exibir o perfil do usuário
const mostrarPerfil = (dados) => {
  perfil.innerHTML = `
    <h3>${dados.nome}</h3>
    <p>${dados.email}</p>
  `;
};

// Função assíncrona para buscar os usuários da API
const buscarUsuarios = async () => {
  try {
    // Recupera o ID do usuário do localStorage
    const usuarioId = localStorage.getItem("idUsuario");

    // Faz uma requisição GET para a API para buscar os usuários
    const response = await fetch(
      `https://api-projetofinal-arnia-md1.onrender.com/usuarios`
    );
    const usuariosJson = await response.json();

    // Chama a função mostrarPerfil passando os dados do usuário encontrado
    const usuarioEncontrado = usuariosJson.find(
      (usuario) => usuario.id === parseInt(usuarioId)
    );
    if (usuarioEncontrado) {
      mostrarPerfil(usuarioEncontrado);
    }
  } catch (error) {
    console.log(error);
  }
};
buscarUsuarios();

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
  console.log(turmaName);

  if (nome !== "" && email !== "" && turmaName !== "Selecione uma turma...") {
    const aluno = {
      nome,
      email,
      turma: turmaName,
    };

    // Chama a função "cadastrarNovoAluno" para cadastrar o novo aluno
    cadastrarNovoAluno(aluno);
  } else {
    // Caso algum dos campos esteja vazio, adiciona a classe "invalido" para exibir um estilo de erro
    Erroname.classList.add("invalido");
    Erroemail.classList.add("invalido");
    ErroTurma.classList.add("invalido");
  }
  // Cria um objeto "aluno" com os valores dos campos do formulário
});

// Chama a função para carregar as opções do select de turmas
carregarSelect();
