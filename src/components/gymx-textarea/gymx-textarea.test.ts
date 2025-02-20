
import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import { GymxTextarea } from './index';
import { GymxLabel } from '@/components';

describe('GymxTextarea', () => {
  it('is a Vue instance containing textare', () => {
    const wrapper = mount(GymxTextarea, { props: { label: 'default' }});
    expect(wrapper.exists()).toBeTruthy();
    expect(wrapper.find('textarea'));
  });

  it('disabled the textarea if the statee is disabled', () => {
    const wrapper = mount(GymxTextarea, {
      props: {
        label: 'disabled state',
        state: 'disabled',
      },
    });
    expect(wrapper.exists()).toBeTruthy();
    expect(wrapper.find('textarea'));
  });

  it('defaults works', () => {
    const wrapper = mount(GymxTextarea, {
      props: {
        label: 'default',
      },
    });
    expect(wrapper.html()).contains('default');
    expect(wrapper.find('.text-area-input').classes()).toContain('text-area-input--auto-grow');
    const defaultId = wrapper.find('textarea').attributes('id');
    expect(wrapper.find('textarea').html()).toContain('id');
    expect(wrapper.findComponent(GymxLabel).attributes('for')).toBe(defaultId);
    expect(wrapper.find('textarea').attributes('rows')).toBe('4');
  });

  it('disabled auto grow / field sizing', () => {
    const wrapper = mount(GymxTextarea, {
      props: {
        label: 'default',
        autoGrow: false,
      },
    });
    expect(wrapper.find('.text-area-input').classes()).not.toContain('text-area-input--auto-grow');
  });

  it('disabled auto grow / field sizing', () => {
    const wrapper = mount(GymxTextarea, {
      props: {
        label: 'default',
        inputAttributes: {
          rows: 10,
          maxLength: 100,
        },
      },
    });
    const textarea = wrapper.find('textarea');
    expect(textarea.attributes('rows')).toBe('10');
    expect(textarea.attributes('maxlength')).toBe('100');
  });

  it('emits an event when typing in textarea', async () => {
    const wrapper = mount(GymxTextarea, {
      props: {
        label: 'Default',
        modelValue: '',
      },
    });
    const textarea = wrapper.find('textarea');
    await textarea.setValue('Test');
    expect(wrapper.emitted()).toHaveProperty('update:modelValue');
    expect(wrapper.emitted()['update:modelValue'][0]).toEqual(['Test']);
  });

  it('renders error message if prop is provided', async () => {
    const wrapper = mount(GymxTextarea, {
      props: {
        label: 'Default',
        modelValue: '',
        errorMessage: 'This is an error',
      },
    });
    expect(wrapper.find('.text-area__additional').text()).toContain('This is an error');
  });

  it('for and id attributes works  correctly', () => {
    const wrapper = mount(GymxTextarea, {
      props: {
        label: 'default',
        id: 'test-1'
      },
    });
    const textarea = wrapper.find('textarea');
    expect(wrapper.findComponent(GymxLabel).attributes('for')).toBe('test-1');
    expect(textarea.attributes('id')).toBe('test-1');
  });
});
