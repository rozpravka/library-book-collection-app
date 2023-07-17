require('dotenv').config();
const passport = require('passport');
const GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;
const Prisma = require('prisma/prisma-client');
const prisma = new Prisma.PrismaClient();

function isLoggedIn(req, res, next) {
    if (req.user) {
        return next();
    }
    res.redirect('/login');
}

passport.use(new GoogleStrategy({
    clientID:     process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/oauth2/redirect/google",
    passReqToCallback   : true
  },
  function(request, accessToken, refreshToken, profile, done) {
    if(prisma.user.findFirst({where: {email: profile.email}})) {
        done(null, profile);
    }
    else {
        prisma.user.create({
            data: {
                email: profile.email,
                name: profile.name,
            }
        });
        done(null, profile);
    }
}));

passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(user, done) {
    done(null, user);
});

module.exports = {
    isLoggedIn,
}