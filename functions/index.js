const app=require('./config/settings');
const functions = require('firebase-functions');
const firebase = require('firebase');
const admin=require('firebase-admin');


let firebaseConfig = {
  apiKey: "AIzaSyBGD14jOaYyhY4qyUR_fuE--nNZzD-h8PU",
  authDomain: "app-meta-d0e38.firebaseapp.com",
  databaseURL: "https://app-meta-d0e38.firebaseio.com",
  projectId: "app-meta-d0e38",
  storageBucket: "app-meta-d0e38.appspot.com",
  messagingSenderId: "814301693682",
  appId: "1:814301693682:web:c7751451cf48e857cb326b"
};
firebase.initializeApp(firebaseConfig);


const ref = firebase.database().ref('CPA/'); 
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
app.get('/',(req, res)=>{
  res.set('Cache-Control', 'public, max-age=300, s-maxage=600');
  res.status(200).render('index');
})
app.get('/lista',(req, res)=>{
  res.set('Cache-Control', 'public, max-age=300, s-maxage=600');
  res.status(200).render('lista');
})
app.post('/logincpa', (req, res)=>{
  const data = req.body;
  const matricula = data.matricula;
  const cpf = data.cpf;
  ref.once('value').then(snap=>{
    //Verifica a existência da metrícula
    if((snap.hasChild(matricula))==true){
      const refUser = firebase.database().ref(`CPA/${matricula}/0/`)
      refUser.once('value').then(dataUser=>{
        const user = dataUser.val()
        const refiframe = firebase.database().ref(`CPA/turmas/${user.NomeTurma}`)
        //compara o cpf
        if(user.Cpf == cpf){
          //verifica o formulário
          if(user.forms==0){
            refiframe.once('value').then(userIframe=>{
              res.set('Cache-Control', 'public, max-age=300, s-maxage=600');
              res.status(200).render('cpa_form',{user, turmaIframe: userIframe.val()});
            }, error=>{
              let code = error.code
              let message = error.message
              res.status(200).send(`A promessa foi rejeitada <br> Code: ${code} <br> Message: ${message}`)
            })
            .catch(e=>{
              res.status(200).send(`A turma não foi encontrada...`)
            })
          }else{
            //Formulário já foi finalizado
            res.status(200).send('3');
          }
        }else{
          //cpf incorreto
          res.status(200).send('2');
        }
      }, error=>{
        let code = error.code
        let message = error.message
        res.status(200).send(`A promessa foi rejeitada <br> Code: ${code} <br> Message: ${message}`)
      })
      .catch(error=>{
        let code = error.code
        let message = error.message
        res.status(200).send(`A promessa foi rejeitada <br> Code: ${code} <br> Message: ${message}`)
      })
    }else{
      //usuário não existe
      res.status(200).send('1');
    }
  },error=>{
    let code = error.code
    let message = error.message
    res.status(200).send(`A promessa foi rejeitada <br> Code: ${code} <br> Message: ${message}`)
  })
  .catch(error=>{
    let code = error.code
    let message = error.message
    res.status(200).send(`A promessa foi rejeitada <br> Code: ${code} <br> Message: ${message}`)
  })

})
exports.app = functions.https.onRequest(app);
