import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import { GymxSelect } from './index';
import { nextTick } from 'vue';

describe('GymxSelect', () => {
  it('is a Vue instance', () => {
    const wrapper = mount(GymxSelect);
    expect(wrapper.exists()).toBeTruthy();
  });


  it('disabled works', async () => {
    const wrapper = mount(GymxSelect, {
      props: {
        modelValue: { text: 'foo' },
        state: 'disabled',
      },
    });
    expect(wrapper.html()).toContain('select--disabled');
    await wrapper.setProps({ state: undefined });
    expect(wrapper.html()).not.toContain('select--disabled');
    await wrapper.setProps({ inputAttributes: { disabled: 'disabled'} });
    expect(wrapper.html()).toContain('select--disabled');
  });

  it('should set disabled to true when props.state is disabled', () => {
    const wrapper = mount(GymxSelect, {
      props: {
        state: 'disabled',
        inputAttributes: {},
      },
    });

    const select = wrapper.find('select');
    expect(select.attributes('disabled')).toBeDefined();
  });
  

  it('should set disabled to true when $attrs.disabled is true', () => {
    const wrapper = mount(GymxSelect, {
      props: {
        // @ts-expect-error
        state: 'active',
        selectAttributes: {},
      },
      attrs: {
        disabled: true,
      },
    });

    const select = wrapper.find('select');
    expect(select.attributes('disabled')).toBeDefined();
  });

  it('should not set disabled when neither props.state nor $attrs.disabled are true', () => {
    const wrapper = mount(GymxSelect, {
      props: {
        // @ts-expect-error
        state: 'active',
        selectAttributes: {},
      },
    });

    const select = wrapper.find('select');
    expect(select.attributes('disabled')).toBeUndefined();
  });
});
