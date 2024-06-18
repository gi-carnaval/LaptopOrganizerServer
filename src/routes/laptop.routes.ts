import { laptopController } from "../controllers/laptop.controller";

export async function laptopRoutes(fastify, options) {
    fastify.get('/cart/:cartId/laptops', laptopController.getAllLaptopsFromSpecificCart)
    fastify.post('/laptop', laptopController.saveLaptop)
}
