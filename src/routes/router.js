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
        const book = await prisma.book.create({
            data: {
                title: req.body.title,
                author: req.body.author,
            }
        });
        res.json(book);

    }
    catch (err) {
        console.log(err);
    }
});


module.exports = router;