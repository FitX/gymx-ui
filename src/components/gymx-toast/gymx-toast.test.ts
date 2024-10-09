
import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import { GymxNotification } from './index';

describe('GymxNotification', () => {
  it('is a Vue instance', () => {
    const wrapper = mount(GymxNotification);
    expect(wrapper.exists()).toBeTruthy();
  });
});
