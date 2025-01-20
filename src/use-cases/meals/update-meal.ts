import { MealsRepository } from '@/repositories/meals-repository'
import { Meal } from '@prisma/client'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'
import { NotAllowedError } from '../errors/not-allowed-error'

interface UpdateMealUseCaseRequest {
  mealId: string
  userId: string
  name: string
  description: string
  datetime: Date
  isOnDiet: boolean
}

interface UpdateMealUseCaseResponse {
  meal: Meal
}

export class UpdateMealUseCase {
  constructor(private mealsRepository: MealsRepository) {}

  async execute({
    mealId,
    userId,
    name,
    description,
    datetime,
    isOnDiet,
  }: UpdateMealUseCaseRequest): Promise<UpdateMealUseCaseResponse> {
    const meal = await this.mealsRepository.findById(mealId)

    if (!meal) {
      throw new ResourceNotFoundError()
    }

    if (meal.userId !== userId) {
      throw new NotAllowedError()
    }

    meal.name = name
    meal.description = description
    meal.datetime = datetime
    meal.isOnDiet = isOnDiet

    const updatedMeal = await this.mealsRepository.save(meal)

    return { meal: updatedMeal }
  }
} 