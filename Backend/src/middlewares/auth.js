import passport from "passport";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { db } from "../confiq/db.js";
import { users } from "../models/Auto/users.js";
import { env } from "../confiq/env.js";


const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: env.JWT_SECRET || "supersecretkey",
};

passport.use(
  new JwtStrategy(jwtOptions, async (payload, done) => {
    try {
      const [user] = await db.select().from(users).where(users.id.eq(payload.id));
      if (!user) return done(null, false);
      return done(null, user);
    } catch (err) {
      return done(err, false);
    }
  })
);


export const generateToken = (user) => {
  return jwt.sign(
    { id: user.id, role: user.role, email: user.email },
    env.JWT_SECRET || "supersecretkey",
    { expiresIn: "1h" }
  );
};


export const isAuthenticated = passport.authenticate("jwt", { session: false });


export const authorizeRole = (role) => (req, res, next) => {
  if (!req.user) return res.status(401).json({ message: "Unauthorized" });
  if (req.user.role !== role) return res.status(403).json({ message: "Forbidden" });
  next();
};

export default passport;
