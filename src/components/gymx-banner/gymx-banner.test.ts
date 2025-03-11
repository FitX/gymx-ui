
import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import { GymxBanner } from './index';

describe('GymxBanner', () => {
  it('is a Vue instance', () => {
    const wrapper = mount(GymxBanner);
    expect(wrapper.exists()).toBeTruthy();
  });
});
