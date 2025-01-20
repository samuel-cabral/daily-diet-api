import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryMealsRepository } from '@/repositories/in-memory/in-memory-meals-repository'
import { DeleteMealUseCase } from './delete-meal'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'
import { NotAllowedError } from '../errors/not-allowed-error'

let mealsRepository: InMemoryMealsRepository
let sut: DeleteMealUseCase

describe('Delete Meal Use Case', () => {
  beforeEach(() => {
    mealsRepository = new InMemoryMealsRepository()
    sut = new DeleteMealUseCase(mealsRepository)
  })

  it('should be able to delete a meal', async () => {
    const createdMeal = await mealsRepository.create({
      name: 'Breakfast',
      description: 'Oatmeal with fruits',
      datetime: new Date(),
      isOnDiet: true,
      userId: 'user-01',
    })

    await sut.execute({
      mealId: createdMeal.id,
      userId: 'user-01',
    })

    const meal = await mealsRepository.findById(createdMeal.id)

    expect(meal).toBeNull()
  })

  it('should not be able to delete a non-existing meal', async () => {
    await expect(() =>
      sut.execute({
        mealId: 'non-existing-id',
        userId: 'user-01',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })

  it('should not be able to delete another user meal', async () => {
    const createdMeal = await mealsRepository.create({
      name: 'Breakfast',
      description: 'Oatmeal with fruits',
      datetime: new Date(),
      isOnDiet: true,
      userId: 'user-01',
    })

    await expect(() =>
      sut.execute({
        mealId: createdMeal.id,
        userId: 'user-02',
      }),
    ).rejects.toBeInstanceOf(NotAllowedError)
  })
}) 