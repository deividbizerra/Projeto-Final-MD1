const formMentores = document.querySelector("#formMentores");
const Erroname = document.querySelector("#nome");
const Erroemail = document.querySelector("#email");
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

// Função para cadastrar um novo mentor
const cadastrarMentores = async (mentores) => {
  try {
    // Faz uma requisição POST para a API para cadastrar o mentor
    await fetch(`https://api-projetofinal-arnia-md1.onrender.com/mentores`, {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(mentores),
    });

    // Redireciona o usuário para a página "../mentores.html" após o cadastro
    window.location = "../Mentores/mentores.html";
  } catch (error) {
    console.log(error);
  }
};

// Adiciona um listener de evento para o evento "submit" do formulário "formMentores"
formMentores.addEventListener("submit", (e) => {
  e.preventDefault();

  // Obtém os valores dos campos de nome e e-mail do formulário
  const name = formMentores.elements["nome"].value;
  const email = formMentores.elements["email"].value;

  if (name && email !== "") {
    // Cria um objeto "mentores" com os valores do nome e e-mail
    const mentores = {
      name,
      email,
    };

    // Chama a função "cadastrarMentores" passando o objeto "mentores" como argumento
    cadastrarMentores(mentores);
  } else {
    // Caso algum dos campos esteja vazio, adiciona a classe "invalido" para exibir um estilo de erro
    Erroname.classList.add("invalido");
    Erroemail.classList.add("invalido");
  }
});
