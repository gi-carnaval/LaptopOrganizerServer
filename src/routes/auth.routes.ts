import { FastifyInstance } from "fastify";
import { authController } from "../controllers/auth.controller";

async function authRoutes(fastify: FastifyInstance) {
    fastify.put('/auth', authController.verifyIfAuthorizationWithPassword)
}

export { authRoutes }