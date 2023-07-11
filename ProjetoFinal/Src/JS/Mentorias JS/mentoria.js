const tbody = document.querySelector("#tbody");
const formMentores = document.querySelector("#formMentorias");

let mentoriaId = null;

// Função para buscar todas as mentorias
const buscarMentorias = async () => {
  try {
    const response = await fetch("http://localhost:3000/mentorias");
    const mentoriasJson = await response.json();

    mostrarMentorias(mentoriasJson);
  } catch (erro) {
    console.log(erro);
  }
};

// Função para redirecionar para a página de edição de mentoria com o ID
const editarMentoria = (id) => {
  window.location = `editarmentoria.html?id=${id}`;
};

// Função para exibir as mentorias na tabela
const mostrarMentorias = (dados) => {
  tbody.innerHTML = ""; // Limpa o conteúdo anterior da tabela

  dados.forEach((dados) => {
    tbody.innerHTML += `
    <tr>
          <td class="nameMentores">${dados.titulo}</td>
          <td class="inputName">${dados.mentor.name}</td>
          <td id="status" class="status ${
            dados.status === "Ativo" ? "status-ativo" : "status-inativo"
          }">${dados.status}</td>
          <td class="icones">
            <i class="fas fa-edit iMentorEditar" onclick="editarMentoria(${
              dados.id
            })"></i>
            <i class="fas fa-trash iMentorExcluir" onclick="deleMentoria(${
              dados.id
            })"></i>
          </td>
        </tr>
    `;
  });
};


buscarMentorias();// Chama a função para buscar e exibir as mentorias

// Função para deletar uma mentoria
const deleMentoria = async (mentoriaId) => {
  try {
    await fetch(`http://localhost:3000/mentorias/${mentoriaId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    buscarMentorias()
  } catch (erro) {
    console.log(erro);
  }
};

// Função para redirecionar para a página de criação de nova mentoria
const novaMentoria = () => {
  window.location = "../Mentorias/novamentoria.html";
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
