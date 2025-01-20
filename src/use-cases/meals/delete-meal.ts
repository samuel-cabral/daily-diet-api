import { MealsRepository } from '@/repositories/meals-repository'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'
import { NotAllowedError } from '../errors/not-allowed-error'

interface DeleteMealUseCaseRequest {
  mealId: string
  userId: string
}

export class DeleteMealUseCase {
  constructor(private mealsRepository: MealsRepository) {}

  async execute({ mealId, userId }: DeleteMealUseCaseRequest): Promise<void> {
    const meal = await this.mealsRepository.findById(mealId)

    if (!meal) {
      throw new ResourceNotFoundError()
    }

    if (meal.userId !== userId) {
      throw new NotAllowedError()
    }

    await this.mealsRepository.delete(mealId)
  }
} 