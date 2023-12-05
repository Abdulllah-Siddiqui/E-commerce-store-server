/* eslint-disable no-unused-vars */
import passport from "passport";
import { Strategy } from "passport-local";

import { comparePassword } from '../../utils/helpers';
import User from '../../models/user';

passport.use(
  new Strategy(
    {
      usernameField: "email",
    },
    async (email, password, done) => {
      console.log(email);
      console.log(password);
      if (!email || !password) {
        throw new Error('Missing Credentials');
      }
      try {
        const userDB = await User.findOne({ email });
        if (!userDB) throw new Error('User not found');

        const isValid = comparePassword(password, userDB.password);
        if (isValid) {
          console.log('Authenticated successfully');
          done(null, userDB);
        } else {
          console.log('Invalid Authentication');
          done(null, null);
        }
      } catch (err) {
        console.log(err);
        done(err, null);
      }
    })
);