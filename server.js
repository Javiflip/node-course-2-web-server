const express = require('express');
const hsb = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000; //grabs port from environment object this is for Heroku to be able to tell program what to use

var app = express(); //creates app


hsb.registerPartials(__dirname + '/views/partials') //will take direcotyr using for handlebar 

// add middleware
app.set('view engine', 'hbs'); //app.set lets you set various express configurations here, will pass in key value pair



//creating middleware. app.use registers middleware
app.use((req, res, next) => { //next i used so you can tell express when middleware function is done
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    console.log(log); 
    fs.appendFile('server.log', log + '\n', (err) => { //filename var to put in + new line, callback to handle errors (required)
        if(err) {
            console.log('Unable to append server.log');
        }

    }); //name and contents
    next();
});


// app.use((req, res, next) => { //next i used so you can tell express when middleware function is done
    
//    //  res.send('About Page');
//     res.render('maintenance.hbs', {
//         pageTitle: 'Maintenance Page',
//     }); //res.render will let you render any template 
  

//      //name and contents
// });

app.use(express.static(__dirname + '/public')); //static takes absolute path of folder you want to serve
                                    //__dirname stores path to server



hsb.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hsb.registerHelper ('screamIt', (text) => {
    return text.toUpperCase();
});

app.get('/',(req, res) => { //req stores info about request (headers, body, method), res has many methods included as well
    //res.send('<h1>Hello Express!</h1>');
    /*res.send({
        name: 'Andrew',
        likes: [
            'Butts',
            'Travelling',
            'Tchotchkes'
        ]
    })*/
    
        //  res.send('About Page');
        res.render('home.hbs', {
            pageTitle: 'Home Page',
            currentYear: new Date().getFullYear(),
            paragraph: 'This is a welcome message for the home page.'
        //res.render will let you render any template 
      });
}); //second arg is function to run usually for req/response I think

app.get('/about', (req, res) => {
  //  res.send('About Page');
  res.render('about.hbs', {
      pageTitle: 'About Page',
  }); //res.render will let you render any template 
});

app.get('/projects', (req, res) => {
    //  res.send('About Page');
    res.render('projects.hbs', {
        pageTitle: 'My Projects',
    }); //res.render will let you render any template 
  });


app.get('/home', (req, res) => {
    //  res.send('About Page');
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        paragraph: 'This is a welcome message for the home page.'
    }); //res.render will let you render any template 
  });

app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'Unable to fulfill this request'
    });
});


//create a route at /bad will simulate when request fails
//res.send send back json with errorMessage property. Unable to fulfill this request.


app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});   //binds app to port
//changed to work with heroku

//create new template
//replace res send 
//home.hps 
//welcome message


//add projects page
//render handlebars template
// /projects
// make view file header footer render message
//partials header - add new projects page link
//