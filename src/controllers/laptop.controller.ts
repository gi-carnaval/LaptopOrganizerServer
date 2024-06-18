import { FastifyReply, FastifyRequest } from "fastify";
import { laptopRepository } from "../models/prismaClient";
import { laptopServices } from "../services/laptop.services.js";
import { GetLaptopsByCartIdParams } from "../resource/laptop.resource";

async function getAllLaptopsFromSpecificCart(request: FastifyRequest<{ Params: GetLaptopsByCartIdParams}>, reply: FastifyReply) {
    const { cartId } = request.params
    try {
        const laptops = await laptopServices.getLaptopsFromCart(cartId)
        reply.status(200).send(laptops)
    } catch (err) {
        reply.status(500).send({ error: 'Erro ao buscar notebooks do carrinho'})
    }
}

async function saveLaptop(request, reply) {
    try {
        const {laptopCode, cartId} = request.body;
        const laptop = await laptopRepository.create({
            data: {
                laptopCode, cartId
            }
        })
        reply.send(laptop)
    } catch (err) {
        reply.status(500).send({error: `Erro ao criar notebook. Error: ${err}`})
    }
}

export const laptopController = {
    getAllLaptopsFromSpecificCart,
    saveLaptop
}
