import Fastify, { FastifyReply, FastifyRequest } from 'fastify'
import { laptopRoutes } from './routes/laptop.routes'
import { cartRoutes } from './routes/cart.routes'
import cors from '@fastify/cors'

const fastify = Fastify({
    logger: true
})

fastify.get('/api', async (request: FastifyRequest, reply: FastifyReply) => {
    reply.status(200).send({Hello: "World"})
})

fastify.register(cors, {
    origin: (origin, cb) => {
        cb(null, true)
    }
})

fastify.register(laptopRoutes, {prefix: '/api'})
fastify.register(cartRoutes, {prefix: '/api'})

fastify.listen({ port: 3000 }, (err, address) => {
    if (err) {
        fastify.log.error(err);
        process.exit(1)
    }
    fastify.log.info(`Servidor rodando em ${address}`)
})