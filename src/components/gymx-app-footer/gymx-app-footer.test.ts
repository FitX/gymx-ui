
import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import { GymxAppFooter } from './index';

describe('GymxAppFooter', () => {
  it('is a Vue instance', () => {
    const wrapper = mount(GymxAppFooter);
    expect(wrapper.exists()).toBeTruthy();
  });
});
