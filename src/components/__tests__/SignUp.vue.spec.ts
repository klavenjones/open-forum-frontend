import { describe, it, expect, beforeEach } from 'vitest';
import { nextTick } from 'vue';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import { mount } from '@vue/test-utils';
import SignUp from '../SignUp.vue';
import { generateString } from './test.helpers/generateString';

describe('SignUp.vue', () => {
  let vuetify: any;

  beforeEach(() => {
    vuetify = createVuetify({ components, directives });
  });

  it('renders properly', () => {
    const wrapper = mount(SignUp, {
      global: {
        plugins: [vuetify],
      },
    });

    const title = wrapper.find('.v-card-title');
    expect(title.text()).toBe('Sign Up');
  });

  it('should render error messages when a does not submit any input', async () => {
    const wrapper = mount(SignUp, {
      global: {
        plugins: [vuetify],
      },
    });

    const usernameInput = wrapper.find('#username');
    const passwordInput = wrapper.find('#password');

    expect(wrapper.text()).not.toContain('Username is required');
    expect(wrapper.text()).not.toContain('Password is required');

    await usernameInput.setValue('');
    await passwordInput.setValue('');

    await wrapper.find('.v-form').trigger('submit.prevent');
    expect(wrapper.text()).toContain('Username is required');
    expect(wrapper.text()).toContain('Password is required');
  });

  it('should render error message that says the password must be more than 8 characters', async () => {
    const wrapper = mount(SignUp, {
      global: {
        plugins: [vuetify],
      },
    });

    const usernameInput = wrapper.find('#username');
    const passwordInput = wrapper.find('#password');

    expect(wrapper.text()).not.toContain('Password must have 8+ character');

    await usernameInput.setValue('TestUser');
    await passwordInput.setValue('ssw');

    await nextTick();

    wrapper.find('.v-form').trigger('submit');

    await nextTick();
    expect(wrapper.text()).toContain('Password must have 8+');
  });

  it('should render error message that says the username must be no more than 30 characters', async () => {
    const wrapper = mount(SignUp, {
      global: {
        plugins: [vuetify],
      },
    });

    const usernameInput = wrapper.find('#username');
    const passwordInput = wrapper.find('#password');

    expect(wrapper.text()).not.toContain('Password must have 8+ character');

    let usernameString = generateString(40);

    await passwordInput.setValue('tester123');
    await usernameInput.setValue(usernameString);

    await nextTick();

    wrapper.find('.v-form').trigger('submit');
    expect(wrapper.text()).toContain('Username must be no more than 30 characters');
  });

  it('should render error message that says the password must be no more than 64 characters', async () => {
    const wrapper = mount(SignUp, {
      global: {
        plugins: [vuetify],
      },
    });

    const usernameInput = wrapper.find('#username');
    const passwordInput = wrapper.find('#password');

    expect(wrapper.text()).not.toContain('Password must have 8+ character');

    let passwordString = generateString(80);

    await usernameInput.setValue('TESTUSER');
    await passwordInput.setValue(passwordString);

    await nextTick();

    wrapper.find('.v-form').trigger('submit');
    expect(wrapper.text()).toContain('Password must be no more than 64 characters');
  });
});
