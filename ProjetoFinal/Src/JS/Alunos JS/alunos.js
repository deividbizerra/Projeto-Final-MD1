// Seleciona o elemento tbody da tabela onde os alunos serão exibidos
const tbody = document.querySelector("#tbody");

// Seleciona o formulário de alunos
const formMentores = document.querySelector("#formAlunos");

// Função assíncrona para buscar os alunos
const buscarAluno = async (pesquisa = null) => {
  let textopesquisa = "";

  // Verifica se há uma pesquisa a ser feita e monta a query de pesquisa
  if (pesquisa) {
    textopesquisa = `?q=${pesquisa}`;
  }

  try {
    // Faz uma requisição na API para obter os dados dos alunos
    const response = await fetch(
      `https://api-projetofinal-arnia-md1.onrender.com/alunos${textopesquisa}`
    );
    // Converte a resposta em JSON
    const alunosJson = await response.json();
    // Chama a função para exibir os alunos na tabela
    mostrarAlunos(alunosJson);
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
const mostrarAlunos = (dados) => {
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
};

// Inicia a busca e exibição dos alunos na tabela
buscarAluno();

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
