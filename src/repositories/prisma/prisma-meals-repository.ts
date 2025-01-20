import { prisma } from '@/lib/prisma'
import type { Meal, Prisma } from '@prisma/client'
import { MealsRepository } from '../meals-repository'

export class PrismaMealsRepository implements MealsRepository {
  async findById(id: string) {
    const meal = await prisma.meal.findUnique({
      where: { id },
    })

    return meal
  }

  async findManyByUserId(userId: string) {
    const meals = await prisma.meal.findMany({
      where: { userId },
      orderBy: { datetime: 'desc' },
    })

    return meals
  }

  async create(data: Prisma.MealUncheckedCreateInput) {
    const meal = await prisma.meal.create({
      data,
    })

    return meal
  }

  async save(meal: Meal) {
    const updatedMeal = await prisma.meal.update({
      where: { id: meal.id },
      data: meal,
    })

    return updatedMeal
  }

  async delete(id: string) {
    await prisma.meal.delete({
      where: { id },
    })
  }
} 