import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryMealsRepository } from '@/repositories/in-memory/in-memory-meals-repository'
import { GetMealUseCase } from './get-meal'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'
import { NotAllowedError } from '../errors/not-allowed-error'

let mealsRepository: InMemoryMealsRepository
let sut: GetMealUseCase

describe('Get Meal Use Case', () => {
  beforeEach(() => {
    mealsRepository = new InMemoryMealsRepository()
    sut = new GetMealUseCase(mealsRepository)
  })

  it('should be able to get a meal by id', async () => {
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
    })

    expect(meal.id).toEqual(createdMeal.id)
    expect(meal.name).toEqual('Breakfast')
  })

  it('should not be able to get a meal with wrong id', async () => {
    await expect(() =>
      sut.execute({
        mealId: 'non-existing-id',
        userId: 'user-01',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })

  it('should not be able to get another user meal', async () => {
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