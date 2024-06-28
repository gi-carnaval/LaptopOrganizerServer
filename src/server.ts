import Fastify, { FastifyReply, FastifyRequest } from 'fastify'
import { laptopRoutes } from './routes/laptop.routes'
import { cartRoutes } from './routes/cart.routes'
import cors from '@fastify/cors'
import fastifyCookie from '@fastify/cookie'
import { authRoutes } from './routes/auth.routes'

const fastify = Fastify({
    logger: true
})

fastify.register(fastifyCookie, {
    secret: process.env.COOKIE_SECRET || 'default-secret', // Defina um segredo para assinar os cookies
});

fastify.get('/api', async (request: FastifyRequest, reply: FastifyReply) => {
    reply.status(200).send({ Hello: "World" })
})

fastify.register(cors, {
    origin: (origin, cb) => {
        cb(null, true)
    }
})

fastify.register(authRoutes, { prefix: '/api' })
fastify.register(laptopRoutes, { prefix: '/api' })
fastify.register(cartRoutes, { prefix: '/api' })

fastify.listen({ port: 3000 }, (err, address) => {
    if (err) {
        fastify.log.error(err);
        process.exit(1)
    }
    fastify.log.info(`Servidor rodando em ${address}`)
})