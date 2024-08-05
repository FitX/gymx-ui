
import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import { GymxButton } from './index';

describe('GymxButton', () => {
  it('is a Vue instance', () => {
    const wrapper = mount(GymxButton);
    expect(wrapper.exists()).toBeTruthy();
  });
});
