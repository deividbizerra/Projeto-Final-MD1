const formulario = document.querySelector("#formMentorias");

// Função para buscar um mentor pelo ID
const buscarMentoresId = async (id) => {
  if (id == null) {
    return false;
  }

  const response = await fetch(`http://localhost:3000/mentores/${id}`);
  const mentoresJson = await response.json();
  return mentoresJson;
};

// Função para buscar todos os mentores
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

// Função para cadastrar uma mentoria
const cadastrarMentoria = async (mentoria) => {
  try {
    await fetch("http://localhost:3000/mentorias", {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(mentoria),
    });
    window.location = "../Mentorias/mentorias.html";
  } catch (error) {
    console.log(error);
  }
};

// Função para validar o status
const validarStatus = () => {
  const checkboxStatus = document.getElementById("checkboxStatus");
  const statusMessageElement = document.getElementById("statusMessage");

  if (checkboxStatus.checked) {
    statusMessageElement.textContent = "Ativo";
  } else {
    statusMessageElement.textContent = "Inativo";
  }
};

formulario.addEventListener("submit", async (e) => {
  e.preventDefault();

  const titulo = formulario.elements["tituloMentoria"].value;
  const name = document.getElementById("mentor").value; // Obtém o ID do mentor selecionado
  const status = document.getElementById("statusMessage").textContent;

  console.log(name)

  const mentoriaObj = await buscarMentoresId(name);
  // console.log(mentoriaObj);

  if (Object.keys(mentoriaObj).length == 0) {
    console.log("Erro: Não foi possível registrar o post, autor inválido");
    return;
  }

  const mentoria = {
    titulo,
    status,
    mentor: mentoriaObj,
  };

  cadastrarMentoria(mentoria);
});

carregarSelect();
