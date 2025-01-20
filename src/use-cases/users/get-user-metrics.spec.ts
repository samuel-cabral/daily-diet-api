import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryMealsRepository } from '@/repositories/in-memory/in-memory-meals-repository'
import { GetUserMetricsUseCase } from './get-user-metrics'

let mealsRepository: InMemoryMealsRepository
let sut: GetUserMetricsUseCase

describe('Get User Metrics Use Case', () => {
  beforeEach(() => {
    mealsRepository = new InMemoryMealsRepository()
    sut = new GetUserMetricsUseCase(mealsRepository)
  })

  it('should be able to get user metrics', async () => {
    // Create meals within diet
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

    // Create meal outside diet
    await mealsRepository.create({
      name: 'Dinner',
      description: 'Pizza',
      datetime: new Date(),
      isOnDiet: false,
      userId: 'user-01',
    })

    const { metrics } = await sut.execute({
      userId: 'user-01',
    })

    expect(metrics.totalMeals).toBe(3)
    expect(metrics.mealsOnDiet).toBe(2)
    expect(metrics.mealsOffDiet).toBe(1)
    expect(metrics.bestSequenceOnDiet).toBe(2)
  })

  it('should be able to get best sequence of meals within diet', async () => {
    const dates = [
      new Date('2024-02-20T08:00:00.000Z'), // On diet
      new Date('2024-02-20T12:00:00.000Z'), // On diet
      new Date('2024-02-20T15:00:00.000Z'), // On diet
      new Date('2024-02-20T20:00:00.000Z'), // Off diet
      new Date('2024-02-21T08:00:00.000Z'), // On diet
      new Date('2024-02-21T12:00:00.000Z'), // On diet
    ]

    await mealsRepository.create({
      name: 'Breakfast',
      description: 'Oatmeal',
      datetime: dates[0],
      isOnDiet: true,
      userId: 'user-01',
    })

    await mealsRepository.create({
      name: 'Lunch',
      description: 'Salad',
      datetime: dates[1],
      isOnDiet: true,
      userId: 'user-01',
    })

    await mealsRepository.create({
      name: 'Snack',
      description: 'Fruit',
      datetime: dates[2],
      isOnDiet: true,
      userId: 'user-01',
    })

    await mealsRepository.create({
      name: 'Dinner',
      description: 'Pizza',
      datetime: dates[3],
      isOnDiet: false,
      userId: 'user-01',
    })

    await mealsRepository.create({
      name: 'Breakfast',
      description: 'Toast',
      datetime: dates[4],
      isOnDiet: true,
      userId: 'user-01',
    })

    await mealsRepository.create({
      name: 'Lunch',
      description: 'Salad',
      datetime: dates[5],
      isOnDiet: true,
      userId: 'user-01',
    })

    const { metrics } = await sut.execute({
      userId: 'user-01',
    })

    expect(metrics.bestSequenceOnDiet).toBe(3)
  })

  it('should not count other users meals in metrics', async () => {
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
      userId: 'user-02', // Different user
    })

    const { metrics } = await sut.execute({
      userId: 'user-01',
    })

    expect(metrics.totalMeals).toBe(1)
    expect(metrics.mealsOnDiet).toBe(1)
    expect(metrics.mealsOffDiet).toBe(0)
    expect(metrics.bestSequenceOnDiet).toBe(1)
  })
}) 