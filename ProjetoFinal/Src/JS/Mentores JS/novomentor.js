const formMentores = document.querySelector("#formMentores");
const Erroname = document.querySelector("#nome");
const Erroemail = document.querySelector("#email");

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
