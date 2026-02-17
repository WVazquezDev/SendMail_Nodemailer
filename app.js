import express from "express";
import cors from "cors";
import send from "./src/routes/send.js";

const app = express();
const port = 3000;

app.use(cors({ origin: true }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.sendStatus(200);
});

app.use("/mail", send);

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
