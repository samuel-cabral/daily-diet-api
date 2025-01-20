export class ControllerError extends Error {
  constructor(message: string = 'Internal server error') {
    super(message)
  }
} 