// Seleciona os elemento do Html através do seu ID
const tbody = document.querySelector("#tbody");
const formMentores = document.querySelector("#formMentores");
const Erroname = document.querySelector("#nome");
const Erroemail = document.querySelector("#email");
const inputSearch = document.getElementById("inputSearch");
const checkboxDark = document.getElementById("checkboxDark");

// Função assíncrona para buscar os mentores
const buscarMentores = async () => {
  try {
    // Faz uma requisição na API para obter os dados dos mentores
    const response = await fetch("http://localhost:3000/mentores");
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
  tbody.innerHTML = "";

  dados.forEach((dados) => {
    // Cria uma nova linha na tabela com os dados do mentor
    tbody.innerHTML =
      tbody.innerHTML +
      `
        <tr>
          <td class="nameMentores">${dados.name}</td>
          <td>${dados.email}</td>
          <td class="icones">
            <i class="fas fa-edit iMentorEditar" onclick="editarMentores(${dados.id})"></i>
            <i class="fas fa-trash iMentorExcluir" onclick="deleMentor(${dados.id})"></i>
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

// Função para cadastrar um novo mentor
const cadastrarMentores = async (mentores) => {
  try {
    // Faz uma requisição POST para a API para cadastrar o mentor
    await fetch(`http://localhost:3000/mentores`, {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(mentores),
    });

    // Redireciona o usuário para a página "../mentores.html" após o cadastro
    window.location = "../Mentores/mentores.html";
  } catch (error) {
    console.log(error);
  }
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

// Adiciona um listener de evento para o evento "submit" do formulário "formMentores"
formMentores.addEventListener("submit", (e) => {
  e.preventDefault();

  // Obtém os valores dos campos de nome e e-mail do formulário
  const name = formMentores.elements["nome"].value;
  const email = formMentores.elements["email"].value;

  if (name && email !== "") {
    // Cria um objeto "mentores" com os valores do nome e e-mail
    const mentores = {
      name,
      email,
    };

    // Chama a função "cadastrarMentores" passando o objeto "mentores" como argumento
    cadastrarMentores(mentores);
  } else {
    // Caso algum dos campos esteja vazio, adiciona a classe "invalido" para exibir um estilo de erro
    Erroname.classList.add("invalido");
    Erroemail.classList.add("invalido");
  }
});
