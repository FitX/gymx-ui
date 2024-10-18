
import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import { GymxSelectField } from './index';

describe('GymxSelectField', () => {
  it('is a Vue instance', () => {
    const wrapper = mount(GymxSelectField);
    expect(wrapper.exists()).toBeTruthy();
  });
});
