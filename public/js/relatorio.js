window.onload = function(){
  document.getElementById('animation_load').style.display="none";
  document.getElementById('container').style.display="block";
}
$(function(){
  let TBODY = document.getElementById('tbody-main')
  let REF = firebase.database().ref('CPA/')
  
  REF.once('value').then(snap=>{
    snap.forEach(value=>{
      if(value.key!='turmas'){
      const NEWREF = firebase.database().ref(`CPA/${value.key}/0/`);
        NEWREF.once('value').then((newsnap)=>{
          const DADOS = newsnap.val();
          let turmaSnap, matriculaSnap;
          if((DADOS.NomeTurma).length>=11){
            matriculaSnap = (value.key).substring(7,0);
            turmaSnap = 'PROFESSOR';
            addIntoTable(matriculaSnap, DADOS.Aluno, turmaSnap, DADOS.login, DADOS.forms);
          }else if((DADOS.NomeTurma)=='ADM'){
            matriculaSnap = (value.key).substring(7,0);
            addIntoTable(matriculaSnap, DADOS.Aluno, DADOS.NomeTurma, DADOS.login, DADOS.forms);
          }else{
            addIntoTable(value.key, DADOS.Aluno, DADOS.NomeTurma, DADOS.login, DADOS.forms);
          }
        })
      }
    })
  })
  function addIntoTable(mat, nome, turma, login, form){
    //Pegando primeiro e ultimo nome
    let modNome = nome.split(" ");
    let nomesnap = modNome[0]+" "+modNome[modNome.length-1]
    //Criando elementos
    let tr = document.createElement('tr');
    let thMat = document.createElement('th');
    let tdNome = document.createElement('td');
    let tdTurma = document.createElement('td');
    let tdLogin = document.createElement('td');
    let divLogin =document.createElement('div');
    let tdForm = document.createElement('td');
    let divForm = document.createElement('div');

    //configurando elemento de matricula
    thMat.setAttribute('scop','row');
    thMat.innerText=mat;

    //configurando elemento de Nome 
    tdNome.innerText=nomesnap.toUpperCase();

    //Configurando elemento Turma
    tdTurma.innerText=turma;
    //Cofigurando Login
    if(login!='0'){
      divLogin.classList.add('icon-green');
      tdLogin.appendChild(divLogin);
    }else{
      divLogin.classList.add('icon-red');
      tdLogin.appendChild(divLogin);
    }

    //Configurando Form
    if(form!='0'){
      divForm.classList.add('icon-green');
      tdForm.appendChild(divForm);
    }else{
      divForm.classList.add('icon-red');
      tdForm.appendChild(divForm);
    }

    //Adicionando elementos a tabela
    tr.appendChild(thMat);
    tr.appendChild(tdNome);
    tr.appendChild(tdTurma);
    tr.appendChild(tdLogin);
    tr.appendChild(tdForm);
    TBODY.appendChild(tr);
  }

})

