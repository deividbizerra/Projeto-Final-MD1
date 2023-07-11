// Seleciona o elemento <tbody> do HTML
const tbody = document.querySelector("tbody");

// Função assíncrona para buscar as turmas
const buscarTumar = async () => {
  try {
    const response = await fetch("http://localhost:3000/turmas");
    const turmaJson = await response.json();
    mostrarTurma(turmaJson);
  } catch (erro) {
    console.log(erro);
  }
};

// Função para redirecionar para a página de edição de uma turma
const editarTuma = (id) => {
  window.location = `../Turmas/editarturma.html?id=${id}`;
};

// Função para exibir as turmas na tabela
const mostrarTurma = (dados) => {
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
            <i class="fas fa-edit iMentorEditar" onclick="editarTuma(${dados.id})"></i>
            <i class="fas fa-trash iMentorExcluir" onclick="deletTurma(${dados.id})"></i>
          </td>
        </tr>
        `;
  });
};

// Chama a função buscarTumar para obter as turmas e exibi-las na tabela
buscarTumar();

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

// Função para redirecionar para a página de criação de nova turma
const novaTurma = () => {
  window.location = "../Turmas/novaturma.html";
};

// Função para pesquisar as turmas
const pesquisar = () => {
  const digitado = inputSearch.value.toLowerCase();
  // Obtém o valor digitado no input de busca em letras minúsculas e armazena na variável 'digitado'

  const itens = tbody.getElementsByTagName("tr");
  // Obtém todos os elementos <tr> dentro do elemento <tbody> e armazena na variável 'itens'

  for (let posicao in itens) {
    // Itera sobre os elementos 'itens' usando a variável 'posicao'

    if (true === isNaN(posicao)) {
      continue;
      // Verifica se 'posicao' não é um número (índice inválido) e pula para a próxima iteração
    }

    let conteudoTabela = itens[posicao].innerHTML.toLowerCase();
    // Obtém o conteúdo HTML do elemento <tr> atual em letras minúsculas e armazena na variável 'conteudoTabela'

    if (true === conteudoTabela.includes(digitado)) {
      itens[posicao].style.display = "";
      // Se o valor digitado estiver presente no conteúdo da tabela, mostra o elemento <tr>
    } else {
      itens[posicao].style.display = "none";
      // Caso contrário, oculta o elemento <tr>
    }
  }
};
