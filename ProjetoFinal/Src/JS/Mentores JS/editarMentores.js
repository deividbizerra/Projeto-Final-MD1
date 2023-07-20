const formMentores = document.getElementById("formMentores");
let id = null;

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
