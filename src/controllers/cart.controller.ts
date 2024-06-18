import { FastifyReply, FastifyRequest } from "fastify"
import { SaveCart } from "../resource/cart.resource"
import { cartServices } from "../services/cart.services"

function generateSlug(cartName: string): string {
    const slug = cartName.replace(/[^\w\s]/gi, '')
    return slug.replace(/\s+/g, '_').toLowerCase()
}

async function saveCart(request: FastifyRequest<{ Body: SaveCart}>, reply: FastifyReply) {
    const { name } = request.body
    const slug = generateSlug(name)
    try {
        const cart = await cartServices.create(name, slug)
        reply.status(200).send(cart)
    } catch (err) {
        reply.status(500).send({ error: 'Erro ao buscar notebooks do carrinho'})
    }
}

async function getCarts(request: FastifyRequest, reply: FastifyReply) {
    const result = await cartServices.getCarts()
    reply.status(200).send(result)
}

export const cartController = {
    saveCart,
    getCarts
}