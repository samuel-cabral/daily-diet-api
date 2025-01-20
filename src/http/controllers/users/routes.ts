import { FastifyInstance } from 'fastify'
import { authenticate } from './authenticate'
import { create } from './create'
import { refresh } from './refresh'
import { metrics } from './metrics'
import { verifyJwt } from '@/http/middlewares/verify-jwt'

export async function usersRoutes(app: FastifyInstance) {
  app.post('/users', create)
  app.post('/sessions', authenticate)
  app.patch('/token/refresh', refresh)

  /** Authenticated routes */
  app.get('/me/metrics', { onRequest: [verifyJwt] }, metrics)
} 