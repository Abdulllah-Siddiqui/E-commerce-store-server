import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import passport from "passport";

import User from '../../models/user';

const { SECRET_KEY } = process.env;

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: SECRET_KEY
};

passport.use(new JwtStrategy(opts, function (jwt_payload, done) {

  User.findOne({ email: jwt_payload.email }, function (err, user) {
    if (err) {
      return done(err, false);
    } if (user) {
      return done(null, user);
    } else {
      done(null, false);
    }
  });
}));

export default passport;
