import { MealsRepository } from '@/repositories/meals-repository'
import { Meal } from '@prisma/client'

interface ListUserMealsUseCaseRequest {
  userId: string
}

interface ListUserMealsUseCaseResponse {
  meals: Meal[]
}

export class ListUserMealsUseCase {
  constructor(private mealsRepository: MealsRepository) {}

  async execute({
    userId,
  }: ListUserMealsUseCaseRequest): Promise<ListUserMealsUseCaseResponse> {
    const meals = await this.mealsRepository.findManyByUserId(userId)

    return { meals }
  }
} 