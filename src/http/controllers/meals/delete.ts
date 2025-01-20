import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import { NotAllowedError } from '@/use-cases/errors/not-allowed-error'
import { makeDeleteMealUseCase } from '@/use-cases/factories/make-delete-meal-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function remove(request: FastifyRequest, reply: FastifyReply) {
  const deleteMealParamsSchema = z.object({
    id: z.string().uuid(),
  })

  const { id } = deleteMealParamsSchema.parse(request.params)

  try {
    const deleteMealUseCase = makeDeleteMealUseCase()

    await deleteMealUseCase.execute({
      mealId: id,
      userId: request.user.sub,
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