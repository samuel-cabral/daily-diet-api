import { Meal, Prisma } from '@prisma/client'
import { MealsRepository } from '../meals-repository'
import { randomUUID } from 'node:crypto'

export class InMemoryMealsRepository implements MealsRepository {
  public items: Meal[] = []

  async findById(id: string) {
    const meal = this.items.find((item) => item.id === id)

    if (!meal) {
      return null
    }

    return meal
  }

  async findManyByUserId(userId: string) {
    const meals = this.items.filter((item) => item.userId === userId)

    return meals
  }

  async create(data: Prisma.MealUncheckedCreateInput) {
    const meal = {
      id: randomUUID(),
      name: data.name,
      description: data.description,
      datetime: new Date(data.datetime),
      isOnDiet: data.isOnDiet,
      userId: data.userId,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    this.items.push(meal)

    return meal
  }

  async save(meal: Meal) {
    const mealIndex = this.items.findIndex((item) => item.id === meal.id)

    if (mealIndex >= 0) {
      this.items[mealIndex] = meal
    }

    return meal
  }

  async delete(id: string) {
    const mealIndex = this.items.findIndex((item) => item.id === id)

    if (mealIndex >= 0) {
      this.items.splice(mealIndex, 1)
    }
  }
} 