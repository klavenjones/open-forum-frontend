import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { mockUserResponse } from './mockUserResponse';

export const handlers = [
  rest.get('http://localhost:3000/users', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(mockUserResponse));
  }),
];

export const server = setupServer(...handlers);
