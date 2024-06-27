import { FastifyInstance } from "fastify";
import { laptopController } from "../controllers/laptop.controller";

async function laptopRoutes(fastify: FastifyInstance) {
    fastify.get('/cart/:cartSlug/laptops', laptopController.getAllLaptopsFromSpecificCart)
    fastify.get('/laptop/:laptopCode', laptopController.getCartNameByLaptopCode)
    fastify.post('/laptop', laptopController.saveLaptop)
    fastify.put('/laptop', laptopController.updateLaptopCart)
    fastify.delete('/laptop', laptopController.deleteLaptopCart)
}

export { laptopRoutes }