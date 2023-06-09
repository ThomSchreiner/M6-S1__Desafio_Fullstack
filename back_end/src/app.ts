import "express-async-errors";
import express from "express";
import { clientRoutes } from "./routes/client.routes";
import { handdleError } from "./errors";
import { loginRoutes } from "./routes/login.routes";
import { contactRoutes } from "./routes/contact.routes";
import cors from "cors";

export const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://contact-list-one-kappa.vercel.app",
    ],
  })
);
app.use(express.json());

app.use("/login", loginRoutes);
app.use("/clients", clientRoutes);
app.use("/contacts", contactRoutes);

app.use(handdleError);
