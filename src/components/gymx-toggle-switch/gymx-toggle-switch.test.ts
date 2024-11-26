
import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import { GymxToggleSwitch } from './index';

describe('GymxToggleSwitch', () => {
  it('is a Vue instance', () => {
    const wrapper = mount(GymxToggleSwitch);
    expect(wrapper.exists()).toBeTruthy();
  });
});
