const tbody = document.querySelector("#tbody");
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
  buscarMentorias(null, 1, novoValor);
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
// Variáveis de controle para ordenação dos mentores
let ordenacaoMentoria = "asc";
let ordenacaoNome = "asc";
let ordenacaoStatus = "asc";

// Função para alternar a ordenação por Mentoria
const ordenarPorMentoria = () => {
  if (ordenacaoMentoria === "asc") {
    ordenacaoMentoria = "desc"; // Se a ordenação atual for ascendente, muda para descendente
  } else {
    ordenacaoMentoria = "asc"; // Caso contrário, muda para ascendente
  }
  atualizarIconeOrdenacao("setaMentoria", ordenacaoMentoria); // Primeiro atualiza o ícone de ordenação
  buscarMentorias(null, ordenacaoMentoria); // Em seguida, chama a função de busca com a nova ordenação
};

// Função para alternar a ordenação por nome
const ordenarPorNome = () => {
  if (ordenacaoNome === "asc") {
    ordenacaoNome = "desc"; // Se a ordenação atual for ascendente, muda para descendente
  } else {
    ordenacaoNome = "asc"; // Caso contrário, muda para ascendente
  }
  atualizarIconeOrdenacao("setaNome", ordenacaoNome); // Primeiro atualiza o ícone de ordenação
  buscarMentorias(null, ordenacaoNome); // Em seguida, chama a função de busca com a nova ordenação
};

// Função para alternar a ordenação por status
const ordenarPorStatus = () => {
  if (ordenacaoStatus === "asc") {
    ordenacaoStatus = "desc"; // Se a ordenação atual for ascendente, muda para descendente
  } else {
    ordenacaoStatus = "asc"; // Caso contrário, muda para ascendente
  }
  atualizarIconeOrdenacao("setaStatus", ordenacaoStatus); // Primeiro atualiza o ícone de ordenação
  buscarMentorias(null, ordenacaoStatus); // Em seguida, chama a função de busca com a nova ordenação
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

// Função para buscar todas as mentorias
const buscarMentorias = async (pesquisa = null, page = 1) => {
  // Recupere o novo valor selecionado do select de paginação
  const limit = selectPaginacaoElement.value;

  let textopesquisa = "";

  if (pesquisa) {
    textopesquisa = `?q=${pesquisa}`;
  }

  if (ordenacaoMentoria === "desc") {
    textopesquisa += textopesquisa ? "&_sort=titulo,-1" : "?_sort=titulo,-1";
  } else if (ordenacaoStatus === "desc") {
    textopesquisa += textopesquisa ? "&_sort=status,-1" : "?_sort=status,-1";
  } else if (ordenacaoNome === "desc") {
    textopesquisa += textopesquisa
      ? "&_sort=mentor.name,1"
      : "?_sort=mentor.name,1"; // Ordena por Mentoria (título) ascendente por padrão
  }

  // Adicione os parâmetros de paginação na URL da requisição
  textopesquisa += `${textopesquisa ? "&" : "?"}_page=${page}&_limit=${limit}`;

  try {
    const response = await fetch(
      `https://api-projetofinal-arnia-md1.onrender.com/mentorias${textopesquisa}`
    );
    const mentoriasJson = await response.json();

    // Obtém o total de mentores no cabeçalho da resposta
    const totalMentoria = parseInt(response.headers.get("X-Total-Count"));

    mostrarMentorias(mentoriasJson, totalMentoria);
    exibirControlesPaginacao(totalMentoria, limit);
  } catch (erro) {
    console.log(erro);
  }
};

// Função para exibir as mentorias na tabela
const mostrarMentorias = (dados, totalMentorias) => {
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
            <i class="fas fa-edit iEditar" onclick="editarMentoria(${
              dados.id
            })"></i>
            <i class="fas fa-trash iExcluir" onclick="deleMentoria(${
              dados.id
            })"></i>
          </td>
        </tr>
    `;
  });
  exibirControlesPaginacao(totalMentorias);
};

const exibirControlesPaginacao = (totalMentorias, limit) => {
  const paginationControls = document.getElementById("paginationControls");
  const totalPages = Math.ceil(totalMentorias / limit);

  let paginationHTML = "";

  for (let i = 1; i <= totalPages; i++) {
    paginationHTML += `
    <button onclick="mudarPagina(${i})" class="btnPaginacao">${i}</button>
    `;
  }

  paginationControls.innerHTML = paginationHTML;
  // Atualize o valor selecionado no select de paginação
  const selectPaginacaoElement = document.querySelector("#selectPaginacao");
  selectPaginacaoElement.value = limit;
};

const mudarPagina = (pageNumber) => {
  buscarMentorias(null, pageNumber);
};
buscarMentorias(null, "asc", 1);

// Função para deletar uma mentoria
const deleMentoria = async (mentoriaId) => {
  try {
    await fetch(
      `https://api-projetofinal-arnia-md1.onrender.com/mentorias/${mentoriaId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    buscarMentorias();
  } catch (erro) {
    console.log(erro);
  }
};

buscarMentorias(); // Chama a função para buscar e exibir as mentorias

// Função para redirecionar para a página de edição de mentoria com o ID
const editarMentoria = (id) => {
  window.location = `editarmentoria.html?id=${id}`;
};

// Função para redirecionar para a página de criação de nova mentoria
const novaMentoria = () => {
  window.location = "../Mentorias/novamentoria.html";
};

inputSearch.addEventListener("keyup", (e) => {
  const texto = inputSearch.value;
  if (texto === "") {
    buscarMentorias();
  } else if (e.key === "Enter") {
    buscarMentorias(texto);
  }
});
