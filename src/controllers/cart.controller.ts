import { FastifyReply, FastifyRequest } from "fastify"
import { SaveCart } from "../resource/cart.resource"
import { cartServices } from "../services/cart.services"
import { HttpStatus } from "../common/httpStatus"
import { createErrorResponse } from "../common/error.resource"

function generateSlug(cartName: string): string {
    const slug = cartName.replace(/[^\w\s]/gi, '')
    return slug.replace(/\s+/g, '_').toLowerCase()
}

async function saveCart(request: FastifyRequest<{ Body: SaveCart }>, reply: FastifyReply) {
    const { name } = request.body
    const slug = generateSlug(name)

    const cart = await cartServices.create(name, slug)

    if(cart.isError()) {
        console.error(`Erro ao salvar carrinho ${cart.error}`)
        return reply.status(HttpStatus.CONFLICT).send(createErrorResponse(`${cart.error}`))
    }
    reply.status(200).send(cart)
}

async function getCarts(request: FastifyRequest, reply: FastifyReply) {
    const result = await cartServices.getCarts()
    reply.status(200).send(result)
}

export const cartController = {
    saveCart,
    getCarts
}