import { createResult } from "../common/result"
import { laptopRepository } from "../models/prismaClient"
import { cartServices } from "./cart.services"

async function getLaptopsFromCart(cartSlug: string) {
    const cart = await cartServices.getCartBySlug(cartSlug)
    if (!cart) {
        return createResult(null, `Carrinho não encontrado`);
    }

    const laptops = await laptopRepository.findMany({
        include: {
            cart: {
                select: {
                    name: true
                }
            }
        }, 
        where: {
            cart: {
                slug: cartSlug
            }
        }
    })
    return createResult(laptops, null);
}

async function laptopExists(laptopCode: number) {
    const laptop = await laptopRepository.findUnique({
        select: {
            laptopCode: true,
            cart: {
                select: {
                    name: true,
                }
            }
        },
        where: {
            laptopCode: laptopCode
        }
    })

    return laptop
}

async function saveLaptop(laptopCode: number, cartSlug: string) {
    const laptopAlreadySaved = await laptopExists(laptopCode)
    const cartId = await cartServices.getCartIdBySlug(cartSlug)

    if (!cartId) {
        return createResult(null, "Carrinho não encontrado")
    }

    if (laptopAlreadySaved) {
        return createResult(null, `Notebook ${laptopCode} já registrado no ${laptopAlreadySaved.cart.name}`);
    }

    const laptop = await laptopRepository.create({
        data: {
            laptopCode: laptopCode,
            cartId: cartId
        }
    })

    return createResult(laptop, null)
}

async function updateLaptopCart(laptopCode: number, newCartSlug: string) {

    const cartId = await cartServices.getCartIdBySlug(newCartSlug)

    const laptop = await laptopRepository.update({
        data: {
            cartId: cartId
        },
        where: {
            laptopCode: laptopCode
        }
    })
    return createResult(laptop, null)
}

async function deleteLaptop(laptopCode: number) {
    await laptopRepository.delete({
        where: {
            laptopCode: laptopCode
        }
    })

    return createResult(null, null)
}

export const laptopServices = {
    getLaptopsFromCart,
    laptopExists,
    saveLaptop,
    updateLaptopCart,
    deleteLaptop
}