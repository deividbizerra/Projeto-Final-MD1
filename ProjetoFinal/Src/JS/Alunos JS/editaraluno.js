// Seleciona o formulário de alunos
const formulario = document.getElementById("formAlunos");
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

// Variável para armazenar o ID do aluno que será editado
let idEditar = null;

// Função para recuperar o ID do aluno a ser editado da URL
const recuperarId = () => {
  const param = window.location.search;
  const paramObj = new URLSearchParams(param);
  const id = paramObj.get("id");
  return id;
};

// Função assíncrona para buscar os dados de um aluno específico
const buscarAlunos = async (id) => {
  const resposta = await fetch(
    `https://api-projetofinal-arnia-md1.onrender.com/alunos/${id}`
  );
  const alunoJson = await resposta.json();
  return alunoJson;
};

// Função para carregar os dados do aluno nos campos do formulário
const carregarDadosAlunos = (alunos) => {
  document.getElementById("nome").value = alunos.nome;
  document.getElementById("email").value = alunos.email;
  document.getElementById("turma").value = alunos.turma;
};

// Função assíncrona para editar um aluno
const editarAluno = async (id, alunos) => {
  await fetch(`https://api-projetofinal-arnia-md1.onrender.com/alunos/${id}`, {
    method: "PUT",
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
    },
    // Inclui os dados do aluno no corpo da requisição, alterando a turma para conter apenas o nome
    body: JSON.stringify(alunos),
  });
};

// Função assíncrona para carregar os dados do aluno a ser editado
const carregarDadosEditar = async () => {
  idEditar = recuperarId();
  const aluno = await buscarAlunos(idEditar);
  carregarDadosAlunos(aluno);
};

// Função assíncrona para buscar as turmas
const buscarTurmas = async () => {
  const response = await fetch(
    `https://api-projetofinal-arnia-md1.onrender.com/turmas`
  );
  const turmaJson = await response.json();
  return turmaJson;
};

// Função para carregar as opções do select de turmas
const carregarSelecTurmas = async () => {
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

// Adiciona um listener de evento para o evento "submit" do formulário "formAlunos"
formulario.addEventListener("submit", async (e) => {
  e.preventDefault();

  // Obtém os valores dos campos do formulário
  const nome = formulario.elements["nome"].value;
  const email = formulario.elements["email"].value;
  const turmaSelect = document.getElementById("turma");
  const turmaOption = turmaSelect.options[turmaSelect.selectedIndex];
  const turmaName = turmaOption.text;

  // Cria um objeto "alunos" com os valores dos campos do formulário
  const alunos = {
    nome,
    email,
    turma: turmaName,
  };

  // Chama a função "editarAluno" para editar o aluno com o ID recuperado
  editarAluno(idEditar, alunos);

  // Redireciona o usuário de volta para a página de alunos após a edição
  window.location = "../Alunos/alunos.html";
});

// Chama a função para carregar as opções do select de turmas
carregarSelecTurmas();

// Chama a função para carregar os dados do aluno a ser editado
carregarDadosEditar();
