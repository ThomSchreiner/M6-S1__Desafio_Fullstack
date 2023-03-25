import "express-async-errors";
import express from "express";
import { clientRoutes } from "./routes/client.routes";
import { handdleError } from "./errors";
import { loginRoutes } from "./routes/login.routes";

export const app = express();
app.use(express.json());

app.use("/login", loginRoutes);
app.use("/clients", clientRoutes);

app.use(handdleError);
