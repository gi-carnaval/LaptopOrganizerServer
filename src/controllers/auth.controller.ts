import { FastifyReply, FastifyRequest } from "fastify"
import { HttpStatus } from "../common/httpStatus"
import { VerifyAuthorizationWithPasswordBody } from "../resource/auth.resource"
import bcrypt from "bcrypt";
import { createErrorResponse } from "../common/error.resource"
import { createResult } from "../common/result"



async function verifyIfAuthorizationWithPassword(request: FastifyRequest<{ Body: VerifyAuthorizationWithPasswordBody }>, reply: FastifyReply) {
  const { password } = request.body
  try {
    const permitted = await checkUser(password)

    if (!permitted) {
      return reply.status(HttpStatus.UNAUTHORIZED).send(createErrorResponse("Usuário não autorizado"))
    }

    return reply.status(HttpStatus.OK).send(password)

  } catch (error) {
    console.error("Error during password verification:", error);
    return reply.status(HttpStatus.INTERNAL_SERVER_ERROR).send(createErrorResponse("Internal server error"));
  }
}

function checkUser(password: string): boolean {
  const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD
  try {
    console.log("password: ", password)
    console.log("ADMIN_PASSWORD: ", ADMIN_PASSWORD)
    return password === ADMIN_PASSWORD ? true : false
  } catch (error) {
    console.error("Error comparing passwords:", error);
    return false;
  }
}

export const authController = {
  verifyIfAuthorizationWithPassword,
  checkUser
}