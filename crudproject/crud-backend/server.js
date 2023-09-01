import express from "express";
import connectDB from "./config/database.js";

import userRoutes from "./routes/user.routes.js";

const app = express();
const port = 5000;

connectDB();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api/v1", userRoutes);

app.listen(port, () => {
  console.log(`Server is up and running on @${port}`);
});
