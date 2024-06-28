import bcrypt from "bcrypt";
import { createResult } from "./result";
import { createErrorResponse } from "./error.resource";

export async function verifyAdminPassword(password: string) {
  const adminPassword = process.env.ADMIN_PASSWORD

  if (!adminPassword) {
    console.log("Não tem senha de admin")
    return createResult(null, "Senha admin não definida")
  }
  const hashedPassword = bcrypt.hashSync(adminPassword, 10);
  const permited = await checkUser(password, hashedPassword)

  if(!permited) {
    return createResult(null, createErrorResponse(`Usuário não permitido`))
  }

  return createResult(hashedPassword, null)

}
async function checkUser(password: string, hash: string) {
  const match = await bcrypt.compare(password, hash);

  if (match) {
    return true
  }
}  