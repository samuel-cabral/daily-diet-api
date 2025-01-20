export class BaseError extends Error {
  constructor(message: string = 'Internal server error') {
    super(message)
  }
} 