import { FastifyInstance } from 'fastify'
import { authenticate } from './authenticate'
import { create } from './create'
import { refresh } from './refresh'

export async function usersRoutes(app: FastifyInstance) {
  app.post('/users', create)
  app.post('/sessions', authenticate)
  app.patch('/token/refresh', refresh)
} 