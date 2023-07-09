import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
// import { InvoiceNumber } from "invoice-number";
export const encriptString = async (password) => {
  let hash = await bcrypt.hashSync(password, 10);
  return hash;
};
export const comparePassword = async (password, hash) => {
  let status = await bcrypt.compare(password, hash);
  return status;
};
export const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" });
};
// export const numberGenerator = async (count) => {
//   return InvoiceNumber.next(`IMM0${count}`);
// };

