import express from "express";
import passport from "passport";
import { env } from "./confiq/env.js";

import { corsMiddleware } from "./middlewares/cors.js";
import { sessionMiddleware } from "./middlewares/session.js";

import authRoutes from "./routes/Auto/auth.js";
import userRoutes from "./routes/Auto/user.js";
import adminRoutes from "./routes/Auto/admin.js";
import vehicleRoutes from "./routes/Auto/vehicle.js";
import "./middlewares/auth.js"; 

const app = express();


app.use(corsMiddleware);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(sessionMiddleware);


app.use(passport.initialize());
app.use(passport.session());


app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/vehicle", vehicleRoutes);

app.listen(env.PORT, () => {
  console.log(`Server running on http://localhost:${env.PORT}`);
});
