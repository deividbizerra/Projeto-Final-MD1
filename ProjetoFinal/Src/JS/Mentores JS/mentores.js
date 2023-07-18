// Seleciona os elementos do HTML através dos seus IDs
const tbody = document.querySelector("#tbody"); // Tabela onde os mentores serão exibidos
const inputSearch = document.getElementById("inputSearch"); // Input de busca

// Variáveis de controle para ordenação dos mentores
let ordenacaoNome = "asc"; // Variável para controlar a ordenação por nome (ascendente ou descendente)
let ordenacaoEmail = "asc"; // Variável para controlar a ordenação por email (ascendente ou descendente)

// Função para alternar a ordenação por nome
const ordenarPorNome = () => {
  if (ordenacaoNome === "asc") {
    ordenacaoNome = "desc"; // Se a ordenação atual for ascendente, muda para descendente
  } else {
    ordenacaoNome = "asc"; // Caso contrário, muda para ascendente
  }
  atualizarIconeOrdenacao("setaNome", ordenacaoNome); // Primeiro atualiza o ícone de ordenação
  buscarMentores(null, ordenacaoNome); // Em seguida, chama a função de busca com a nova ordenação
};

// Função para alternar a ordenação por email
const ordenarPorEmail = () => {
  if (ordenacaoEmail === "asc") {
    ordenacaoEmail = "desc"; // Se a ordenação atual for ascendente, muda para descendente
  } else {
    ordenacaoEmail = "asc"; // Caso contrário, muda para ascendente
  }
  atualizarIconeOrdenacao("setaEmail", ordenacaoEmail); // Primeiro atualiza o ícone de ordenação
  buscarMentores(null, ordenacaoEmail); // Em seguida, chama a função de busca com a nova ordenação
};

// Função para atualizar o ícone de ordenação na interface
const atualizarIconeOrdenacao = (iconeId, ordenacao) => {
  const icone = document.getElementById(iconeId);
  icone.classList.remove("fa-sort", "fa-sort-up", "fa-sort-down");

  if (ordenacao === "asc") {
    icone.classList.add("fa-sort-up"); // Adiciona a classe do ícone de ordenação ascendente
  } else {
    icone.classList.add("fa-sort-down"); // Adiciona a classe do ícone de ordenação descendente
  }
};

// Função assíncrona para buscar os mentores na API
const buscarMentores = async (pesquisa = null, ordenacao = "asc") => {
  let textopesquisa = "";

  if (pesquisa) {
    textopesquisa += `?q=${pesquisa}`; // Se houver texto de pesquisa, adiciona na URL
  }

  if (ordenacao === "desc") {
    textopesquisa += textopesquisa ? "&_sort=name,-1" : "?_sort=name,-1"; // Adiciona a ordenação na URL (ascendente ou descendente)
  }

  try {
    // Faz uma requisição na API para obter os dados dos mentores
    const response = await fetch(
      `http://localhost:3000/mentores${textopesquisa}`
    );
    // Converte a resposta em JSON
    const mentorJson = await response.json();
    // Chama a função para exibir os mentores na tabela
    mostrarMentores(mentorJson);
  } catch (error) {
    console.log(error);
  }
};

// Função para exibir os mentores na tabela
const mostrarMentores = (dados) => {
  tbody.innerHTML = ""; // Limpa a tabela antes de exibir os mentores

  dados.forEach((dados) => {
    // Cria uma nova linha na tabela com os dados do mentor
    tbody.innerHTML =
      tbody.innerHTML +
      `
        <tr>
          <td class="nameMentores">${dados.name}</td>
          <td>${dados.email}</td>
          <td class="icones">
            <i class="fas fa-edit iEditar" onclick="editarMentores(${dados.id})"></i>
            <i class="fas fa-trash iExcluir" onclick="deleMentor(${dados.id})"></i>
          </td>
        </tr>
      `;
  });
};

// Função para deletar um mentor
const deleMentor = async (mentorId) => {
  try {
    // Faz uma requisição DELETE para a API, passando o ID do mentor a ser deletado
    await fetch(`http://localhost:3000/mentores/${mentorId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Após a deleção do mentor, chama a função "buscarMentores" para atualizar a lista de mentores
    buscarMentores();
  } catch (error) {
    console.log(error);
  }
};

// Chama a função buscarMentores para iniciar a busca e exibição dos mentores na tabela
buscarMentores();

// Função para redirecionar para a página de edição de mentor
const editarMentores = (id) => {
  // Redireciona para a página "Mentores/editarmentor.html" passando o parâmetro "id" na URL
  window.location = `../Mentores/editarmentor.html?id=${id}`;
};

// Função para redirecionar para a página de criação de nova mentoria
const novoMentor = () => {
  window.location = "../Mentores/novomento.html";
};

// Listener para o evento de tecla pressionada no input de busca
inputSearch.addEventListener("keyup", (e) => {
  const texto = inputSearch.value;
  if (texto === "") {
    buscarMentores();
  } else if (e.key === "Enter") {
    buscarMentores(texto);
  }
});
