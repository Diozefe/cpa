
window.onload = function(){
  document.getElementById('animation_load').style.display="none"
  document.getElementById('screnn').style.display="block"
}
$(function(){
  $('#entrar').click(function(){
    $('#animation_load').css('display','block')
    $('#animation_load').fadeIn(1000)
    $('#screnn').css('display','none')
    let matricula = $('#matricula').val(), cpf = $('#cpf').val()
    let erro = document.createElement('div');
        erro.setAttribute('id','erro');
        erro.setAttribute('class','erro text-center align-middle');
    if(matricula=='' || matricula==null){
      $('#animation_load').css('display','none')
      $('#screnn').css('display','block')
      $('#screnn').fadeIn(1000)
      erro.innerText='!';
      erro.setAttribute('title','Matrícula Inválida')
      $('#matricula').css('border','solid 1px red');
      document.getElementById('label_matricula').appendChild(erro);
      return
    }
    if(cpf=='' || cpf==null){
      $('#animation_load').css('display','none')
      $('#screnn').css('display','block')
      $('#screnn').fadeIn(1000)
      erro.innerText='!';
      erro.setAttribute('title','CPF Inválida')
      $('#cpf').css('border','solid 1px red');
      document.getElementById('label_cpf').appendChild(erro);
      return
    }
    $.ajax({
      url: '/logincpa',
      method: "POST",
      data: {matricula: matricula, cpf: cpf},
      success: function(data){
        let erro = document.createElement('div');
        erro.setAttribute('id','erro');
        erro.setAttribute('class','erro text-center align-middle');
        switch (data) {
          case '1':
            $('#animation_load').fadeOut(1000)
            $('#animation_load').css('display','none')
            $('#screnn').css('display','block')
            erro.innerText='!';
            erro.setAttribute('title','Usuário Inválido')
            $('#matricula').css('border','solid 1px red');
            document.getElementById('label_matricula').appendChild(erro);
            break;
          case '2':
            $('#animation_load').fadeOut(1000)
            $('#animation_load').css('display','none')
            $('#screnn').css('display','block')
            erro.innerText='!';
            erro.setAttribute('title','CPF Inválida')
            $('#cpf').css('border','solid 1px red');
            document.getElementById('label_cpf').appendChild(erro);
            break;
          case '3':
            $('#animation_load').fadeOut(1000)
            $('#animation_load').css('display','none')
            $('#screnn').css('display','block')
            let notifica = document.createElement('div')
            notifica.setAttribute('class','alert alert-warning alert-dismissible fade show');
            notifica.setAttribute('role','alert');
            notifica.innerHTML='<strong>Opaaaa!</strong> Você já Finalizou seu Formulário!'
            notifica.setAttribute('id','notification')
            let btnClose = document.createElement('button')
            btnClose.setAttribute('type','button');
            btnClose.setAttribute('class','close p-1');
            btnClose.setAttribute('data-dismiss','alert');
            btnClose.setAttribute('aria-label','Close');
            btnClose.setAttribute('type','button');
            let spanClose = document.createElement('span');
            spanClose.setAttribute('aria-hidden','true');
            spanClose.setAttribute('uk-icon','icon: close');
            btnClose.appendChild(spanClose);
            notifica.appendChild(btnClose);
            $('#screnn').append(notifica);
            break;
          default:
            $('#screnn').html(data)
            break;
        }
      }
    });
  })
  $('input').focus(function(){
    let erro = document.getElementsByClassName('erro');
    for(let i=0; i<erro.length;i++){
      erro[i].remove();
    }
    $('#erro').remove();
    $(this).next('span').css('display','none');
    $(this).css('border','none');
  })
})


