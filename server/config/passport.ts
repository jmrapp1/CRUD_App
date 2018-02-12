import { ExtractJwt, Strategy } from 'passport-jwt';
import Config from './config';
import User from '../models/User';

export default function register(passport) {
    const opts = {
        secretOrKey: Config.secret,
        jwtFromRequest: ExtractJwt.fromAuthHeader()
    };
    passport.use(new Strategy(opts, function(payload, done) {
        User.findById(payload._id).exec((err, user) => {
            if (err) {
                return done(err, false);
            }
            if (user) {
                return done(null, user);
            }
            return done(null, false);
        });
    }));
};
