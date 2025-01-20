import { PrismaMealsRepository } from '@/repositories/prisma/prisma-meals-repository'
import { ListUserMealsUseCase } from '../meals/list-user-meals'

export function makeListUserMealsUseCase() {
  const mealsRepository = new PrismaMealsRepository()
  const useCase = new ListUserMealsUseCase(mealsRepository)

  return useCase
} 