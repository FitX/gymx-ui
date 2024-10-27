
import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import { GymxDialog } from './index';

describe('GymxDialog', () => {
  it('is a Vue instance', () => {
    const wrapper = mount(GymxDialog);
    expect(wrapper.exists()).toBeTruthy();
  });
});
