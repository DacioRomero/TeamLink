// app.js
// DEPENDENCIES
const express = require('express');
const exphbs = require('express-handlebars');
const methodOverride = require('method-override')
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

require('dotenv').config({ path: path.join(__dirname, '.env') });

// MIDDLEWARE
const app = express();

app.engine('hbs', exphbs({
    extname: '.hbs',
    layoutsDir: path.join(__dirname, '/views/layouts/'),
    partialsDir: path.join(__dirname, '/views/partials/'),
    defaultLayout: 'main',
    helpers: require('handlebars-helpers')()
}));

app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'hbs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, '/public')));

// DATABASE
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/teamlink', { useNewUrlParser: true });

// ROUTES
app.use(require('./controllers/teams'));
app.use(require('./controllers/players'));
app.use(require('./controllers/comments'));
app.use(require('./controllers/index'));
app.use(require('./controllers/api/master'));

// LISTENER
if (require.main === module) {
    const port = process.env.PORT || 3000;

    app.listen(port, () => {
        console.log(`App listening on port ${port}!`);
    });
}

module.exports = app;
