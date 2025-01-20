import { verifyJwt } from '@/http/middlewares/verify-jwt'
import { FastifyInstance } from 'fastify'
import { create } from './create'
import { get } from './get'
import { update } from './update'
import { remove } from './delete'

export async function mealsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJwt)
  
  app.post('/meals', create)
  app.get('/meals/:id', get)
  app.put('/meals/:id', update)
  app.delete('/meals/:id', remove)
} 