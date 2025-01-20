import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryMealsRepository } from '@/repositories/in-memory/in-memory-meals-repository'
import { CreateMealUseCase } from './create-meal'

let mealsRepository: InMemoryMealsRepository
let sut: CreateMealUseCase

describe('Create Meal Use Case', () => {
  beforeEach(() => {
    mealsRepository = new InMemoryMealsRepository()
    sut = new CreateMealUseCase(mealsRepository)
  })

  it('should be able to create a meal', async () => {
    const { meal } = await sut.execute({
      name: 'Breakfast',
      description: 'Oatmeal with fruits',
      datetime: new Date(),
      isOnDiet: true,
      userId: 'user-01',
    })

    expect(meal.id).toEqual(expect.any(String))
    expect(meal.name).toEqual('Breakfast')
    expect(meal.userId).toEqual('user-01')
  })

  it('should create a meal with the correct diet status', async () => {
    const { meal } = await sut.execute({
      name: 'Pizza',
      description: 'Pepperoni pizza',
      datetime: new Date(),
      isOnDiet: false,
      userId: 'user-01',
    })

    expect(meal.isOnDiet).toBe(false)
  })
}) 