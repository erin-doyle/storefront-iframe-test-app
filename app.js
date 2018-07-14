const express = require('express');
const app = express();

// set the port of our application
// process.env.PORT lets the port be set by Heroku
const port = process.env.PORT || 8080;

const STOREFRONT_URLS = {
    DEV: 'http://localhost:3000/store',
    QA: 'https://modport.qa.cashstar.com/store',
    SEMI: 'https://modport.semi.cashstar.com/store'
};

// set the view engine to ejs
app.set('view engine', 'ejs');

// make express look in the public directory for assets (css/js/img)
app.use(express.static(__dirname + '/public'));

// set the home page route
app.get('/', function(req, res) {

    // ejs render automatically looks in the views folder
    res.render('index', {
        iframeSrc: STOREFRONT_URLS.DEV
    });
});

app.get('/dev', function(req, res) {
    res.render('index', {
        iframeSrc: STOREFRONT_URLS.DEV
    });
});

app.get('/qa', function(req, res) {
    res.render('index', {
        iframeSrc: STOREFRONT_URLS.QA
    });
});

app.get('/semi', function(req, res) {
    res.render('index', {
        iframeSrc: STOREFRONT_URLS.SEMI
    });
});

app.listen(port, function() {
    console.log('Our app is running on http://localhost:' + port);
});
