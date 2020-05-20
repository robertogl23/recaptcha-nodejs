
const express = require('express');
const app = express();
const request = require('request');
const secretKey = "6Lf_0_kUAAAAAIqqDTejQQxCA9L6cIKlxbvVgr3O"

let n = ''
app.use(express.static(__dirname + '/public'))

app.set('view engine','hbs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.get('/' ,(req, res) =>{
  res.render('index',{
    title: 'Pagina 1',
  })

});
app.get('/home' ,(req, res) =>{
  res.render('home',{
    title: n,
  })

});

app.post('/captchaV3' ,(req,res) => {
  const {token,name }= req.body;

  const url = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${token}`
  if(!token){
    return res.json({
      msj: 'error'
    })
  }
  request(url,(err,response,body)=>{
    if(err){
      return res.json({
        msj: 'error'
      })
    }
    const results = JSON.parse(body)
    const {success,score} = results
    console.log(success,score,name)
    if(success != true || score === 0.7){
      return res.json({
        msj: 'error'
      })
    }
    res.json({
      msj: 'correcto'
    })
    return   n = name
  })
})
app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
