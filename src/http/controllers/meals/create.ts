import { makeCreateMealUseCase } from '@/use-cases/factories/make-create-meal-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createMealBodySchema = z.object({
    name: z.string(),
    description: z.string(),
    datetime: z.string().datetime(),
    isOnDiet: z.boolean(),
  })

  const { name, description, datetime, isOnDiet } = createMealBodySchema.parse(
    request.body,
  )

  const createMealUseCase = makeCreateMealUseCase()

  await createMealUseCase.execute({
    name,
    description,
    datetime: new Date(datetime),
    isOnDiet,
    userId: request.user.sub,
  })

  return reply.status(201).send()
} 