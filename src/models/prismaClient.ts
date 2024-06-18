import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export const laptopRepository = prisma.laptop
export const cartRepository = prisma.cart