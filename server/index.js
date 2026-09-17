import express from "express";
import cors from "cors";
import planRouter from "./routes/planRoutes.js";
import authRouter from "./routes/authRoutes.js";
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/plans", planRouter);
app.use("/api/auth", authRouter);
if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}

export default app;
