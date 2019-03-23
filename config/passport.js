const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const {secretKey} = require('./keys');
const {User} = require('../models/User');


var opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = secretKey;

exports.isLogin = passport => {
    passport.use('login-rule', new JwtStrategy(opts, (jwt_payload, done) => {
        User.findById(jwt_payload.id)
            .then(user => {
                if (user) {
                    return done(null, user);
                } else {
                    return done(null, false);
                }
            })
            .catch(err => console.log(err))

    }))
}
exports.isAdmin = passport => {
    passport.use('admin-rule', new JwtStrategy(opts, (jwt_payload, done) => {
        User.findById(jwt_payload.id)
            .then(user => {
                if (user.isAdmin) {
                    return done(null, user);
                } else {
                    return done(null, false);
                }
            })
            .catch(err => console.log(err))

    }))
}