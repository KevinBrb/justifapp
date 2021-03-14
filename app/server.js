require('dotenv').config();
const express = require('express');
const router = require('./router');

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.text());

app.use('/api', router);

let launcher = app;

app.launch = () => {
    launcher.listen(process.env.PORT, () => {
        console.log(`${process.env.NODE_ENV} MODE - server started on port ${process.env.PORT}`);
    });
};

module.exports = app;