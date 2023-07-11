const tbody = document.querySelector("#tbody");
const formMentores = document.querySelector("#formAlunos");

const buscarAluno = async () => {
  try {
    const response = await fetch(`http://localhost:3000/alunos`);
    const alunosJson = await response.json();
    mostrarAlunos(alunosJson);
  } catch (error) {
    console.log(error);
  }
};

const editarAluno = (id) => {
  window.location = `editaraluno.html?id=${id}`;
};

const mostrarAlunos = (dados) => {
  tbody.innerHTML = "";

  dados.forEach((dados) => {
    tbody.innerHTML += `
    <tr>
          <td class="nameMentores">${dados.nome}</td>
          <td class="inputName">${dados.turma}</td>
          <td>${dados.email}</td>
          <td class="icones">
            <i class="fas fa-edit iMentorEditar" onclick="editarMentoria(${dados.id})"></i>
            <i class="fas fa-trash iMentorExcluir" onclick="deletAluno(${dados.id})"></i>
          </td>
        </tr>
    `;
  });
};

buscarAluno();

const deletAluno = async (alunoId) => {
  try {
    await fetch(`http://localhost:3000/alunos/${alunoId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    buscarAluno();
  } catch (erro) {
    console.log(erro);
  }
};

const novoAluno = () => {
  window.location = "../Alunos/novoaluno.html";
};

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
