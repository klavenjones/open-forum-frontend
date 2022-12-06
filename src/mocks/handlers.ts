import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { mockRegisterResponse } from './mockRegisterResponse';
import { mockUserResponse } from './mockUserResponse';

export const handlers = [
  rest.get('http://localhost:3000/users', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(mockUserResponse));
  }),

  rest.post('http://localhost:3000/auth/register', (req, res, ctx) => {
    return res(ctx.status(201), ctx.json(mockRegisterResponse));
  }),
];

export const server = setupServer(...handlers);
