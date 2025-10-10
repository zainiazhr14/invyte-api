import Elysia from "elysia";

export const userRoutes = new Elysia({
  prefix: 'api/v1/'
}).group('user', (app) =>
  app
    .get('/dashboard', () => 'Admin Dashboard')
    .post('/create', () => 'Create Admin')
);