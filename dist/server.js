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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
const laptop_routes_1 = require("./routes/laptop.routes");
const cart_routes_1 = require("./routes/cart.routes");
const cors_1 = __importDefault(require("@fastify/cors"));
const fastify = (0, fastify_1.default)({
    logger: true
});
fastify.get('/api', (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    reply.status(200).send({ Hello: "World" });
}));
fastify.register(cors_1.default, {
    origin: (origin, cb) => {
        cb(null, true);
    }
});
fastify.register(laptop_routes_1.laptopRoutes, { prefix: '/api' });
fastify.register(cart_routes_1.cartRoutes, { prefix: '/api' });
fastify.listen({ port: 3000 }, (err, address) => {
    if (err) {
        fastify.log.error(err);
        process.exit(1);
    }
    fastify.log.info(`Servidor rodando em ${address}`);
});
