const passport = require('passport');
const FacebookTokenStrategy = require('passport-facebook-token');

const config = require('../config/index');
const cookieExtractor = req => {
    let token = null;
    if (req && req.cookies) {
        token = req.cookies['access_token'];
    }
    return token;
}

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});
passport.use('facebookToken', new FacebookTokenStrategy({
    clientID: config.oauth.facebook.clientID,
    clientSecret: config.oauth.facebook.clientSecret,
}, async (accessToken, refreshToken, profile, done) => {
    try {
        // console.log("Profile",{profile})
        done(null, extractProfile(profile));
    } catch (error) {
        done(error, false, error.message);
    }
}));

function extractProfile(profile) {
    let imageUrl = '';
    if (profile.photos && profile.photos.length) {
        imageUrl = profile.photos[0].value;
    }
    return {
        id: profile.id,
        firstname: profile.name.givenName,
        lastname: profile.name.familyName,
        image: imageUrl,
        email: profile.emails[0].value,
        provider :   profile.provider
    };

}