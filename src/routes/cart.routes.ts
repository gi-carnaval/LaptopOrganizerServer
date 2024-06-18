import { cartController } from "../controllers/cart.controller";

async function cartRoutes(fastify, options) {
    fastify.get('/carts', cartController.getCarts)
    fastify.post('/cart', cartController.saveCart)
}

export {cartRoutes}