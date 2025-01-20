import type { Meal, Prisma } from '@prisma/client'

export interface MealsRepository {
  findById(id: string): Promise<Meal | null>
  findManyByUserId(userId: string): Promise<Meal[]>
  create(data: Prisma.MealUncheckedCreateInput): Promise<Meal>
  save(meal: Meal): Promise<Meal>
  delete(id: string): Promise<void>
} 