const formulario = document.querySelector("#formMentorias");
const ErroMentoria = document.querySelector("#tituloMentoria");
const ErroMentor = document.querySelector("#mentor");
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
// Função para buscar um mentor pelo ID
const buscarMentoresId = async (id) => {
  if (id == null) {
    return false;
  }

  const response = await fetch(
    `https://api-projetofinal-arnia-md1.onrender.com/mentores/${id}`
  );
  const mentoresJson = await response.json();
  return mentoresJson;
};

// Função para buscar todos os mentores
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

// Função para cadastrar uma mentoria
const cadastrarMentoria = async (mentoria) => {
  try {
    await fetch("https://api-projetofinal-arnia-md1.onrender.com/mentorias", {
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

  const mentoriaObj = await buscarMentoresId(name);
  console.log(mentoriaObj);

  if (Object.keys(mentoriaObj).length !== 0 && titulo !== "") {
    const mentoria = {
      titulo,
      status,
      mentor: mentoriaObj,
    };

    cadastrarMentoria(mentoria);
  } else {
    ErroMentor.classList.add("invalido");
    ErroMentoria.classList.add("invalido");
  }
});

carregarSelect();
