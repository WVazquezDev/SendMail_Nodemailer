import dotenv from "dotenv";
dotenv.config();

export const {
  TO_WV,
  NODEMAILER_USER,
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  GOOGLE_REFRESH_TOKEN,
  GOOGLE_ACCESS_TOKEN,
} = process.env;
