import { laptopRepository } from "../models/prismaClient"
async function getLaptopsFromCart(cartId: string) {
    const laptops = await laptopRepository.findMany({
        where: {
            cartId: cartId
        },
        include: {
            cart: true
        }
    })
    return laptops
}

export const laptopServices = {
    getLaptopsFromCart
}