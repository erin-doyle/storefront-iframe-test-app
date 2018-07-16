const express = require('express');
const app = express();

// set the port of our application
// process.env.PORT lets the port be set by Heroku
const port = process.env.PORT || 8080;

const STOREFRONT_URLS = {
    dev: 'localhost:3000/store',
    qa: 'qa.cashstar.com/store',
    semi: 'semi.cashstar.com/store'
};

// set the view engine to ejs
app.set('view engine', 'ejs');

// make express look in the public directory for assets (css/js/img)
app.use(express.static(__dirname + '/public'));


const constructUrl = (env, brand = 'modport') => {
    if (env === 'dev') {
        return `http://${STOREFRONT_URLS.dev}`;
    }

    return `https://${brand}.${STOREFRONT_URLS[env]}`;
};


// set the routes
app.get('/', function(req, res) {

    // ejs render automatically looks in the views folder
    res.render('index', {
        iframeSrc: constructUrl('dev', 'modport')
    });
});

app.get('/:env', function(req, res) {
    res.render('index', {
        iframeSrc: constructUrl(req.params.env.toLowerCase())
    });
});

app.get('/:env/:brand', function(req, res) {
    res.render('index', {
        iframeSrc: constructUrl(req.params.env.toLowerCase(), req.params.brand.toLowerCase())
    });
});


app.listen(port, function() {
    console.log('Our app is running on http://localhost:' + port);
});
