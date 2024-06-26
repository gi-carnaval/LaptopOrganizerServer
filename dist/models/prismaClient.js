"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cartRepository = exports.laptopRepository = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
exports.laptopRepository = prisma.laptop;
exports.cartRepository = prisma.cart;
