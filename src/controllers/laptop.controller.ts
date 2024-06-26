import { FastifyReply, FastifyRequest } from "fastify";
import { laptopServices } from "../services/laptop.services.js";
import { GetCartNameByLaptopCodeParam, GetLaptopsByCartIdParams, SaveLaptopInCartBody, UpdateLaptopCartBody } from "../resource/laptop.resource";
import { createErrorResponse } from "../common/error.resource.js";
import { HttpStatus } from "../common/httpStatus.js";

async function getAllLaptopsFromSpecificCart(request: FastifyRequest<{ Params: GetLaptopsByCartIdParams }>, reply: FastifyReply) {
    const { cartSlug } = request.params

    try {
        const laptops = await laptopServices.getLaptopsFromCart(cartSlug)
        reply.status(200).send(laptops)
    } catch (err) {
        reply.status(500).send({ error: 'Erro ao buscar notebooks do carrinho' })
    }
}
async function getCartNameByLaptopCode(request: FastifyRequest<{ Params: GetCartNameByLaptopCodeParam }>, reply: FastifyReply) {
    const { laptopCode } = request.params

    const laptop = await laptopServices.laptopExists(parseInt(laptopCode))

    if(!laptop) {
        return reply
        .status(HttpStatus.NOT_FOUND)
        .send(createErrorResponse("Notebook não encontrado"))
    }
    reply.status(HttpStatus.OK).send(laptop)
}

async function saveLaptop(request: FastifyRequest<{ Body: SaveLaptopInCartBody }>, reply: FastifyReply) {
    const { laptopCode, cartSlug } = request.body;
    console.log("LaptopCode here: ", laptopCode)
    const laptop = await laptopServices.saveLaptop(laptopCode, cartSlug)

    if (laptop.isError()) {
        console.error(`Erro ao tentar salvar notebook ${laptop.error}`)
        return reply.status(HttpStatus.CONFLICT).send(createErrorResponse(`${laptop.error}`))
    }

    reply.status(HttpStatus.OK).send(laptop)
}

async function updateLaptopCart(request: FastifyRequest<{ Body: UpdateLaptopCartBody }>, reply: FastifyReply){
    const { laptopCode, newCartSlug } = request.body

    const laptop = await laptopServices.updateLaptopCart(laptopCode, newCartSlug)
    return reply.status(HttpStatus.OK).send(laptop)

}

export const laptopController = {
    getAllLaptopsFromSpecificCart,
    getCartNameByLaptopCode,
    saveLaptop,
    updateLaptopCart
}
