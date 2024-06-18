import Fastify, { FastifyReply, FastifyRequest } from 'fastify'
import { laptopRoutes } from './routes/laptop.routes.ts'
import { cartRoutes } from './routes/cart.routes.ts'

const fastify = Fastify({
    logger: true
})

fastify.get('/api', async (request: FastifyRequest, reply: FastifyReply) => {
    reply.status(200).send({Hello: "World"})
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