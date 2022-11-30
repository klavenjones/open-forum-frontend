import { describe, it, expect, vi } from 'vitest';
import { flushPromises, mount } from '@vue/test-utils';
import TheWelcomeVue from '../TheWelcome.vue';
import axios from 'axios';

const mockUserList = [
  {
    id: 1,
    username: 'Klavenj',
    isAdmin: false,
  },
  {
    id: 2,
    username: 'BillyJean',
    isAdmin: false,
  },
  {
    id: 5,
    username: 'Anthony',
    isAdmin: false,
  },
  {
    id: 7,
    username: 'Jeff',
    isAdmin: false,
  },
  {
    id: 8,
    username: 'Grant',
    isAdmin: true,
  },
];

describe('TheWelcome.vue', async () => {
  it('should load users on button click', async () => {
    vi.spyOn(axios, 'get').mockResolvedValue(mockUserList);

    const wrapper = mount(TheWelcomeVue);

    wrapper.get('[data-test="user-btn"]').trigger('click');

    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(axios.get).toHaveBeenCalledWith('http://localhost:3000/users');

    // Wait until the DOM updates.
    await flushPromises();
  });
});
