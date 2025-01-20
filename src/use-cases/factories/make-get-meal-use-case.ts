import { PrismaMealsRepository } from '@/repositories/prisma/prisma-meals-repository'
import { GetMealUseCase } from '../meals/get-meal'

export function makeGetMealUseCase() {
  const mealsRepository = new PrismaMealsRepository()
  const useCase = new GetMealUseCase(mealsRepository)

  return useCase
} 