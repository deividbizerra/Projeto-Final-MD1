// Seleciona o elemento <tbody> do HTML
const tbody = document.querySelector("tbody");

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
const buscarTumar = async (pesquisa = null, page = 1, limit = 5) => {
  let textopesquisa = "";

  if (pesquisa) {
    textopesquisa = `?q=${pesquisa}`;
  }

  if (ordenacaoTurmas === "desc") {
    textopesquisa += textopesquisa ? "&_sort=turma,-1" : "?_sort=turma,-1";
  } else if (ordenacaoMentor === "desc") {
    textopesquisa += textopesquisa ? "&_sort=mentor,-1" : "?_sort=mentor,-1";
  } else if (ordenacaoMentoria === "desc") {
    textopesquisa += textopesquisa ? "&_sort=mentoria,1" : "?_sort=mentoria,1"; // Ordena por Mentoria (título) ascendente por padrão
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
      `http://localhost:3000/turmas${textopesquisa}`
    );
    const turmaJson = await response.json();

    // Obtém o total de mentores no cabeçalho da resposta
    const totalTurmas = parseInt(response.headers.get("X-Total-Count"));

    mostrarTurma(turmaJson, totalTurmas);
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

const exibirControlesPaginacao = (totalTurmas) => {
  const paginationControls = document.getElementById("paginationControls");
  const totalPages = Math.ceil(totalTurmas / 5); // 10 é o número de itens por página

  let paginationHTML = "";

  for (let i = 1; i <= totalPages; i++) {
    paginationHTML += `
    <button onclick="mudarPagina(${i})" class="btnPaginacao">${i}</button>
    `;
  }

  paginationControls.innerHTML = paginationHTML;
};

const mudarPagina = (pageNumber) => {
  buscarTumar(null, pageNumber);
};
buscarTumar(null, ordenacaoTurmas, 1);

// Função assíncrona para deletar uma turma
const deletTurma = async (turmaId) => {
  try {
    await fetch(`http://localhost:3000/turmas/${turmaId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    buscarTumar();
  } catch (erro) {
    console.log(erro);
  }
};

// Chama a função buscarTumar para obter as turmas e exibi-las na tabela
buscarTumar();
// Função para redirecionar para a página de criação de nova turma
// Função para redirecionar para a página de edição de uma turma
const editarTuma = (id) => {
  window.location = `../Turmas/editarturma.html?id=${id}`;
};
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
