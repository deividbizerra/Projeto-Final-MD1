const tbody = document.querySelector("tbody")


const buscarTumar = async ()=>{
    try{
        const response = await fetch("http://localhost:3000/turmas")
        const turmaJson = await response.json()
        mostrarTurma(turmaJson)
    }catch(erro){
        console.log(erro)
    }
}

const editarTuma = (id) => {
    window.location = `editarmturma.html?id=${id}`;
  };

const mostrarTurma = (dados)=>{
    tbody.innerHTML = ""

    dados.forEach(dados => {
        tbody.innerHTML += `
        <tr>
          <td class="nameMentores">${dados.turma}</td>
          <td>${dados.name}</td>
          <td>${dados.mentoria}</td>
          <td>${dados.dataInicio}</td>
          <td>${dados.diaSemana}</td>
          <td>${dados.horario}</td>
          <td>${dados.encontros}</td>
          <td class="icones">
            <i class="fas fa-edit iMentorEditar" onclick="editarMentoria(${
              dados.id
            })"></i>
            <i class="fas fa-trash iMentorExcluir" onclick="deletTurma(${
              dados.id
            })"></i>
          </td>
        </tr>
        `
    });
}

buscarTumar()

const deletTurma = async (turmaId)=>{
    try{
        await fetch (`http://localhost:3000/turmas/${turmaId}`,{
            method: "DELETE",
            headers:{
                "Content-Type": "application/json",
            }
        })
    }catch(erro){
        console.log(erro)
    }
}

const novaTurma = () => {
    window.location = "../Turmas/novaturma.html";
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
  