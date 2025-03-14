
import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import { GymxTabs } from './index';

describe('GymxTabs', () => {
  it('is a Vue instance', () => {
    const wrapper = mount(GymxTabs);
    expect(wrapper.exists()).toBeTruthy();
  });
});
