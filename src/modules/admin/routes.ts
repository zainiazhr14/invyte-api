import Elysia from "elysia";

export const adminRoutes = new Elysia({
  prefix: 'api/v1/'
}).group('admin', (app) =>
  app
    .get('/dashboard', () => 'Admin Dashboard')
    .post('/create', () => 'Create Admin')
);