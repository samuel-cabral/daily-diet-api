import fastify from 'fastify'
import fastifyJwt from '@fastify/jwt'
import fastifyCookie from '@fastify/cookie'
import { env } from './env'
import { usersRoutes } from './http/controllers/users/routes'
import { mealsRoutes } from './http/controllers/meals/routes'
import { ZodError } from 'zod'

export const app = fastify()

// JWT
app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  cookie: {
    cookieName: 'refreshToken',
    signed: false,
  },
  sign: {
    expiresIn: '10m',
  },
})

// Cookies
app.register(fastifyCookie)

// Routes
app.register(usersRoutes)
app.register(mealsRoutes)

// Error handling
app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: 'Validation error.', issues: error.format() })
  }

  if (env.NODE_ENV !== 'production') {
    console.error(error)
  }

  return reply.status(500).send({ message: 'Internal server error.' })
}) 