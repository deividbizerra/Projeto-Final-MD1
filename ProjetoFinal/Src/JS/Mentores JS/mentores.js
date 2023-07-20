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
const buscarMentores = async (pesquisa = null, page = 1, limit = 5) => {
  let textopesquisa = "";

  if (pesquisa) {
    textopesquisa += `?q=${pesquisa}`;
  }

  if (ordenacaoNome === "desc") {
    textopesquisa += textopesquisa ? "&_sort=name,-1" : "?_sort=name,-1";
  } else if (ordenacaoEmail === "desc") {
    textopesquisa += textopesquisa ? "&_sort=email,-1" : "?_sort=email,-1";
  }

  // Adicione os parâmetros de paginação na URL da requisição
  textopesquisa += `${textopesquisa ? "&" : "?"}_page=${page}&_limit=${limit}`;
  try {
    // Faz uma requisição na API para obter os dados dos mentores
    const response = await fetch(
      `https://api-projetofinal-arnia-md1.onrender.com/mentores${textopesquisa}`
    );
    // Converte a resposta em JSON
    const mentorJson = await response.json();

    // Obtém o total de mentores no cabeçalho da resposta
    const totalMentores = parseInt(response.headers.get("X-Total-Count"));

    // Chama a função para exibir os mentores na tabela e passa o total de mentores
    mostrarMentores(mentorJson, totalMentores);
  } catch (error) {
    console.log(error);
  }
};

// Função para exibir os mentores na tabela
const mostrarMentores = (dados, totalMentores) => {
  tbody.innerHTML = "";

  dados.forEach((dados) => {
    // Cria uma nova linha na tabela com os dados do mentor
    tbody.innerHTML += `
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

  // Exiba os controles de paginação
  exibirControlesPaginacao(totalMentores);
};

const exibirControlesPaginacao = (totalMentores) => {
  const paginationControls = document.getElementById("paginationControls");
  const totalPages = Math.ceil(totalMentores / 10); // 10 é o número de itens por página

  let paginationHTML = "";

  for (let i = 1; i <= totalPages; i++) {
    paginationHTML += `
    <button onclick="mudarPagina(${i})" class="btnPaginacao">${i}</button>
    `;
  }

  paginationControls.innerHTML = paginationHTML;
};

const mudarPagina = (pageNumber) => {
  buscarMentores(null, pageNumber);
};
buscarMentores(null, ordenacaoNome, 1);

// Função para deletar um mentor
const deleMentor = async (mentorId) => {
  try {
    // Faz uma requisição DELETE para a API, passando o ID do mentor a ser deletado
    await fetch(
      `https://api-projetofinal-arnia-md1.onrender.com/mentores/${mentorId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

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
