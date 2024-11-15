
import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import { GymxAppContent } from './index';

describe('GymxAppContent', () => {
  it('is a Vue instance', () => {
    const wrapper = mount(GymxAppContent);
    expect(wrapper.exists()).toBeTruthy();
  });
});
