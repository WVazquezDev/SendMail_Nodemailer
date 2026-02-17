import Router from "express";
import { sendMail } from "../controllers/mailsController.js";
import { TO_WV } from "../utils/constants.js";

const router = Router();

router.get("/", (req, res) => res.send("Hello World!"));

router.post("/sendMailWV", (req, res) => {
  sendMail(req, res, TO_WV);
});
router.post("/sendMailMV", (req, res) => {
  sendMail(req, res, TO_MV);
});

export default router;
