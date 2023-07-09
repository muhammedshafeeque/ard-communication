import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import codeGen from "otp-generator";
// import { InvoiceNumber } from "invoice-number";
export const encriptString = async (password) => {
  console.log(password);
  const salt = await bcrypt.genSalt();
  let hash = await bcrypt.hash(password, salt);
  return hash;
};
export const comparePassword = async (password, hash) => {
  let status = await bcrypt.compare(password, hash);
  return status;
};
export const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" });
};
export const numberGenerator = async (count, string) => {
  return codeGen.generate(count, {
    upperCaseAlphabets: string,
    specialChars: string,
  });
};
