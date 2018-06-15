const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
var app = express();

hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine','hbs');


// app.use((req,res,next) => {
//   res.render('maintenance.hbs');
// });

app.use(express.static(__dirname + '/public'));
app.use((req,res,next) => {
  var now = new Date().toString();
  var log=`${now}: ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFileSync('server.log',log+'\n');
  next();
});

hbs.registerHelper('getCurrentYear',() => {
  return new Date().getFullYear()
})

app.get('/',(req,res) => {
  res.render('home.hbs',{
    pagetitle : 'Home Page',
    welcomeMessage : 'Welcome to my website',
  });
});


app.get('/about',(req,res) => {
  res.render('about.hbs',{
    pagetitle : 'About page',
  });
});

app.get('/bad',(req,res) => {
  res.send({
    errormessage : 'Unable to handle request'
  });
});

app.listen(3000,() => {
  console.log('Server running at port 3000');
});
