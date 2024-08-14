
import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import { GymxErrorMessage } from './index';

describe('GymxErrorMessage', () => {
  it('is a Vue instance', () => {
    const wrapper = mount(GymxErrorMessage);
    expect(wrapper.exists()).toBeTruthy();
  });
});
