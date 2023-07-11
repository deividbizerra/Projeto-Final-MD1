// Seleciona o formulário pelo seu ID
const formNovaTurma = document.querySelector("#formNovaTurma");

// Função assíncrona para buscar um mentor pelo ID
const buscarMentoresId = async (id) => {
  if (id == null) {
    return false;
  }

  const response = await fetch(`http://localhost:3000/mentores/${id}`);
  const mentoresJson = await response.json();
  return mentoresJson;
};

// Função assíncrona para buscar todos os mentores
const buscarMentores = async () => {
  const response = await fetch(`http://localhost:3000/mentores`);
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

  const response = await fetch(`http://localhost:3000/mentorias/${id}`);
  const mentoriasJson = await response.json();
  return mentoriasJson;
};

// Função assíncrona para buscar todas as mentorias
const buscarMentorias = async () => {
  const response = await fetch(`http://localhost:3000/mentorias`);
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
    await fetch(`http://localhost:3000/turmas`, {
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
    diasDaSemana &&
    horarioInicio &&
    horarioFim &&
    turma &&
    linkAula &&
    qtdEncontro &&
    dataInicio &&
    mentorName &&
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
    alert("Preencha todos os campos");
  }
});

// Chama as funções para carregar os selects
carregarSelect();
carregarSelectMentoria();

