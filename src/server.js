// if (process.env.NODE_ENV !== 'production')
require('dotenv').config();
const express = require('express');
const router = require('./routes/router');

const PORT = 3000 || process.env.PORT;
const app = express();

app.set('view engine', 'ejs');
app.use('/', router);

async function startServer() {
    try {
        app.listen(PORT, () => {
            console.log(`Server listening on port ${PORT}.`);
        });
    }
    catch (err) {
        console.log(err);
    }
};

startServer();