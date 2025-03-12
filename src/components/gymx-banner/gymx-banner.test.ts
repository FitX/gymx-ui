import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import { GymxBanner } from './index';
import { IconError } from '@/components';

describe('GymxBanner', () => {
  it('is a Vue instance', () => {
    const wrapper = mount(GymxBanner);
    expect(wrapper.exists()).toBeTruthy();
  });

  it('renders the text slot', () => {
    const wrapper = mount(GymxBanner, {
      props: {
        content: 'foo bar',
      },
    });
    expect(wrapper.html()).toContain('foo bar');
  });

  it('renders as default', () => {
    const wrapper = mount(GymxBanner, {
      props: {
        content: 'default',
      },
    });
    expect(wrapper.html()).toContain('default');
    expect(wrapper.find('div').classes('banner')).toBe(true);
  });

  it('renders as warning', () => {
    const wrapper = mount(GymxBanner, {
      props: {
        content: 'warning',
        type: 'warning',
      },
    });
    expect(wrapper.html()).toContain('warning');
    expect(wrapper.find('div').classes('banner--warning')).toBe(true);
  });

  it('renders as success', () => {
    const wrapper = mount(GymxBanner, {
      props: {
        content: 'success',
        type: 'success',
      },
    });
    expect(wrapper.html()).toContain('success');
    expect(wrapper.find('div').classes('banner--success')).toBe(true);
  });

  it('renders as error', () => {
    const wrapper = mount(GymxBanner, {
      props: {
        content: 'error',
        type: 'error',
      },
    });
    expect(wrapper.html()).toContain('error');
    expect(wrapper.find('div').classes('banner--error')).toBe(true);
  });

  it('renders with icons', () => {
    const wrapper = mount(GymxBanner, {
      props: {
        content: 'icon',
        type: 'error',
      },
      slots: {
        icon: IconError,
      },
    });
    expect(wrapper.html()).toContain('icon');
    expect(wrapper.find('div').classes('banner--error')).toBe(true);
    expect(wrapper.find('span').classes('banner__icon')).toBe(true);
  });

  it('renders without icons', () => {
    const wrapper = mount(GymxBanner, {
      props: {
        content: 'icon',
        type: 'no-icon',
      },
      slots: {
        icon: IconError,
      },
    });
    expect(wrapper.html()).toContain('icon');
    expect(wrapper.find('span').classes('banner__icon')).toBe(false);
  });

  it('renders content at the end of input', () => {
    const wrapper = mount(GymxBanner, {
      props: {
        content: 'end',
        type: 'end',
      },
    });
    expect(wrapper.html()).toContain('end');
    expect(wrapper.find('div').classes('banner--end')).toBe(true);
  });
});
