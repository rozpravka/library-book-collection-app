const express = require('express');
const session = require('express-session');
const passport = require('passport');
const Prisma = require('prisma/prisma-client');
const prisma = new Prisma.PrismaClient();
require('../auth.js')
const { isLoggedIn } = require('../auth.js');
require('dotenv').config();

const router = express.Router();

router.use(express.urlencoded({ extended: false }));
router.use(session({ secret: process.env.SESSION_SECRET }));
router.use(passport.initialize( process.env.SESSION_SECRET ));
router.use(passport.session({
    secret: 'your-secret-key-here',
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: false,
        maxAge: 1000000000,
    }
}));

router.get('/login', (req, res) => {
    res.render('../src/views/login.ejs');
});

router.get('/login/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/oauth2/redirect/google',
  passport.authenticate('google', { 
    failureRedirect: '/login',
    successRedirect: '/',
}));

router.get('/', isLoggedIn, async (req, res) => {
    res.render('../src/views/index.ejs');
    const user = await prisma.user.findFirst({where: {email: req.user.email}});
    if (!user) {
        await prisma.user.create({
            data: {
                email: req.user.email,
                name: req.user.displayName,
            }
        });
        console.log(`The user ${req.user.displayName} with the email ${req.user.email} has been added to the database.`);
    }
    else {
        const loggedUser = await prisma.user.findUnique({where: {email: req.user.email}});
        console.log(`The user ${req.user.displayName} with the email ${req.user.email} has already been added to the database. (Added on ${loggedUser.createdAt}.)`);
    }
});

router.get('/getAllBooks', isLoggedIn, async (req, res) => {
    try {
        const books = await prisma.book.findMany();
        res.json(books);
    }
    catch (err) {
        console.log(err);
    }
});

router.get('/addABook', isLoggedIn, (req, res) => {
    res.render('../src/views/addABook.ejs');
});

router.post('/logout', (req, res) => {
    req.logout((error) => {
      if (error) return res.status(500).send('Error occurred during logout');
      res.redirect('/login');
    });
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
            res.json(`The book called ${book.title} by ${book.authors} has already been added to the database.`);
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
            res.json(`Previous count of the books in the database: ${previousCount}. Current count of the books in the database: ${currentCount}. Newly added book: ${addedBook.title} by ${addedBook.authors}.`);
        }
    }
    catch (err) {
        console.log(err);
    }
});

router.post('/addABookToFav', async (req, res) => {
    try {
        const book = await prisma.book.findFirst({
            where: {
                title: req.body.title,
                authors: req.body.author,
            }
        })
        if (book) ;






module.exports = {
    router
}