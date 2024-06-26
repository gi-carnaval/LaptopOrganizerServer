import { FastifyInstance } from "fastify";
import { cartController } from "../controllers/cart.controller";

async function cartRoutes(fastify: FastifyInstance) {
    fastify.get('/carts', cartController.getCarts)
    fastify.post('/cart/', cartController.saveCart)
}

export {cartRoutes}