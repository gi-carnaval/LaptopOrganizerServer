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
exports.cartController = void 0;
const cart_services_1 = require("../services/cart.services");
function generateSlug(cartName) {
    const slug = cartName.replace(/[^\w\s]/gi, '');
    return slug.replace(/\s+/g, '_').toLowerCase();
}
function saveCart(request, reply) {
    return __awaiter(this, void 0, void 0, function* () {
        const { name } = request.body;
        const slug = generateSlug(name);
        console.log("Slug aqui: ", slug);
        try {
            const cart = yield cart_services_1.cartServices.create(name, slug);
            reply.status(200).send(cart);
        }
        catch (err) {
            reply.status(500).send({ error: 'Erro ao buscar notebooks do carrinho' });
        }
    });
}
function getCarts(request, reply) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield cart_services_1.cartServices.getCarts();
        reply.status(200).send(result);
    });
}
exports.cartController = {
    saveCart,
    getCarts
};
