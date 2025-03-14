
import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import { GymxSegmentedButton } from './index';

describe('GymxSegmentedButton', () => {
  it('is a Vue instance', () => {
    const wrapper = mount(GymxSegmentedButton);
    expect(wrapper.exists()).toBeTruthy();
  });
});
