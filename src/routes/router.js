const express = require('express');
const Prisma = require('prisma/prisma-client');
const prisma = new Prisma.PrismaClient();

const router = express.Router();

router.use(express.urlencoded({ extended: false }));

router.get('/', (req, res) => {
    res.render('../src/views/index.ejs');
});

router.get('/getAllBooks', async (req, res) => {
    try {
        const books = await prisma.book.findMany();
        res.json(books);
    }
    catch (err) {
        console.log(err);
    }
});

router.get('/addABook', (req, res) => {
    res.render('../src/views/addABook.ejs');
});

router.post('/addABook', async (req, res) => {
    try {
        const book = await prisma.book.findFirst({
            where: {
                title: req.body.title,
                authors: req.body.author,
            }
        });
        if (book) {
            res.json(`Book has already been added: \n${book}\n`);
        }
        else {
            const previousCount = await prisma.book.count();
            const addedBook = await prisma.book.create({
                data: {
                    title: req.body.title,
                    authors: req.body.authors,
                }
            });
            const currentCount = await prisma.book.count();
            res.json(`Previous count of the books in the database: ${previousCount}\nCurrent count of the books in the database: ${currentCount}\nNewly added book: \n${addedBook}\n`);
        }
    }
    catch (err) {
        console.log(err);
    }
});


module.exports = {
    router
}