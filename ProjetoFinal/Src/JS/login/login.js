// Selecionando os elementos do formulário
const formulario = document.querySelector("#signin");
const email = document.querySelector("#email");
const senha = document.querySelector("#senha");
const label = document.querySelector(".labelLogin");
const idLabel = document.querySelector("#idLabel");
const validacao = document.querySelector("#validacao");
const signin = document.querySelector("#signin");
const singup = document.querySelector("#singup");
const btnColor = document.querySelector("#btnColor");
const login = document.querySelector("#login");
const cadastrar = document.querySelector("#cadastrar");
const labelCadastr = document.querySelector("#labelCadastrNome");
const Labelemail = document.querySelector("#labelCadastrEmail");
const nomeCompleto = document.querySelector("#nomeCompleto");
const emailCadastro = document.querySelector("#emailCadastr");
const labelSenhaCadastr = document.querySelector("#labelSenhaCadastr");
const senhaCadastr = document.querySelector("#senhaCadastr");

// Altera o estilo ao clicar no botão de login
document.querySelector("#login").addEventListener("click", () => {
  signin.style.left = "75px";
  singup.style.left = "450px";
  btnColor.style.left = "0px";
  login.style.color = "white";
  cadastrar.style.color = "black";
});

// Altera o estilo ao clicar no botão de cadastrar
document.querySelector("#cadastrar").addEventListener("click", () => {
  signin.style.left = "-450px";
  singup.style.left = "75px";
  btnColor.style.left = "110px";
  login.style.color = "black";
  cadastrar.style.color = "white";
});

// Validação do formulário de login
formulario.addEventListener("submit", async (e) => {
  e.preventDefault(); // Impedindo o envio padrão do formulário

  let emailValido = true; // Variável para verificar se o email é válido
  let senhaValida = true; // Variável para verificar se a senha é válida

  // Verifica se o campo de email está vazio e aplica as classes de validação
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

  // Verifica se o campo de senha está vazio e aplica as classes de validação
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

  // Verifica se tanto o email quanto a senha são válidos
  if (emailValido && senhaValida) {
    validacao.style.display = "none"; // Oculta a mensagem de validação

    // Realiza a validação dos dados com sua API de usuários
    const usuarios = await buscarUsuarios(); // Supondo que você já tenha uma função para buscar os usuários da API

    // Verifica se o email e a senha correspondem aos valores esperados
    const usuarioEncontrado = usuarios.find(
      (usuario) =>
        usuario.email === email.value && usuario.senha === senha.value
    );

    if (usuarioEncontrado) {
      // Redireciona para a página "telainicial.html" após 1 segundo
      setTimeout(function () {
        window.location = "ProjetoFinal/Src/Html/Mentores/mentores.html";
      }, 1000);
    } else {
      // Exibe a mensagem de validação e aplica as classes de estilo inválido aos elementos
      label.classList.add("invalidoLabel");
      email.classList.add("invalido");
      idLabel.classList.add("invalidoLabel");
      senha.classList.add("invalido");
      validacao.style.display = "block";
    }
  }
});

// Função assíncrona para cadastrar um usuário
const cadastrarUsuario = async (usuarios) => {
  try {
    // Faz uma requisição POST para a API para cadastrar o usuário
    await fetch(` https://api-projetofinal-arnia-md1.onrender.com/usuarios`, {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(usuarios),
    });
  } catch (error) {
    console.log(error);
  }
};

// Função assíncrona para buscar os usuários da API
const buscarUsuarios = async () => {
  try {
    // Faz uma requisição GET para a API para buscar os usuários
    const response = await fetch(
      ` https://api-projetofinal-arnia-md1.onrender.com/usuarios`
    );
    const usuariosJson = await response.json();
    return usuariosJson;
  } catch (error) {
    console.log(error);
    return [];
  }
};

// Validação do formulário de cadastro
singup.addEventListener("submit", (e) => {
  e.preventDefault();

  const nome = nomeCompleto.value;
  const email = emailCadastro.value;
  const senha = senhaCadastr.value;

  let emailValido = true; // Variável para verificar se o email é válido
  let senhaValida = true; // Variável para verificar se a senha é válida

  // Verifica se o campo de nome está vazio e aplica as classes de validação
  if (nome === "") {
    labelCadastr.classList.add("invalidoLabel");
    nomeCompleto.classList.add("invalido");
    emailValido = false;
  } else {
    labelCadastr.classList.remove("invalidoLabel");
    nomeCompleto.classList.remove("invalido");
    labelCadastr.classList.add("sucessoLabel");
    nomeCompleto.classList.add("sucesso");
  }

  // Verifica se o campo de email está vazio e aplica as classes de validação
  if (email === "") {
    Labelemail.classList.add("invalidoLabel");
    emailCadastro.classList.add("invalido");
    senhaValida = false;
  } else {
    Labelemail.classList.remove("invalidoLabel");
    emailCadastro.classList.remove("invalido");
    Labelemail.classList.add("sucessoLabel");
    emailCadastro.classList.add("sucesso");
  }

  // Verifica se o campo de senha está vazio e aplica as classes de validação
  if (senha === "") {
    labelSenhaCadastr.classList.add("invalidoLabel");
    senhaCadastr.classList.add("invalido");
    emailValido = false;
  } else {
    labelSenhaCadastr.classList.remove("invalidoLabel");
    senhaCadastr.classList.remove("invalido");
    labelSenhaCadastr.classList.add("sucessoLabel");
    senhaCadastr.classList.add("sucesso");
  }

  // Verifica se todos os campos estão preenchidos
  if (nome !== "" && email !== "" && senha !== "") {
    const usuarios = {
      nome,
      senha,
      email,
    };
    cadastrarUsuario(usuarios);
    window.location = "index.html";
  }
});
