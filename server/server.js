import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());


app.use(
  "/uploads",
  express.static(
    path.join(process.cwd(), "uploads")
  )
);
app.get("/", (req, res) => {
  res.send("API Running...");
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");

    app.listen(process.env.PORT, () => {
      console.log(`Server running on ${process.env.PORT}`);
    });
  })
  .catch((err) => console.log(err));

import userRoute from "./routes/User.route.js";
import ticketRoutes from "./routes/Ticket.route.js";

app.use("/api/auth", userRoute);

app.use("/api/tickets", ticketRoutes);
