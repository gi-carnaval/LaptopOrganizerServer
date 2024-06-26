import { cartRepository } from "../models/prismaClient"

async function create(cartName, slug) {
    const existCart = await cartRepository.findFirst({
        where: {
            slug: slug
        }
    })

    if(existCart) {
        return `${existCart.name} já criado`
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
    const carts = await cartRepository.findMany({
        include: {
            _count: {
                select: {
                    laptops: true
                }
            }
        }
    })
    return carts
}

async function getCartBySlug(slug: string): Promise<boolean> {
    const cart = await cartRepository.findFirst({
        where: {
            slug: slug
        }
    })
    return cart !== null
}

async function getCartIdBySlug(slug: string){
    const cartId = await cartRepository.findFirst({
        where: {
            slug: slug
        },
        select: {
            id: true
        }
    })

    return cartId?.id
}

export const cartServices = {
    create,
    getCarts,
    getCartBySlug,
    getCartIdBySlug
}