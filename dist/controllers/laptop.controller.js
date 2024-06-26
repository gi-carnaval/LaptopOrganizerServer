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
exports.laptopController = void 0;
const laptop_services_js_1 = require("../services/laptop.services.js");
const error_resource_js_1 = require("../common/error.resource.js");
const httpStatus_js_1 = require("../common/httpStatus.js");
function getAllLaptopsFromSpecificCart(request, reply) {
    return __awaiter(this, void 0, void 0, function* () {
        const { cartSlug } = request.params;
        try {
            const laptops = yield laptop_services_js_1.laptopServices.getLaptopsFromCart(cartSlug);
            reply.status(200).send(laptops);
        }
        catch (err) {
            reply.status(500).send({ error: 'Erro ao buscar notebooks do carrinho' });
        }
    });
}
function getCartNameByLaptopCode(request, reply) {
    return __awaiter(this, void 0, void 0, function* () {
        const { laptopCode } = request.params;
        const laptop = yield laptop_services_js_1.laptopServices.laptopExists(parseInt(laptopCode));
        if (!laptop) {
            return reply
                .status(httpStatus_js_1.HttpStatus.NOT_FOUND)
                .send((0, error_resource_js_1.createErrorResponse)("Notebook não encontrado"));
        }
        reply.status(httpStatus_js_1.HttpStatus.OK).send(laptop);
    });
}
function saveLaptop(request, reply) {
    return __awaiter(this, void 0, void 0, function* () {
        const { laptopCode, cartSlug } = request.body;
        console.log("LaptopCode here: ", laptopCode);
        const laptop = yield laptop_services_js_1.laptopServices.saveLaptop(laptopCode, cartSlug);
        if (laptop.isError()) {
            console.error(`Erro ao tentar salvar notebook ${laptop.error}`);
            return reply.status(httpStatus_js_1.HttpStatus.CONFLICT).send((0, error_resource_js_1.createErrorResponse)(`${laptop.error}`));
        }
        reply.status(httpStatus_js_1.HttpStatus.OK).send(laptop);
    });
}
function updateLaptopCart(request, reply) {
    return __awaiter(this, void 0, void 0, function* () {
        const { laptopCode, newCartSlug } = request.body;
        const laptop = yield laptop_services_js_1.laptopServices.updateLaptopCart(laptopCode, newCartSlug);
        return reply.status(httpStatus_js_1.HttpStatus.OK).send(laptop);
    });
}
exports.laptopController = {
    getAllLaptopsFromSpecificCart,
    getCartNameByLaptopCode,
    saveLaptop,
    updateLaptopCart
};
