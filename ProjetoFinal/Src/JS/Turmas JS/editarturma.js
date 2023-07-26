// Seleciona o formulário no HTML
const formulario = document.querySelector("#formNovaTurma");
// Variável para armazenar o ID da turma a ser editada
let idEditar = null;
const perfil = document.querySelector("#perfil");

// Função para recuperar o ID da turma da URL
const recuperarId = () => {
  const param = window.location.search;
  const paramObj = new URLSearchParams(param);
  const id = paramObj.get("id");
  return id;
};

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
    const usuarioId = recuperarId();

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
// Função assíncrona para buscar os dados de uma turma pelo ID
const buscarTurma = async (id) => {
  const resposta = await fetch(
    `https://api-projetofinal-arnia-md1.onrender.com/turmas/${id}`
  );
  const autorJson = await resposta.json();
  return autorJson;
};

// Função para carregar os dados da turma nos campos do formulário
const carregarDadosTurmas = (turmas) => {
  document.getElementById("tituloMentoria").value = turmas.mentoria;
  document.getElementById("mentor").value = turmas.mentor;
  document.getElementById("dataInicio").value = turmas.dataInicio;
  document.getElementById("diasDaSemana").value = turmas.diaSemana;
  document.getElementById("horarioInicio").value = turmas.horario.horaInicio;
  document.getElementById("horarioFim").value = turmas.horario.horarioFim;
  document.getElementById("turma").value = turmas.turma;
  document.getElementById("linkAula").value = turmas.linkAula;
  document.getElementById("qtdEncontro").value = turmas.encontros;
};

// Função assíncrona para editar uma turma
const editarturma = async (id, turmas) => {
  await fetch(`https://api-projetofinal-arnia-md1.onrender.com/turmas/${id}`, {
    method: "PUT",
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
    },
    // Inclui os dados da mentoria no corpo da requisição, alterando o mentor para conter apenas o nome
    body: JSON.stringify(turmas),
  });
};

// Função assíncrona para carregar os dados da turma a ser editada
const carregarDadosEditar = async () => {
  idEditar = recuperarId();

  const turma = await buscarTurma(idEditar);
  carregarDadosTurmas(turma);
};

// Função assíncrona para buscar as mentorias
const buscarMentorias = async () => {
  const response = await fetch(
    `https://api-projetofinal-arnia-md1.onrender.com/mentorias`
  );
  const mentoriaJson = await response.json();
  return mentoriaJson;
};

// Função para carregar as opções do select de mentoria
const carregarSelectMentoria = async () => {
  const mentorias = await buscarMentorias();
  const mentoriaSelect = document.getElementById("tituloMentoria");

  const opVazia = new Option("Selecione uma mentoria...", null);
  mentoriaSelect.options.add(opVazia);

  mentorias.forEach((mentorias) => {
    const opcoes = new Option(mentorias.titulo);
    mentoriaSelect.options.add(opcoes);
  });
};

// Função assíncrona para buscar os mentores
const buscarMentores = async () => {
  const response = await fetch(
    `https://api-projetofinal-arnia-md1.onrender.com/mentores`
  );
  const mentoresJson = await response.json();
  return mentoresJson;
};

// Função para carregar as opções do select de mentor
const carregarSelectMentores = async () => {
  const mentores = await buscarMentores();
  const mentoresSelect = document.getElementById("mentor");

  const opVazia = new Option("Selecione uma mentoria...", null);
  mentoresSelect.options.add(opVazia);

  mentores.forEach((mentores) => {
    const opcoes = new Option(mentores.name);
    mentoresSelect.options.add(opcoes);
  });
};

// Adiciona um listener de evento para o evento "submit" do formulário
formulario.addEventListener("submit", async (e) => {
  e.preventDefault();

  // Obtém os valores dos campos do formulário
  const diasDaSemana = formulario.elements["diasDaSemana"].value;
  const horarioInicio = formulario.elements["horarioInicio"].value;
  const horarioFim = formulario.elements["horarioFim"].value;
  const turma = formulario.elements["turma"].value;
  const linkAula = formulario.elements["linkAula"].value;
  const qtdEncontro = formulario.elements["qtdEncontro"].value;
  const dataInicio = formulario.elements["dataInicio"].value;

  // Obtém o valor selecionado do select de mentor
  const mentorSelect = document.getElementById("mentor");
  const mentorOption = mentorSelect.options[mentorSelect.selectedIndex];
  const mentorName = mentorOption.text;

  // Obtém o valor selecionado do select de mentoria
  const mentoriaSelect = document.getElementById("tituloMentoria");
  const mentoriaOption = mentoriaSelect.options[mentoriaSelect.selectedIndex];
  const mentoriaName = mentoriaOption.text;

  // Cria um objeto com os valores dos campos do formulário
  const turmas = {
    turma,
    mentor: mentorName,
    mentoria: mentoriaName,
    diaSemana: diasDaSemana,
    horario: {
      horaInicio: horarioInicio,
      horarioFim: horarioFim,
    },
    encontros: qtdEncontro,
    linkAula,
    dataInicio,
  };

  // Chama a função para editar a turma com o ID e os dados atualizados
  editarturma(idEditar, turmas);

  // Redireciona para a página de turmas
  window.location = "../Turmas/turmas.html";
});

// Chama as funções para carregar os dados de edição, as opções de mentoria e os mentores
carregarSelectMentores();
carregarSelectMentoria();
carregarDadosEditar();
