$(document).ready(function(){
  document.getElementById('animation_load').style.display="none"
  document.getElementById('screnn').style.display="block"

   let matricula = document.getElementById('spanMat').innerText
   const usuario = firebase.database().ref(`CPA/${matricula}/0/`)
  usuario.update({login:1});
})
$(function(){
  let iframe = document.getElementById('iframeTurma').innerText
  let newIframe = iframe.replace(/[\\]/g,'')
  $('#iframeCol').html(newIframe)
  document.getElementsByTagName('iframe')[0].setAttribute('width','100%');

  const finalizar = document.getElementById('btn_fim');
  finalizar.addEventListener('click', ()=>{
    document.getElementById('animation_load').style.display="block";
    document.getElementById('screnn').style.display="none";
   let matricula = document.getElementById('spanMat').innerText;
    const usuario = firebase.database().ref(`CPA/${matricula}/0/`);
    usuario.update({forms:1}); 
    window.location.href = "/";
  })
})