// Seleciona o elemento <tbody> do HTML
const tbody = document.querySelector("tbody");
const perfil = document.querySelector("#perfil");
let selectPaginacaoElement = document.querySelector("#selectPaginacao");

// Recupera o valor do select armazenado no localStorage ou define o valor padrão (5)
const selectPaginacao = localStorage.getItem("selectPaginacao") || "5";
document.querySelector("#selectPaginacao").value = selectPaginacao;

// Adiciona um evento de escuta para detectar quando o valor do select for alterado
selectPaginacaoElement.addEventListener("change", () => {
  // Obtém o novo valor selecionado pelo usuário
  const novoValor = selectPaginacaoElement.value;

  // Armazena o novo valor no localStorage
  localStorage.setItem("selectPaginacao", novoValor);

  // Chama a função buscarMentores com o novo valor de limite de página
  buscarTumar(null, 1, novoValor);
});

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

let ordenacaoTurmas = "asc";
let ordenacaoMentor = "asc";
let ordenacaoMentoria = "asc";
let ordenacaoDataInicio = "asc";
let ordenacaoDiaSemana = "asc";
let ordenacaoHorario = "asc";
let ordenacaoEncontros = "asc";

const ordenarPorTurma = () => {
  if (ordenacaoTurmas === "asc") {
    ordenacaoTurmas = "desc"; // Se a ordenação atual for ascendente, muda para descendente
  } else {
    ordenacaoTurmas = "asc"; // Caso contrário, muda para ascendente
  }
  atualizarIconeOrdenacao("setaTurma", ordenacaoTurmas); // Primeiro atualiza o ícone de ordenação
  buscarTumar(null, ordenacaoTurmas); // Em seguida, chama a função de busca com a nova ordenação
};

const ordenarPorMentor = () => {
  if (ordenacaoTurmas === "asc") {
    ordenacaoTurmas = "desc"; // Se a ordenação atual for ascendente, muda para descendente
  } else {
    ordenacaoTurmas = "asc"; // Caso contrário, muda para ascendente
  }
  atualizarIconeOrdenacao("setaMentor", ordenacaoTurmas); // Primeiro atualiza o ícone de ordenação
  buscarTumar(null, ordenacaoTurmas); // Em seguida, chama a função de busca com a nova ordenação
};

const ordenarPorMentoria = () => {
  if (ordenacaoTurmas === "asc") {
    ordenacaoTurmas = "desc"; // Se a ordenação atual for ascendente, muda para descendente
  } else {
    ordenacaoTurmas = "asc"; // Caso contrário, muda para ascendente
  }
  atualizarIconeOrdenacao("setaMentoria", ordenacaoTurmas); // Primeiro atualiza o ícone de ordenação
  buscarTumar(null, ordenacaoTurmas); // Em seguida, chama a função de busca com a nova ordenação
};

const ordenarPorDataInicio = () => {
  if (ordenacaoTurmas === "asc") {
    ordenacaoTurmas = "desc"; // Se a ordenação atual for ascendente, muda para descendente
  } else {
    ordenacaoTurmas = "asc"; // Caso contrário, muda para ascendente
  }
  atualizarIconeOrdenacao("setaDataInicio", ordenacaoTurmas); // Primeiro atualiza o ícone de ordenação
  buscarTumar(null, ordenacaoTurmas); // Em seguida, chama a função de busca com a nova ordenação
};

const ordenarPorDiaSemana = () => {
  if (ordenacaoTurmas === "asc") {
    ordenacaoTurmas = "desc"; // Se a ordenação atual for ascendente, muda para descendente
  } else {
    ordenacaoTurmas = "asc"; // Caso contrário, muda para ascendente
  }
  atualizarIconeOrdenacao("setaDiaSemana", ordenacaoTurmas); // Primeiro atualiza o ícone de ordenação
  buscarTumar(null, ordenacaoTurmas); // Em seguida, chama a função de busca com a nova ordenação
};

const ordenarPorHorario = () => {
  if (ordenacaoTurmas === "asc") {
    ordenacaoTurmas = "desc"; // Se a ordenação atual for ascendente, muda para descendente
  } else {
    ordenacaoTurmas = "asc"; // Caso contrário, muda para ascendente
  }
  atualizarIconeOrdenacao("setaHorario", ordenacaoTurmas); // Primeiro atualiza o ícone de ordenação
  buscarTumar(null, ordenacaoTurmas); // Em seguida, chama a função de busca com a nova ordenação
};

const ordenarPorEncontros = () => {
  if (ordenacaoTurmas === "asc") {
    ordenacaoTurmas = "desc"; // Se a ordenação atual for ascendente, muda para descendente
  } else {
    ordenacaoTurmas = "asc"; // Caso contrário, muda para ascendente
  }
  atualizarIconeOrdenacao("setaEncontros", ordenacaoTurmas); // Primeiro atualiza o ícone de ordenação
  buscarTumar(null, ordenacaoTurmas); // Em seguida, chama a função de busca com a nova ordenação
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

// Função assíncrona para buscar as turmas
const buscarTumar = async (pesquisa = null, page = 1) => {
  // Recupere o novo valor selecionado do select de paginação
  const limit = selectPaginacaoElement.value;

  let textopesquisa = "";

  if (pesquisa) {
    textopesquisa = `?q=${pesquisa}`;
  }

  if (ordenacaoTurmas === "desc") {
    textopesquisa += textopesquisa ? "&_sort=turma,-1" : "?_sort=turma,-1";
  } else if (ordenacaoMentor === "desc") {
    textopesquisa += textopesquisa ? "&_sort=mentor,-1" : "?_sort=mentor,-1";
  } else if (ordenacaoMentoria === "desc") {
    textopesquisa += textopesquisa ? "&_sort=mentoria,1" : "?_sort=mentoria,1";
  } else if (ordenacaoDataInicio == "desc") {
    textopesquisa += textopesquisa
      ? "&_sort=dataInicio,-1"
      : "?_sort=dataInicio,-1";
  } else if (ordenacaoDiaSemana == "desc") {
    textopesquisa += textopesquisa
      ? "&_sort=diaSemana,-1"
      : "?_sort=diaSemana,-1";
  } else if (ordenacaoHorario == "desc") {
    textopesquisa += textopesquisa ? "&_sort=horario,-1" : "?_sort=horario,-1";
  } else if (ordenacaoEncontros == "desc") {
    textopesquisa += textopesquisa
      ? "&_sort=encontros,-1"
      : "?_sort=encontros,-1";
  }

  textopesquisa += `${textopesquisa ? "&" : "?"}_page=${page}&_limit=${limit}`;

  try {
    const response = await fetch(
      `https://api-projetofinal-arnia-md1.onrender.com/turmas${textopesquisa}`
    );
    const turmaJson = await response.json();

    // Obtém o total de mentores no cabeçalho da resposta
    const totalTurmas = parseInt(response.headers.get("X-Total-Count"));

    mostrarTurma(turmaJson, totalTurmas);
    exibirControlesPaginacao(totalTurmas, limit);
  } catch (erro) {
    console.log(erro);
  }
};

// Função para exibir as turmas na tabela
const mostrarTurma = (dados, totalTurmas) => {
  tbody.innerHTML = "";

  dados.forEach((dados) => {
    // Converte a data de início para o formato brasileiro
    const dataInicio = new Date(dados.dataInicio);
    const dataFormatada = dataInicio.toLocaleDateString("pt-BR");

    // Cria uma nova linha na tabela com os dados da turma
    tbody.innerHTML += `
        <tr>
          <td class="nameMentores">${dados.turma}</td>
          <td class="inputName">${dados.mentor}</td>
          <td class="inputName">${dados.mentoria}</td>
          <td>${dataFormatada}</td>
          <td>${dados.diaSemana}</td>
          <td><span>${dados.horario.horaInicio}</span> - <span>${dados.horario.horarioFim}</span></td>
          <td>${dados.encontros}/10</td>
          <td class="icones">
            <i class="fas fa-edit iEditar" onclick="editarTuma(${dados.id})"></i>
            <i class="fas fa-trash iExcluir" onclick="deletTurma(${dados.id})"></i>
          </td>
        </tr>
        `;
  });
  exibirControlesPaginacao(totalTurmas);
};

// Essa função exibirControlesPaginacao recebe dois parâmetros:
// totalAluno: o número total de alunos que precisam ser paginados.
// limit: o número máximo de alunos que serão exibidos por página.
const exibirControlesPaginacao = (totalTurmas, limit) => {
  // Obtém o elemento HTML que representa os controles de paginação pelo seu ID.
  const paginationControls = document.getElementById("paginationControls");

  // Calcula o número total de páginas necessárias para exibir todas as turmas.
  const totalPages = Math.ceil(totalTurmas / limit);

  // Inicializa uma variável para armazenar o código HTML dos botões de paginação.
  let paginationHTML = "";

  // Um laço de repetição que vai de 1 até o número total de páginas.
  for (let i = 1; i <= totalPages; i++) {
    // Para cada página, adiciona um botão de paginação ao código HTML.
    // O botão terá a classe "btnPaginacao" e ao ser clicado, chamará a função mudarPagina passando o número da página como argumento.
    paginationHTML += `
    <button onclick="mudarPagina(${i})" class="btnPaginacao">${i}</button>
    `;
  }

  // Após criar todos os botões de paginação, insere o código HTML na div "paginationControls",
  // substituindo o conteúdo anterior, se houver.
  paginationControls.innerHTML = paginationHTML;

  // Atualize o valor selecionado no select de paginação
  const selectPaginacaoElement = document.querySelector("#selectPaginacao");
  selectPaginacaoElement.value = limit;
};

const mudarPagina = (pageNumber) => {
  buscarTumar(null, pageNumber);
};
buscarTumar(null, "asc", 1);

// Função assíncrona para deletar uma turma
const deletTurma = async (turmaId) => {
  try {
    await fetch(
      `https://api-projetofinal-arnia-md1.onrender.com/turmas/${turmaId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    buscarTumar();
  } catch (erro) {
    console.log(erro);
  }
};

// Chama a função buscarTumar para obter as turmas e exibi-las na tabela
buscarTumar();

// Função para redirecionar para a página de edição de uma turma
const editarTuma = (id) => {
  window.location = `../Turmas/editarturma.html?id=${id}`;
};
// Função para redirecionar para a página de criação de nova turma
const novaTurma = () => {
  window.location = "../Turmas/novaturma.html";
};

// Função para pesquisar as turmas
inputSearch.addEventListener("keyup", (e) => {
  const texto = inputSearch.value;
  if (texto === "") {
    buscarTumar();
  } else if (e.key === "Enter") {
    buscarTumar(texto);
  }
});
