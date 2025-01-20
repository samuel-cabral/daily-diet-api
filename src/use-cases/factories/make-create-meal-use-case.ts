import { PrismaMealsRepository } from '@/repositories/prisma/prisma-meals-repository'
import { CreateMealUseCase } from '../meals/create-meal'

export function makeCreateMealUseCase() {
  const mealsRepository = new PrismaMealsRepository()
  const useCase = new CreateMealUseCase(mealsRepository)

  return useCase
} 