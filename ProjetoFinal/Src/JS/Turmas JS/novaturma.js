// Seleciona o formulário pelo seu ID
const formNovaTurma = document.querySelector("#formNovaTurma");

const errorMentor = document.querySelector("#mentor");
const erroMentoria = document.querySelector("#tituloMentoria");
const erroDataInicio = document.querySelector("#dataInicio");
const erroDiasDaSemana = document.querySelector("#diasDaSemana");
const erroHorarioInicio = document.querySelector("#horarioInicio");
const erroHorarioFim = document.querySelector("#horarioFim");
const erroTurma = document.querySelector("#turma");
const erroLinkAula = document.querySelector("#linkAula");
const erroQtdEncontro = document.querySelector("#qtdEncontro");

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

// Função assíncrona para buscar todos os mentores
const buscarMentores = async () => {
  const response = await fetch(
    `https://api-projetofinal-arnia-md1.onrender.com/mentores`
  );
  const mentorJson = await response.json();
  return mentorJson;
};

// Função para carregar as opções do select de mentores
const carregarSelect = async () => {
  const mentorias = await buscarMentores();
  const mentoriaSelect = document.getElementById("mentor");

  const opVazia = new Option("Selecione um mentor...", null);
  mentoriaSelect.options.add(opVazia);

  mentorias.forEach((mentor) => {
    const opcoes = new Option(mentor.name, mentor.id);
    mentoriaSelect.options.add(opcoes);
  });
};

// Função assíncrona para buscar uma mentoria pelo ID
const buscarMentoriasId = async (id) => {
  if (id == null) {
    return false;
  }

  const response = await fetch(
    `https://api-projetofinal-arnia-md1.onrender.com/mentorias/${id}`
  );
  const mentoriasJson = await response.json();
  return mentoriasJson;
};

// Função assíncrona para buscar todas as mentorias
const buscarMentorias = async () => {
  const response = await fetch(
    `https://api-projetofinal-arnia-md1.onrender.com/mentorias`
  );
  const mentoriaJson = await response.json();
  return mentoriaJson;
};

// Função para carregar as opções do select de mentorias
const carregarSelectMentoria = async () => {
  const mentorias = await buscarMentorias();
  const mentoriaSelect = document.getElementById("tituloMentoria");

  const opVazia = new Option("Selecione uma mentoria...", null);
  mentoriaSelect.options.add(opVazia);

  mentorias.forEach((mentorias) => {
    const opcoes = new Option(mentorias.titulo, mentorias.id);
    mentoriaSelect.options.add(opcoes);
  });
};

// Função assíncrona para cadastrar uma nova turma
const cadastrarNovaTurma = async (turmas) => {
  try {
    await fetch(`https://api-projetofinal-arnia-md1.onrender.com/turmas`, {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(turmas),
    });
    window.location = "../Turmas/turmas.html";
  } catch (error) {
    console.log(error);
  }
};

// Adiciona um listener de evento para o evento "submit" do formulário
formNovaTurma.addEventListener("submit", async (e) => {
  e.preventDefault();

  // Obtém os valores dos campos do formulário
  const diasDaSemana = formNovaTurma.elements["diasDaSemana"].value;
  const horarioInicio = formNovaTurma.elements["horarioInicio"].value;
  const horarioFim = formNovaTurma.elements["horarioFim"].value;
  const turma = formNovaTurma.elements["turma"].value;
  const linkAula = formNovaTurma.elements["linkAula"].value;
  const qtdEncontro = formNovaTurma.elements["qtdEncontro"].value;
  const dataInicio = formNovaTurma.elements["dataInicio"].value;

  // Obtém o valor selecionado do select de mentor
  const mentorSelect = document.getElementById("mentor");
  const mentorOption = mentorSelect.options[mentorSelect.selectedIndex];
  const mentorName = mentorOption.text;

  // Obtém o valor selecionado do select de mentoria
  const mentoriaSelect = document.getElementById("tituloMentoria");
  const mentoriaOption = mentoriaSelect.options[mentoriaSelect.selectedIndex];
  const mentoriaName = mentoriaOption.text;

  if (
    diasDaSemana !== "" &&
    horarioInicio !== "" &&
    horarioFim !== "" &&
    turma !== "" &&
    linkAula !== "" &&
    qtdEncontro !== "" &&
    dataInicio !== "" &&
    mentorName !== "" &&
    mentoriaName !== ""
  ) {
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

    cadastrarNovaTurma(turmas);
  } else {
    errorMentor.classList.add("invalido");
    erroMentoria.classList.add("invalido");
    erroDataInicio.classList.add("invalido");
    erroDiasDaSemana.classList.add("invalido");
    erroHorarioInicio.classList.add("invalido");
    erroHorarioFim.classList.add("invalido");
    erroTurma.classList.add("invalido");
    erroLinkAula.classList.add("invalido");
    erroQtdEncontro.classList.add("invalido");
  }
});

// Chama as funções para carregar os selects
carregarSelect();
carregarSelectMentoria();
