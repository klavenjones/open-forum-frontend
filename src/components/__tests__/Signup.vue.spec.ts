import { describe, it, expect, beforeAll, afterAll, afterEach } from 'vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/vue';
import Signup from '../Signup.vue';
import { server } from '@/mocks/handlers';

// Start server before all tests
beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));

//  Close server after all tests
afterAll(() => server.close());

// Reset handlers after each test `important for test isolation`
afterEach(() => {
  server.resetHandlers();
  cleanup();
});

describe('Signup.vue', async () => {
  it('should render a successful sign up', async () => {
    render(Signup);

    const form = screen.getByRole('form');
    fireEvent.submit(form);

    const sucessMessage = await screen.findByText('Message: Hey TestUser your registration was successful!');
    // //Check if registration was successful
    expect(sucessMessage.innerHTML.includes('Message: Hey TestUser your registration was successful!')).toBe(true);
  });
});
