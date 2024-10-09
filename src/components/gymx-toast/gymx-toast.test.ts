
import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import { GymxToast } from './index';

describe('GymxToast', () => {
  it('is a Vue instance', () => {
    const wrapper = mount(GymxToast);
    expect(wrapper.exists()).toBeTruthy();
  });
});
