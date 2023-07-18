const tbody = document.querySelector("#tbody");
const formMentores = document.querySelector("#formMentorias");

let mentoriaId = null;

// Função para buscar todas as mentorias
const buscarMentorias = async (pesquisa = null) => {

  let textopesquisa = "";

  if (pesquisa) {
    textopesquisa = `?q=${pesquisa}`;
  }

  try {
    const response = await fetch(`http://localhost:3000/mentorias${textopesquisa}`);
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

inputSearch.addEventListener("keyup", (e) => {
  const texto = inputSearch.value;
  if (texto === "") {
    buscarMentorias();
  } else if (e.key === "Enter") {
    buscarMentorias(texto);
  }
});
