// Selecionando os elementos do formulário
const formulario = document.querySelector("#Formlogin");
const email = document.querySelector("#email");
const senha = document.querySelector("#senha");
const label = document.querySelector(".labelLogin");
const idLabel = document.querySelector("#idLabel");
const validacao = document.querySelector("#validacao");

// Adicionando um evento de envio ao formulário
formulario.addEventListener("submit", (e) => {
  e.preventDefault(); // Impedindo o envio padrão do formulário

  let emailValido = true; //Variavel para verificar se o email é valido
  let senhaValida = true; //Variavel para verificar se a senha é valida

  // Verificando se o campo de email está vazio
  if (email.value === "") {
    label.classList.add("invalidoLabel");
    email.classList.add("invalido");
    emailValido = false;
  } else {
    label.classList.remove("invalidoLabel");
    email.classList.remove("invalido");
    label.classList.add("sucessoLabel");
    email.classList.add("sucesso");
  }

  // Verificando se o campo de senha está vazio ou preenchida para adicionar as classes de validação
  if (senha.value === "") {
    idLabel.classList.add("invalidoLabel");
    senha.classList.add("invalido");
    senhaValida = false;
  } else {
    idLabel.classList.remove("invalidoLabel");
    senha.classList.remove("invalido");
    idLabel.classList.add("sucessoLabel");
    senha.classList.add("sucesso");
  }

  // Verificando se tanto o email quanto a senha são válidos
  if (emailValido && senhaValida) {
    validacao.style.display = "none"; // Ocultando a mensagem de validação

    // Verificando se o email e senha correspondem aos valores esperados
    if (email.value == "admin@gmail.com" && senha.value == "admin") {
      // Redirecionando para a página "telainicial.html" após 1 segundo
      setTimeout(function () {
        window.location = "../Html/Mentores/mentores.html";
      }, 1000);
    } else {
      // Exibindo a mensagem de validação e adicionando classes de estilo inválido aos elementos
      label.classList.add("invalidoLabel");
      email.classList.add("invalido");
      idLabel.classList.add("invalidoLabel");
      senha.classList.add("invalido");
      validacao.style.display = "block";
    }
  }
});
