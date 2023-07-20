// Seleciona o elemento <tbody> do HTML
const tbody = document.querySelector("tbody");

// Função assíncrona para buscar as turmas
const buscarTumar = async (pesquisa = null) => {
  let textopesquisa = "";

  if (pesquisa) {
    textopesquisa = `?q=${pesquisa}`;
  }

  try {
    const response = await fetch(
      `https://api-projetofinal-arnia-md1.onrender.com/turmas${textopesquisa}`
    );
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
            <i class="fas fa-edit iEditar" onclick="editarTuma(${dados.id})"></i>
            <i class="fas fa-trash iExcluir" onclick="deletTurma(${dados.id})"></i>
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
