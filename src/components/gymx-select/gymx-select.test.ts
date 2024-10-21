
import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import { GymxSelect } from './index';

describe('GymxSelect', () => {
  it('is a Vue instance', () => {
    const wrapper = mount(GymxSelect);
    expect(wrapper.exists()).toBeTruthy();
  });
});
