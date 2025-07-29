
import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import { GymxCheckbox } from './index';

describe('GymxCheckbox', () => {
  it('is a Vue instance', () => {
    const wrapper = mount(GymxCheckbox);
    expect(wrapper.exists()).toBeTruthy();
  });
});
