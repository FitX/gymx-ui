
import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import { GymxAppLayout } from './index';

describe('GymxAppLayout', () => {
  it('is a Vue instance', () => {
    const wrapper = mount(GymxAppLayout);
    expect(wrapper.exists()).toBeTruthy();
  });
});
