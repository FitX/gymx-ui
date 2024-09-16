
import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import { GymxInput } from './index';

describe('GymxInput', () => {
  it('is a Vue instance', () => {
    const wrapper = mount(GymxInput);
    expect(wrapper.exists()).toBeTruthy();
  });
});
