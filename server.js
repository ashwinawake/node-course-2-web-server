const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
let app = express();

hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

app.use((request, response, next) => {
  let now = new Date().toString();
  let log = `${now}: ${request.method} ${request.url}`;
  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) => {
    if(err) {
      console.log('Unable to append to server.log.')
    }
  });
  next();
});

// app.use((request, response, next) => {
//   response.render('maintenance.hbs');
//   //next();
// });

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

app.get('/', (request, response) => {
  //response.send('<h1>Hello Express!</h1>');
  response.render('home.hbs', {
    pageTitle: 'Welcome Page',
    welcomeMessage: 'Welcome to my page!'
  });
});

app.get('/about', (request, response) => {
  response.render('about.hbs', {
    pageTitle: 'About Page',
    welcomeMessage: 'Welcome to my page!'
  });
});

// bad - send back json with errorMessage
app.get('/bad', (request, response) => {
  response.send({
    error: 'Cannot establish connection to server,'
  })
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
