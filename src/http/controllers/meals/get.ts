import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import { NotAllowedError } from '@/use-cases/errors/not-allowed-error'
import { makeGetMealUseCase } from '@/use-cases/factories/make-get-meal-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function get(request: FastifyRequest, reply: FastifyReply) {
  const getMealParamsSchema = z.object({
    id: z.string().uuid(),
  })

  const { id } = getMealParamsSchema.parse(request.params)

  try {
    const getMealUseCase = makeGetMealUseCase()

    const { meal } = await getMealUseCase.execute({
      mealId: id,
      userId: request.user.sub,
    })

    return reply.status(200).send({
      meal,
    })
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