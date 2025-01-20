import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryMealsRepository } from '@/repositories/in-memory/in-memory-meals-repository'
import { ListUserMealsUseCase } from './list-user-meals'

let mealsRepository: InMemoryMealsRepository
let sut: ListUserMealsUseCase

describe('List User Meals Use Case', () => {
  beforeEach(() => {
    mealsRepository = new InMemoryMealsRepository()
    sut = new ListUserMealsUseCase(mealsRepository)
  })

  it('should be able to list user meals', async () => {
    // Create meals for a specific user
    await mealsRepository.create({
      name: 'Breakfast',
      description: 'Oatmeal',
      datetime: new Date(),
      isOnDiet: true,
      userId: 'user-01',
    })

    await mealsRepository.create({
      name: 'Lunch',
      description: 'Salad',
      datetime: new Date(),
      isOnDiet: true,
      userId: 'user-01',
    })

    // Create a meal for another user
    await mealsRepository.create({
      name: 'Dinner',
      description: 'Pizza',
      datetime: new Date(),
      isOnDiet: false,
      userId: 'user-02',
    })

    const { meals } = await sut.execute({
      userId: 'user-01',
    })

    expect(meals).toHaveLength(2)
    expect(meals).toEqual([
      expect.objectContaining({ userId: 'user-01' }),
      expect.objectContaining({ userId: 'user-01' }),
    ])
  })
}) 