import { FastifyReply, FastifyRequest } from "fastify";
import { laptopServices } from "../services/laptop.services.js";
import { DeleteLaptop, GetCartNameByLaptopCodeParam, GetLaptopsByCartIdParams, SaveLaptopInCartBody, UpdateLaptopCartBody } from "../resource/laptop.resource";
import { createErrorResponse } from "../common/error.resource.js";
import { HttpStatus } from "../common/httpStatus.js";
import { authController } from "./auth.controller.js";

async function getAllLaptopsFromSpecificCart(request: FastifyRequest<{ Params: GetLaptopsByCartIdParams }>, reply: FastifyReply) {
    const { cartSlug } = request.params

    const laptops = await laptopServices.getLaptopsFromCart(cartSlug)

    if (laptops.isError()) {
        console.error(`Erro ao buscar notebooks no carrinho. Erro: ${laptops.error}`)
        return reply.status(HttpStatus.NOT_FOUND).send(createErrorResponse(`${laptops.error}`))
    }
    reply.status(200).send(laptops)
}
async function getCartNameByLaptopCode(request: FastifyRequest<{ Params: GetCartNameByLaptopCodeParam }>, reply: FastifyReply) {
    const { laptopCode } = request.params

    const laptop = await laptopServices.laptopExists(parseInt(laptopCode))

    if (!laptop) {
        return reply
            .status(HttpStatus.NOT_FOUND)
            .send(createErrorResponse("Notebook não encontrado"))
    }
    reply.status(HttpStatus.OK).send(laptop)
}

async function saveLaptop(request: FastifyRequest<{ Body: SaveLaptopInCartBody }>, reply: FastifyReply) {
    const { laptopCode, cartSlug, password } = request.body;
    const hasAccess = authController.checkUser(password)
    
    
    if (!hasAccess) {
        return reply.status(HttpStatus.UNAUTHORIZED).send(createErrorResponse(`Senha Incorreta`))
    }
    
    const laptop = await laptopServices.saveLaptop(laptopCode, cartSlug)

    if (laptop.isError()) {
        console.error(`Erro ao tentar salvar notebook ${laptop.error}`)
        return reply.status(HttpStatus.CONFLICT).send(createErrorResponse(`${laptop.error}`))
    }

    reply.status(HttpStatus.OK).send(laptop)
}

async function updateLaptopCart(request: FastifyRequest<{ Body: UpdateLaptopCartBody }>, reply: FastifyReply) {
    const { laptopCode, newCartSlug } = request.body

    const laptop = await laptopServices.updateLaptopCart(laptopCode, newCartSlug)
    return reply.status(HttpStatus.OK).send(laptop)

}

async function deleteLaptopCart(request: FastifyRequest<{ Body: DeleteLaptop }>, reply: FastifyReply) {
    const { laptopCode, password } = request.body

    const hasAccess = authController.checkUser(password)

    if (!hasAccess) {
        return reply.status(HttpStatus.UNAUTHORIZED).send(createErrorResponse(`Senha Incorreta`))
    }

    const laptop = await laptopServices.laptopExists(laptopCode)

    if (!laptop) {
        return reply
            .status(HttpStatus.NOT_FOUND)
            .send(createErrorResponse("Notebook não encontrado"))
    }

    const deletedLaptop = await laptopServices.deleteLaptop(laptopCode)

    if (deletedLaptop.isError()) {
        return reply.status(HttpStatus.NOT_FOUND).send(createErrorResponse(`${deletedLaptop.error}`))
    }
    return reply.status(HttpStatus.OK).send(laptop)
}

export const laptopController = {
    getAllLaptopsFromSpecificCart,
    getCartNameByLaptopCode,
    saveLaptop,
    updateLaptopCart,
    deleteLaptopCart
}
