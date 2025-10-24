import cors from "cors";

const allowedOrigins = [
  "http://localhost:5173",
  "http://insurancerater.ca",
  "https://insurancerater.ca",
  "https://www.insurancerater.ca",
  "https://app.insurancerater.ca",
];

export const corsMiddleware = cors({
  origin: function (origin, callback) {
    if (process.env.NODE_ENV !== "production") {
      console.log("CORS Origin:", origin);
    }
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
});
