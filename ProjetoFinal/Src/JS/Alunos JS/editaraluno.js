const formulario = document.getElementById("formAlunos");

let idEditar = null

const recuperarId = ()=>{
    const param = window.location.search
    const paramObj = new URLSearchParams(param)
    const id = paramObj.get("id")
    return id
}

const buscarAlunos = async (id)=>{
    const resposta = await fetch(`http://localhost:3000/alunos/${id}`)
    const alunoJson = await resposta.json()
    return alunoJson
}

const carregarDadosAlunos = (alunos)=>{
    document.getElementById("nome").value = alunos.nome
    document.getElementById("email").value = alunos.email
    document.getElementById("turma").value = alunos.turma
}

const editarAluno = async (id, alunos)=>{
    await fetch(`http://localhost:3000/alunos/${id}`,{
        method: "PUT",
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
        },
        // Inclui os dados da mentoria no corpo da requisição, alterando o mentor para conter apenas o nome
        body: JSON.stringify(alunos),
    })
}


const carregarDadosEditar = async ()=>{
    idEditar = recuperarId()
    const aluno = await buscarAlunos(idEditar)
    carregarDadosAlunos(aluno)
}


const buscarTurmas = async () => {
    const response = await fetch(`http://localhost:3000/turmas`);
    const turmaJson = await response.json();
    return turmaJson;
  };
  
  const carregarSelecTurmas = async () => {
    const alunos = await buscarTurmas();
    const alunosSelect = document.getElementById("turma");
  
    const opVazia = new Option("Selecione uma turma...", null);
    alunosSelect.options.add(opVazia);
  
    alunos.forEach((turma) => {
      const opcoes = new Option(turma.turma);
      alunosSelect.options.add(opcoes);
    });
  };


  formulario.addEventListener("submit", async (e)=>{
    e.preventDefault()

    const nome = formulario.elements["nome"].value
    const email = formulario.elements["email"].value
    const turmaSelect = document.getElementById("turma");
    const turmaOption = turmaSelect.options[turmaSelect.selectedIndex];
    const turmaName = turmaOption.text;

    const alunos = {
        nome,
        email,
        turma:turmaName
    }
    editarAluno(idEditar, alunos)
    window.location = "../Alunos/alunos.html";
  })


carregarSelecTurmas()
carregarDadosEditar()