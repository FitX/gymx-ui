
import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import { GymxAppHeader } from './index';

describe('GymxAppHeader', () => {
  it('is a Vue instance', () => {
    const wrapper = mount(GymxAppHeader);
    expect(wrapper.exists()).toBeTruthy();
  });
});
