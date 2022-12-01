import { describe, it, expect, vi, beforeAll, afterAll, afterEach } from 'vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/vue';
import TheWelcomeVue from '../TheWelcome.vue';
import axios from 'axios';
import { server } from '@/mocks/handlers';

// Start server before all tests
beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));

//  Close server after all tests
afterAll(() => server.close());

// Reset handlers after each test `important for test isolation`
afterEach(() => server.resetHandlers());

describe('TheWelcome.vue', async () => {

  it('should render button', async () => {
    render(TheWelcomeVue);
    const button = await screen.getByTestId('user-btn');
    expect(button).toBeDefined;

    cleanup();
  });

  it('should call axios two times after the button is clicked twice', async () => {
    vi.spyOn(axios, 'get');
    render(TheWelcomeVue);

    const button = await screen.getByTestId('user-btn');

    await fireEvent.click(button);
    await fireEvent.click(button);

    expect(axios.get).toHaveBeenCalledTimes(2);

    cleanup();
  });

  it('should call axios with the correct request url', async () => {
    vi.spyOn(axios, 'get');
    render(TheWelcomeVue);

    const button = await screen.getByTestId('user-btn');

    await fireEvent.click(button);

    expect(axios.get).toHaveBeenCalledWith('http://localhost:3000/users');

    cleanup();
  });

  it('should render a list of users with the length of 7 when the button is clicked', async () => {
    render(TheWelcomeVue);

    const button = await screen.getByTestId('user-btn');
    fireEvent.click(button);

    const userList = await screen.findAllByTestId('users');
    expect(userList.length).toBe(7);

    cleanup();
  });

  it('should render a list containing one user named Klay when the button is clicked', async () => {
    render(TheWelcomeVue);

    const button = await screen.getByTestId('user-btn');
    await fireEvent.click(button);

    const userList = await screen.findAllByText('Klay');
    expect(userList.length).toBe(1);
    cleanup();
  });


});
