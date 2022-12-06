import { describe, it, expect, beforeAll, afterAll, afterEach } from 'vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/vue';
import TheWelcomeVue from '../TheWelcome.vue';
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

describe('TheWelcome.vue', async () => {
  it('should render a list of users', async () => {
    render(TheWelcomeVue);

    const button = screen.getByRole('button');
    fireEvent.click(button);

    const userList = await screen.findAllByRole('listitem');

    //Check first user
    expect(userList.length).toBe(7);
    expect(userList[0].innerHTML.includes('Caroline')).toBe(true);
    expect(userList[0].innerHTML.includes('Admin')).toBe(false);
  });

  it('should render a list containing Three Admins', async () => {
    let adminCount = 0;
    render(TheWelcomeVue);

    const button = screen.getByRole('button');
    await fireEvent.click(button);

    const userList = await screen.findAllByRole('listitem');

    userList.forEach(listitem => {
      if (listitem.innerHTML.includes('Admin')) adminCount++;
    });

    expect(adminCount).toBe(3);
  });
});
