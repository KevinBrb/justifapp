require('dotenv').config();
const express = require('express');
const router = require('./router');
const expressSwagger = require('express-swagger-generator');

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.text());

app.use('/api', router);

const generator = expressSwagger(app);

let options = {
    swaggerDefinition: {
        info: {
            description: 'Text Justificatior',
            title: 'JustifApp',
            version: '1.0.0',
        },
        host: `http://35.181.53.188:${process.env.PORT}`,
        basePath: '/api',
        produces: [
            "application/json"
        ],
        schemes: ['http'],
        securityDefinitions: {}
    },
    basedir: __dirname, //app absolute path
    files: ['./router.js'] //Path to the API handle folder
};
generator(options);

let launcher = app;

app.launch = () => {
    launcher.listen(process.env.PORT, () => {
        console.log(`${process.env.NODE_ENV} MODE - server started on port ${process.env.PORT}`);
    });
};

module.exports = app;