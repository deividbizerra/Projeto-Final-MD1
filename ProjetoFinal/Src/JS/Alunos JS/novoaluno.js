const formulario = document.getElementById("formAlunos");

// Função assíncrona para buscar todos os mentores
const buscarTurmas = async () => {
  const response = await fetch(`http://localhost:3000/turmas`);
  const turmaJson = await response.json();
  return turmaJson;
};

const carregarSelect = async () => {
  const alunos = await buscarTurmas();
  const alunosSelect = document.getElementById("turma");

  const opVazia = new Option("Selecione uma turma...", null);
  alunosSelect.options.add(opVazia);

  alunos.forEach((turma) => {
    const opcoes = new Option(turma.turma);
    alunosSelect.options.add(opcoes);
  });
};

const cadastrarNovoAluno = async (aluno) => {
  try {
    await fetch(`http://localhost:3000/alunos`, {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(aluno),
    });
    window.location = "../Alunos/alunos.html";
  } catch (error) {
    console.log(error);
  }
};


formulario.addEventListener("submit", async (e) => {
  e.preventDefault();

  const nome = formulario.elements["nome"].value;
  const email = formulario.elements["email"].value;
  const turmaSelect = document.getElementById("turma");
  const turmaOption = turmaSelect.options[turmaSelect.selectedIndex];
  const turmaName = turmaOption.text;

  const alunos = {
    nome,
    email,
    turma: turmaName
  };
  cadastrarNovoAluno(alunos);
});

carregarSelect();