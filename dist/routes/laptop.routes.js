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
exports.laptopRoutes = void 0;
const laptop_controller_1 = require("../controllers/laptop.controller");
function laptopRoutes(fastify) {
    return __awaiter(this, void 0, void 0, function* () {
        fastify.get('/cart/:cartSlug/laptops', laptop_controller_1.laptopController.getAllLaptopsFromSpecificCart);
        fastify.get('/laptop/:laptopCode', laptop_controller_1.laptopController.getCartNameByLaptopCode);
        fastify.post('/laptop', laptop_controller_1.laptopController.saveLaptop);
        fastify.put('/laptop', laptop_controller_1.laptopController.updateLaptopCart);
    });
}
exports.laptopRoutes = laptopRoutes;
