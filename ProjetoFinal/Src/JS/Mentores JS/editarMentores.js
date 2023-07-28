const formMentores = document.getElementById("formMentores");
let id = null;
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

// Função para editar um mentor
const editarAutor = async (mentor) => {
  // Faz uma requisição PUT para a API, passando o ID do mentor e os dados atualizados
  await fetch(
    `https://api-projetofinal-arnia-md1.onrender.com/mentores/${id}`,
    {
      method: "PUT",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(mentor),
    }
  );

  // Redireciona para a página "../mentores.html" após a edição do mentor
  window.location = "../Mentores/mentores.html";
};

// Função para carregar os dados do mentor a ser editado
const carregarDadosEditar = async () => {
  // Obtém o parâmetro "id" da URL
  const param = window.location.search;
  const paramObj = new URLSearchParams(param);
  id = paramObj.get("id");

  // Faz uma requisição GET para a API, buscando os dados do mentor com o ID fornecido
  const resultado = await fetch(
    `https://api-projetofinal-arnia-md1.onrender.com/mentores/${id}`
  );
  const mentor = await resultado.json();

  // Preenche os campos do formulário com os dados do mentor
  document.getElementById("nome").value = mentor.name;
  document.getElementById("email").value = mentor.email;
};

formMentores.addEventListener("submit", (e) => {
  e.preventDefault();

  // Obtém os valores dos campos do formulário
  const name = formMentores.elements["nome"].value;
  const email = formMentores.elements["email"].value;

  // Cria um objeto "mentores" com os valores dos campos
  const mentores = {
    name,
    email,
  };

  // Chama a função "editarAutor" passando o objeto "mentores" como parâmetro
  editarAutor(mentores);
});

// Carrega os dados do mentor a ser editado ao carregar a página
carregarDadosEditar();
