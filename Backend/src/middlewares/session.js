import session from "express-session";

export const sessionMiddleware = session({
  secret: process.env.SESSION_SECRET || "yourSecretKey",
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: process.env.NODE_ENV === "production", 
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 3, // 3 hours
    sameSite: "lax",
    
  },
});
