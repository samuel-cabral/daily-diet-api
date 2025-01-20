import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import { NotAllowedError } from '@/use-cases/errors/not-allowed-error'
import { makeUpdateMealUseCase } from '@/use-cases/factories/make-update-meal-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function update(request: FastifyRequest, reply: FastifyReply) {
  const updateMealParamsSchema = z.object({
    id: z.string().uuid(),
  })

  const updateMealBodySchema = z.object({
    name: z.string(),
    description: z.string(),
    datetime: z.string().datetime(),
    isOnDiet: z.boolean(),
  })

  const { id } = updateMealParamsSchema.parse(request.params)
  const { name, description, datetime, isOnDiet } = updateMealBodySchema.parse(
    request.body,
  )

  try {
    const updateMealUseCase = makeUpdateMealUseCase()

    await updateMealUseCase.execute({
      mealId: id,
      userId: request.user.sub,
      name,
      description,
      datetime: new Date(datetime),
      isOnDiet,
    })

    return reply.status(204).send()
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: err.message })
    }

    if (err instanceof NotAllowedError) {
      return reply.status(403).send({ message: err.message })
    }

    throw err
  }
} 