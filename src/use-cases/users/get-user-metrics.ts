import { MealsRepository } from '@/repositories/meals-repository'

interface GetUserMetricsUseCaseRequest {
  userId: string
}

interface Metrics {
  totalMeals: number
  mealsOnDiet: number
  mealsOffDiet: number
  bestSequenceOnDiet: number
}

interface GetUserMetricsUseCaseResponse {
  metrics: Metrics
}

export class GetUserMetricsUseCase {
  constructor(private mealsRepository: MealsRepository) {}

  async execute({
    userId,
  }: GetUserMetricsUseCaseRequest): Promise<GetUserMetricsUseCaseResponse> {
    const meals = await this.mealsRepository.findManyByUserId(userId)

    const totalMeals = meals.length
    const mealsOnDiet = meals.filter((meal) => meal.isOnDiet).length
    const mealsOffDiet = totalMeals - mealsOnDiet

    // Calculate best sequence
    let currentSequence = 0
    let bestSequence = 0

    // Sort meals by datetime to get correct sequence
    const sortedMeals = meals.sort(
      (a, b) => a.datetime.getTime() - b.datetime.getTime(),
    )

    for (const meal of sortedMeals) {
      if (meal.isOnDiet) {
        currentSequence++
        bestSequence = Math.max(bestSequence, currentSequence)
      } else {
        currentSequence = 0
      }
    }

    return {
      metrics: {
        totalMeals,
        mealsOnDiet,
        mealsOffDiet,
        bestSequenceOnDiet: bestSequence,
      },
    }
  }
} 