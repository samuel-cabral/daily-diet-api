import { PrismaMealsRepository } from '@/repositories/prisma/prisma-meals-repository'
import { GetUserMetricsUseCase } from '../users/get-user-metrics'

export function makeGetUserMetricsUseCase() {
  const mealsRepository = new PrismaMealsRepository()
  const useCase = new GetUserMetricsUseCase(mealsRepository)

  return useCase
} 