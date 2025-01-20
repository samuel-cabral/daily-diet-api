import { MealsRepository } from '@/repositories/meals-repository'
import { Meal } from '@prisma/client'

interface CreateMealUseCaseRequest {
  name: string
  description: string
  datetime: Date
  isOnDiet: boolean
  userId: string
}

interface CreateMealUseCaseResponse {
  meal: Meal
}

export class CreateMealUseCase {
  constructor(private mealsRepository: MealsRepository) {}

  async execute({
    name,
    description,
    datetime,
    isOnDiet,
    userId,
  }: CreateMealUseCaseRequest): Promise<CreateMealUseCaseResponse> {
    const meal = await this.mealsRepository.create({
      name,
      description,
      datetime,
      isOnDiet,
      userId,
    })

    return { meal }
  }
} 