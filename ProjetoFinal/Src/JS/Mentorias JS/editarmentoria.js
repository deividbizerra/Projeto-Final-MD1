let idEditar = null;
const formulario = document.getElementById("formMentorias");

// Função para recuperar o ID da mentoria a ser editada
const recuperarId = () => {
  const param = window.location.search;
  const paramObj = new URLSearchParams(param);
  const id = paramObj.get("id");
  return id;
};

// Função para buscar os dados da mentoria na API
const buscarMentoria = async (id) => {
  const resposta = await fetch(
    `http://localhost:3000/mentorias/${id}`
  );
  const autorJson = await resposta.json();
  return autorJson;
};

// Função para carregar os dados da mentoria no formulário
const carregarDadosMentoria = (mentoria) => {
  // Atribui o valor do título da mentoria ao campo correspondente
  document.getElementById("tituloMentoria").value = mentoria.titulo;

  // Atribui o valor do status da mentoria ao elemento correspondente
  document.getElementById("statusMessage").textContent = mentoria.status;

  // Atribui o ID do mentor como valor selecionado no campo de seleção
  document.getElementById("mentor").value = mentoria.mentor.id;
};

// Função para editar a mentoria na API
const editarMentoria = async (id, mentoria) => {
  // Realiza uma requisição PUT para atualizar a mentoria com os novos dados
  await fetch(
    `http://localhost:3000/mentorias/${id}`,
    {
      method: "PUT",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      // Inclui os dados da mentoria no corpo da requisição, alterando o mentor para conter apenas o nome
      body: JSON.stringify({
        ...mentoria,
        mentor: { name: mentoria.mentor.name },
      }),
    }
  );
};

// Função para carregar os dados da mentoria a ser editada
const carregarDadosEditar = async () => {
  // Recupera o ID da mentoria a ser editada
  idEditar = recuperarId();

  // Busca os dados da mentoria na API
  const mentoria = await buscarMentoria(idEditar);

  // Carrega os dados da mentoria no formulário
  carregarDadosMentoria(mentoria);
};

// Função para validar o status da mentoria
const validarStatus = () => {
  const checkboxStatus = document.getElementById("checkboxStatus");
  const statusMessageElement = document.getElementById("statusMessage");

  if (checkboxStatus.checked) {
    statusMessageElement.textContent = "Ativo";
  } else {
    statusMessageElement.textContent = "Inativo";
  }
};

// Função para obter a lista de mentores da API
const pegarMentorias = async () => {
  const resposta = await fetch(
    `http://localhost:3000/mentores`
  );
  const autoresJson = await resposta.json();
  return autoresJson;
};

// Função para adicionar as opções de mentores no campo de seleção
const adicionarSelect = async () => {
  // Obtém a lista de mentores da API
  const autores = await pegarMentorias();
  const autorSelect = document.getElementById("mentor");

  //Adiciona uma opção vazia ao campo de seleção
  const optionVazia = new Option("Selecione um mentor...");
  autorSelect.options.add(optionVazia);

  // Adiciona as opções de mentores ao campo de seleção
  autores.forEach((mentoria) => {
    const opcao = new Option(mentoria.name, mentoria.id);
    autorSelect.options.add(opcao);
  });
};

// Adiciona um ouvinte de evento para o envio do formulário
formulario.addEventListener("submit", async (e) => {
  e.preventDefault();

  // Obtém os valores do formulário
  const titulo = formulario.elements["tituloMentoria"].value;
  const mentorSelect = document.getElementById("mentor");
  const mentorOption = mentorSelect.options[mentorSelect.selectedIndex];
  const mentorId = mentorOption.value;
  const mentorName = mentorOption.text;
  const status = document.getElementById("statusMessage").textContent;

  // Constrói o objeto mentoria com os valores obtidos
  const mentoria = {
    titulo,
    status,
    mentor: {
      id: mentorId,
      name: mentorName,
    },
  };

  // Chama a função editarMentoria para salvar as alterações na API
  editarMentoria(idEditar, mentoria);

  // Redireciona o usuário para a página de mentorias
  window.location = "../Mentorias/mentorias.html";
});

// Carrega os dados da mentoria a ser editada e as opções de mentores no carregamento da página
adicionarSelect();
carregarDadosEditar();
