
import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import { GymxLink } from './index';

describe('GymxLink', () => {
  it('is a Vue instance', () => {
    const wrapper = mount(GymxLink);
    expect(wrapper.exists()).toBeTruthy();
  });
});
