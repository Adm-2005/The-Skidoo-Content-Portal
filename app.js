require('dotenv').config();
const express = require('express');
const path = require('node:path');

const uploadDataRoute = require('./routes/uploadData.js');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.render('index');
});

app.use('/', uploadDataRoute);

app.use((err, req, res, next) => {
    console.log(`Error: ${err}.`);
    res.status(500).send();
})

const PORT = process.env.PORT || 1000;

app.listen(PORT, () => `App running on port ${PORT}.`);