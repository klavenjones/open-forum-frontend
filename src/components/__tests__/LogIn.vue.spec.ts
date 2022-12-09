import { describe, it, expect, beforeEach } from 'vitest';
import { nextTick } from 'vue';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import { mount } from '@vue/test-utils';
import LogIn from '../LogIn.vue';

describe('LogIn.vue', () => {
  let vuetify: any;

  beforeEach(() => {
    vuetify = createVuetify({ components, directives });
  });

  it('renders properly', () => {
    const wrapper = mount(LogIn, {
      global: {
        plugins: [vuetify],
      },
    });

    const title = wrapper.find('.v-card-title');
    expect(title.text()).toBe('Log In');
  });

  it('should render error messages when a does not submit any input', async () => {
    const wrapper = mount(LogIn, {
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

  it('should render error message that says the password must be more than 5 characters', async () => {
    const wrapper = mount(LogIn, {
      global: {
        plugins: [vuetify],
      },
    });

    const usernameInput = wrapper.find('#username');
    const passwordInput = wrapper.find('#password');

    expect(wrapper.text()).not.toContain('Password must have 5+ character');

    await usernameInput.setValue('TestUser');
    await passwordInput.setValue('ssw');

    await nextTick();

    wrapper.find('.v-form').trigger('submit');

    await nextTick();
    expect(wrapper.text()).toContain('Password must have 5+');
  });

  it('should render error message that says the username must be no more than 20 characters', async () => {
    const wrapper = mount(LogIn, {
      global: {
        plugins: [vuetify],
      },
    });

    const usernameInput = wrapper.find('#username');
    const passwordInput = wrapper.find('#password');

    expect(wrapper.text()).not.toContain('Password must have 5+ character');

    await passwordInput.setValue('tester');
    await usernameInput.setValue(
      'testerstesterstesterstesterstesterstesterstesterstesterstesterstesterstesterstesterstesterstesterstesjlkj'
    );

    await nextTick();

    wrapper.find('.v-form').trigger('submit');

    expect(wrapper.text()).toContain('Username must be less than or equal to 20 characters');
  });

  it('should render error message that says the password must be no more than 20 characters', async () => {
    const wrapper = mount(LogIn, {
      global: {
        plugins: [vuetify],
      },
    });

    const usernameInput = wrapper.find('#username');
    const passwordInput = wrapper.find('#password');

    expect(wrapper.text()).not.toContain('Password must have 5+ character');

    await usernameInput.setValue('TESTUSER');
    await passwordInput.setValue(
      'aaaaaaaaaaaababknaldkfjedklvs.f;lka;lvd;lflmd,.vm,mv.,mdv,.m,mc,.cmz.,m,c.mz ,.cmv.,cm., m.cz,'
    );

    await nextTick();

    wrapper.find('.v-form').trigger('submit');
    expect(wrapper.text()).toContain('Password must be less than 20 characters');
  });
});
