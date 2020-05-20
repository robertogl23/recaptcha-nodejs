
const express = require('express');
const app = express();
const request = require('request');
const secretKey = "6Lf_0_kUAAAAAIqqDTejQQxCA9L6cIKlxbvVgr3O"
app.use(express.static(__dirname + '/public'))

app.set('view engine','hbs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.get('/' ,(req, res) =>{
  res.render('index',{
    title: 'Pagina 1'
  })

});

app.post('/captchaV3' ,(req,res) => {
  const token = req.body.token;
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
    console.log(success,score)
    if(success != true || score === 0.7){
      return res.json({
        msj: 'error'
      })
    }
    return res.json({
      msj: 'correcto'
    })
  })
})
app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
