"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.laptopServices = void 0;
const result_1 = require("../common/result");
const prismaClient_1 = require("../models/prismaClient");
const cart_services_1 = require("./cart.services");
function getLaptopsFromCart(cartSlug) {
    return __awaiter(this, void 0, void 0, function* () {
        const cart = yield cart_services_1.cartServices.getCartBySlug(cartSlug);
        if (!cart) {
            return "Carrinho não encontrado";
        }
        const laptops = yield prismaClient_1.laptopRepository.findMany({
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
        });
        return laptops;
    });
}
function laptopExists(laptopCode) {
    return __awaiter(this, void 0, void 0, function* () {
        const laptop = yield prismaClient_1.laptopRepository.findUnique({
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
        });
        return laptop;
    });
}
function saveLaptop(laptopCode, cartSlug) {
    return __awaiter(this, void 0, void 0, function* () {
        const laptopAlreadySaved = yield laptopExists(laptopCode);
        const cartId = yield cart_services_1.cartServices.getCartIdBySlug(cartSlug);
        if (!cartId) {
            return (0, result_1.createResult)(null, "Carrinho não encontrado");
        }
        if (laptopAlreadySaved) {
            return (0, result_1.createResult)(null, `Notebook ${laptopCode} já registrado no ${laptopAlreadySaved.cart.name}`);
        }
        const laptop = yield prismaClient_1.laptopRepository.create({
            data: {
                laptopCode: laptopCode,
                cartId: cartId
            }
        });
        return (0, result_1.createResult)(laptop, null);
    });
}
function updateLaptopCart(laptopCode, newCartSlug) {
    return __awaiter(this, void 0, void 0, function* () {
        const cartId = yield cart_services_1.cartServices.getCartIdBySlug(newCartSlug);
        const laptop = yield prismaClient_1.laptopRepository.update({
            data: {
                cartId: cartId
            },
            where: {
                laptopCode: laptopCode
            }
        });
        return (0, result_1.createResult)(laptop, null);
    });
}
exports.laptopServices = {
    getLaptopsFromCart,
    laptopExists,
    saveLaptop,
    updateLaptopCart
};
