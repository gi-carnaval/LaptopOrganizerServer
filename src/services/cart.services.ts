import { cartRepository } from "../models/prismaClient"

async function create(cartName, slug) {
    const existCart = await cartRepository.findFirst({
        where: {
            name: cartName,
        }
    })

    if(existCart) {
        return "Carrinho já criado"
    }

    const cart = await cartRepository.create({
        data: {
            name: cartName,
            slug: slug
        }
    })

    return cart
}

async function getCarts() {
    const carts = await cartRepository.findMany()
    return carts
}
export const cartServices = {
    create,
    getCarts
}