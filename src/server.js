// if (process.env.NODE_ENV !== 'production')
require('dotenv').config();
const express = require('express');
const { router } = require('./routes/router');
const { loadBooks } = require('./dataLoader/dataLoader');
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
        await prisma.$connect();
        console.log("Connected to the database.");
        const count = await prisma.Book.count();
        if (count < 10 || count === undefined) {
            loadBooks();
        }
        else {
            console.log("Books already loaded.")
        }
    }
    catch (err) {
        console.log(err);
        prisma.$disconnect();
    }
};

startServer();