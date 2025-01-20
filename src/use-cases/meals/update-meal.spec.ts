import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryMealsRepository } from '@/repositories/in-memory/in-memory-meals-repository'
import { UpdateMealUseCase } from './update-meal'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'
import { NotAllowedError } from '../errors/not-allowed-error'

let mealsRepository: InMemoryMealsRepository
let sut: UpdateMealUseCase

describe('Update Meal Use Case', () => {
  beforeEach(() => {
    mealsRepository = new InMemoryMealsRepository()
    sut = new UpdateMealUseCase(mealsRepository)
  })

  it('should be able to update a meal', async () => {
    const createdMeal = await mealsRepository.create({
      name: 'Breakfast',
      description: 'Oatmeal with fruits',
      datetime: new Date(),
      isOnDiet: true,
      userId: 'user-01',
    })

    const { meal } = await sut.execute({
      mealId: createdMeal.id,
      userId: 'user-01',
      name: 'Updated Breakfast',
      description: 'Oatmeal with more fruits',
      datetime: new Date(),
      isOnDiet: false,
    })

    expect(meal.name).toEqual('Updated Breakfast')
    expect(meal.description).toEqual('Oatmeal with more fruits')
    expect(meal.isOnDiet).toEqual(false)
  })

  it('should not be able to update a non-existing meal', async () => {
    await expect(() =>
      sut.execute({
        mealId: 'non-existing-id',
        userId: 'user-01',
        name: 'Updated Breakfast',
        description: 'Oatmeal with more fruits',
        datetime: new Date(),
        isOnDiet: false,
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })

  it('should not be able to update another user meal', async () => {
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
        name: 'Updated Breakfast',
        description: 'Oatmeal with more fruits',
        datetime: new Date(),
        isOnDiet: false,
      }),
    ).rejects.toBeInstanceOf(NotAllowedError)
  })
}) 