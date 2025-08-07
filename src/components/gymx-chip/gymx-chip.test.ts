
import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import { GymxChip } from './index';

describe('GymxChip', () => {
  it('is a Vue instance', () => {
    const wrapper = mount(GymxChip);
    expect(wrapper.exists()).toBeTruthy();
  });
});
