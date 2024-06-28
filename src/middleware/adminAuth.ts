import { FastifyRequest, FastifyReply, HookHandlerDoneFunction } from 'fastify';
import { CookieSerializeOptions } from '@fastify/cookie';

interface AdminAuthRequest extends FastifyRequest {
  cookies: { adminPassword?: string };
  body: { password?: string };
}

export async function adminAuth(request: AdminAuthRequest, reply: FastifyReply) {
  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminPassword) {
    reply.status(500).send({ error: 'Server misconfiguration: ADMIN_PASSWORD not set' });
    return;
  }

  const { password } = request.body;
  const sessionPassword = request.cookies.adminPassword;

  if (sessionPassword === adminPassword || password === adminPassword) {
    if (!sessionPassword) {
      const cookieOptions: CookieSerializeOptions = {
        path: '/',
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 3600, // 1 hour
      };
      reply.setCookie('adminPassword', adminPassword, cookieOptions);
    }
  } else {
    reply.status(403).send({ error: 'Unauthorized' });
  }
}
