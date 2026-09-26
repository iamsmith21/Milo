import express from "express";
import cors from "cors";
import { createServer } from "http";
import { Server } from "socket.io";

import planRouter from "./routes/planRoutes.js";
import authRouter from "./routes/authRoutes.js";
import userRouter from "./routes/userRoutes.js";
import prisma from "./config/db.js";

const app = express();
const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`A user connected with Socket ID : ${socket.id}`);

  socket.on("join-room", (planId) => {
    const room = String(planId);
    socket.join(room);
    console.log(`User ${socket.id} joined room ${room}`);
  });

  socket.on("send-message", async (data) => {
    try {
      const savedMessage = await prisma.message.create({
        data: {
          text: data.text,
          planId: parseInt(data.planId),
          userId: parseInt(data.userId),
        },
        include: { user: true },
      });

      io.to(data.planId.toString()).emit("receive-message", savedMessage);
    } catch (error) {
      console.error("Failed to save message: ", error);
    }
  });

  socket.on("disconnect", () => {
    console.log(`User Disconnected: ${socket.id}`);
  });
});

const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/plans", planRouter);
app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
if (process.env.NODE_ENV !== "test") {
  httpServer.listen(PORT, "0.0.0.0", () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}

export default app;
