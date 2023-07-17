// if (process.env.NODE_ENV !== 'production')
require('dotenv').config();
const express = require('express');
const { router } = require('./routes/router');
const { loadBooks } = require('./routes/controller');
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const PORT = 3000 || process.env.PORT;
const app = express();

app.set('view engine', 'ejs');
app.use('/', router);

async function startServer() {
    try {
        app.listen(PORT, () => {
            console.log(`Server listening on port ${PORT}.`);
        });
        const count = await prisma.Book.count();
        if (count < 10) {
            loadBooks();
        }
        else {
            console.log("Books already loaded.")
        }
    }
    catch (err) {
        console.log(err);
    }
};

startServer();