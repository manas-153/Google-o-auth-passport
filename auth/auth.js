const passport =require('passport');
const GoogleStrategy = require( 'passport-google-oauth' ).OAuth2Strategy;
const user_schema = require('../database/schema');
const cors=require('cors');

// AIzaSyB3aWlVqEVSIsc-KwuSZyIZ9-xoDE5RlWU
require('dotenv').config();

passport.use(cors());


passport.use(new GoogleStrategy({
    clientID:     process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:4000/auth/google/callback",
    passReqToCallback   : true
  },

  function(request, accessToken, refreshToken, profile, done) {
    user_schema.findOne({ googleId: profile.id }).then((existingUser)=>
    {
          if(existingUser)
          {
            done(null, existingUser);
          }
          else{
            new user_schema({
              googleId: profile.id,
              displayName: profile.displayName,
              email: profile.emails[0].value,
              profileImage:profile._json.picture,
              accessToken:accessToken,
              refreshToken:refreshToken
            })
              .save()
              .then((user) => done(null, user));

          }
    })

  }
));

passport.serializeUser((user,done)=>
{
  done(null,user);
});

passport.deserializeUser((user,done)=>
{
  done(null,user);
});