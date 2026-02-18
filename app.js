import express from "express";
import helmet from "helmet";
import cors from "cors";
import send from "./src/routes/send.js";
import morgan from "morgan";
import { NODE_ENV } from "./src/utils/constants.js";

const app = express();
const port = 3000;

app.use(helmet())
app.use(morgan('dev'))

const allowedOrigins = [];

const corsOptions =
  NODE_ENV === 'production'
    ? {
        origin: allowedOrigins,
        credentials: true
      }
    : {
        origin: true,
        credentials: true
      };

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.sendStatus(200);
});

app.use("/mail", send);

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
