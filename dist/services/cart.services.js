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
exports.cartServices = void 0;
const prismaClient_1 = require("../models/prismaClient");
function create(cartName, slug) {
    return __awaiter(this, void 0, void 0, function* () {
        const existCart = yield prismaClient_1.cartRepository.findFirst({
            where: {
                slug: slug
            }
        });
        if (existCart) {
            return `${existCart.name} já criado`;
        }
        const cart = yield prismaClient_1.cartRepository.create({
            data: {
                name: cartName,
                slug: slug
            }
        });
        return cart;
    });
}
function getCarts() {
    return __awaiter(this, void 0, void 0, function* () {
        const carts = yield prismaClient_1.cartRepository.findMany({
            include: {
                _count: {
                    select: {
                        laptops: true
                    }
                }
            }
        });
        return carts;
    });
}
function getCartBySlug(slug) {
    return __awaiter(this, void 0, void 0, function* () {
        const cart = yield prismaClient_1.cartRepository.findFirst({
            where: {
                slug: slug
            }
        });
        return cart !== null;
    });
}
function getCartIdBySlug(slug) {
    return __awaiter(this, void 0, void 0, function* () {
        const cartId = yield prismaClient_1.cartRepository.findFirst({
            where: {
                slug: slug
            },
            select: {
                id: true
            }
        });
        return cartId === null || cartId === void 0 ? void 0 : cartId.id;
    });
}
exports.cartServices = {
    create,
    getCarts,
    getCartBySlug,
    getCartIdBySlug
};
