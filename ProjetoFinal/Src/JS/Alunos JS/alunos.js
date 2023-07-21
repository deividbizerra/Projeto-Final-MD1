// Seleciona o elemento tbody da tabela onde os alunos serão exibidos
const tbody = document.querySelector("#tbody");

let ordenacaoPorNome = "asc";
let ordenacaoPorTurma = "asc";
let ordenacaoPorEmail = "asc";

// Função para alternar a ordenação por Mentor
const ordenarPorMentor = () => {
  if (ordenacaoPorNome === "asc") {
    ordenacaoPorNome = "desc"; // Se a ordenação atual for ascendente, muda para descendente
  } else {
    ordenacaoPorNome = "asc"; // Caso contrário, muda para ascendente
  }
  atualizarIconeOrdenacao("setaNome", ordenacaoPorNome); // Primeiro atualiza o ícone de ordenação
  buscarAluno(null, ordenacaoPorNome); // Em seguida, chama a função de busca com a nova ordenação
};

// Função para alternar a ordenação por Turma
const ordenarPorTurma = () => {
  if (ordenacaoPorTurma === "asc") {
    ordenacaoPorTurma = "desc"; // Se a ordenação atual for ascendente, muda para descendente
  } else {
    ordenacaoPorTurma = "asc"; // Caso contrário, muda para ascendente
  }
  atualizarIconeOrdenacao("setaTurma", ordenacaoPorTurma); // Primeiro atualiza o ícone de ordenação
  buscarAluno(null, ordenacaoPorTurma); // Em seguida, chama a função de busca com a nova ordenação
};

// Função para alternar a ordenação por Email
const ordenarPorEmail = () => {
  if (ordenacaoPorEmail === "asc") {
    ordenacaoPorEmail = "desc"; // Se a ordenação atual for ascendente, muda para descendente
  } else {
    ordenacaoPorEmail = "asc"; // Caso contrário, muda para ascendente
  }
  atualizarIconeOrdenacao("setaEmail", ordenacaoPorEmail); // Primeiro atualiza o ícone de ordenação
  buscarAluno(null, ordenacaoPorEmail); // Em seguida, chama a função de busca com a nova ordenação
};

const atualizarIconeOrdenacao = (iconeId, ordenacao) => {
  const icone = document.getElementById(iconeId);
  icone.classList.remove("fa-sort", "fa-sort-up", "fa-sort-down");

  if (ordenacao === "asc") {
    icone.classList.add("fa-sort-up"); // Adiciona a classe do ícone de ordenação ascendente
  } else {
    icone.classList.add("fa-sort-down"); // Adiciona a classe do ícone de ordenação descendente
  }
};

// Função assíncrona para buscar os alunos
const buscarAluno = async (pesquisa = null, page = 1, limit = 5) => {
  let textopesquisa = "";

  // Verifica se há uma pesquisa a ser feita e monta a query de pesquisa
  if (pesquisa) {
    textopesquisa = `?q=${pesquisa}`;
  }

  if (ordenacaoPorNome === "desc") {
    textopesquisa += textopesquisa ? "&_sort=nome,-1" : "?_sort=nome,-1";
  } else if (ordenacaoPorTurma === "desc") {
    textopesquisa += textopesquisa ? "&_sort=turma,-1" : "?_sort=turma,-1";
  } else if (ordenacaoPorEmail === "desc") {
    textopesquisa += textopesquisa ? "&_sort=email,1" : "?_sort=email,1"; // Ordena por Mentoria (título) ascendente por padrão
  }

  // Adicione os parâmetros de paginação na URL da requisição
  textopesquisa += `${textopesquisa ? "&" : "?"}_page=${page}&_limit=${limit}`;

  try {
    // Faz uma requisição na API para obter os dados dos alunos
    const response = await fetch(
      `https://api-projetofinal-arnia-md1.onrender.com/alunos${textopesquisa}`
    );
    // Converte a resposta em JSON
    const alunosJson = await response.json();
    // Chama a função para exibir os alunos na tabela
    // Obtém o total de mentores no cabeçalho da resposta
    const totalAluno = parseInt(response.headers.get("X-Total-Count"));

    mostrarAlunos(alunosJson, totalAluno);
  } catch (error) {
    console.log(error);
  }
};

// Função para redirecionar para a página de edição de aluno
const editarAluno = (id) => {
  // Redireciona para a página "editaraluno.html" passando o parâmetro "id" na URL
  window.location = `editaraluno.html?id=${id}`;
};

// Função para exibir os alunos na tabela
const mostrarAlunos = (dados, totalAluno) => {
  tbody.innerHTML = "";

  // Itera sobre os dados dos alunos e cria uma nova linha na tabela com os dados de cada aluno
  dados.forEach((dados) => {
    tbody.innerHTML += `
    <tr>
      <td class="nameMentores">${dados.nome}</td>
      <td class="inputName">${dados.turma}</td>
      <td>${dados.email}</td>
      <td class="icones">
        <i class="fas fa-edit iEditar" onclick="editarAluno(${dados.id})"></i>
        <i class="fas fa-trash iExcluir" onclick="deletAluno(${dados.id})"></i>
      </td>
    </tr>
    `;
  });
  exibirControlesPaginacao(totalAluno);
};

const exibirControlesPaginacao = (totalAluno) => {
  const paginationControls = document.getElementById("paginationControls");
  const totalPages = Math.ceil(totalAluno / 5); // 10 é o número de itens por página

  let paginationHTML = "";

  for (let i = 1; i <= totalPages; i++) {
    paginationHTML += `
    <button onclick="mudarPagina(${i})" class="btnPaginacao">${i}</button>
    `;
  }

  paginationControls.innerHTML = paginationHTML;
};

const mudarPagina = (pageNumber) => {
  buscarAluno(null, pageNumber);
};
buscarAluno(null, "asc", 1);

// Função para deletar um aluno
const deletAluno = async (alunoId) => {
  try {
    // Faz uma requisição DELETE para a API, passando o ID do aluno a ser deletado
    await fetch(
      `https://api-projetofinal-arnia-md1.onrender.com/alunos/${alunoId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    // Atualiza a lista de alunos após a deleção
    buscarAluno();
  } catch (erro) {
    console.log(erro);
  }
};

// Inicia a busca e exibição dos alunos na tabela
buscarAluno();

// Função para redirecionar para a página de criação de novo aluno
const novoAluno = () => {
  window.location = "../Alunos/novoaluno.html";
};

// Adiciona um listener de evento para o evento "keyup" do inputSearch
inputSearch.addEventListener("keyup", (e) => {
  const texto = inputSearch.value;
  // Verifica se o texto digitado no inputSearch é vazio
  if (texto === "") {
    buscarAluno(); // Se for vazio, exibe todos os alunos
  } else if (e.key === "Enter") {
    buscarAluno(texto); // Se for pressionada a tecla Enter, faz a busca de alunos com o texto digitado
  }
});
