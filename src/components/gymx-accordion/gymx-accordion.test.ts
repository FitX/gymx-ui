import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { GymxAccordion } from './index';
import type { GymxAccordionProps } from './types';

/* vi.mock('@/utils/css-modifier.ts', () => ({
  getModifierClasses: vi.fn((base: string, modifier?: string) =>
    modifier ? `${base}--${modifier}` : ''
  ),
})); */

describe('GymxAccordion', () => {
  const defaultProps: Partial<GymxAccordionProps> = {
    title: 'Test Accordion Title',
    content: 'Test accordion content',
  };

  describe('Component Rendering', () => {
    it('renders correctly with default props', () => {
      const wrapper = mount(GymxAccordion, {
        props: defaultProps,
      });

      expect(wrapper.find('details').exists()).toBe(true);
      expect(wrapper.find('summary').exists()).toBe(true);
      expect(wrapper.find('.accordion__content').exists()).toBe(true);
      expect(wrapper.text()).toContain('Test Accordion Title');
      expect(wrapper.text()).toContain('Test accordion content');
    });

    it('applies correct CSS classes', () => {
      const wrapper = mount(GymxAccordion, {
        props: defaultProps,
      });

      const details = wrapper.find('details');
      expect(details.classes()).toContain('accordion');
    });

    it('applies native icons modifier class when nativeIcons is true', () => {
      const wrapper = mount(GymxAccordion, {
        props: {
          ...defaultProps,
          nativeIcons: true,
        },
      });

      const details = wrapper.find('details');
      expect(details.classes()).toContain('accordion--has-native-icons');
    });

    it('does not apply native icons modifier class when nativeIcons is false', () => {
      const wrapper = mount(GymxAccordion, {
        props: {
          ...defaultProps,
          nativeIcons: false,
        },
      });

      const details = wrapper.find('details');
      expect(details.classes()).not.toContain('accordion--has-native-icons');
    });
  });

  describe('Model Binding', () => {
    it('sets open attribute based on v-model', () => {
      const wrapper = mount(GymxAccordion, {
        props: {
          ...defaultProps,
          modelValue: true,
        },
      });

      const details = wrapper.find('details');
      expect(details.attributes('open')).toBeDefined();
    });

    it('does not set open attribute when v-model is false', () => {
      const wrapper = mount(GymxAccordion, {
        props: {
          ...defaultProps,
          modelValue: false,
        },
      });

      const details = wrapper.find('details');
      expect(details.attributes('open')).toBeUndefined();
    });

    it('defaults to closed when no v-model is provided', () => {
      const wrapper = mount(GymxAccordion, {
        props: defaultProps,
      });

      const details = wrapper.find('details');
      expect(details.attributes('open')).toBeUndefined();
    });
  });

  describe('Toggle Functionality', () => {
    it('emits update:modelValue when toggled open', async () => {
      const wrapper = mount(GymxAccordion, {
        props: {
          ...defaultProps,
          modelValue: false,
        },
      });

      const details = wrapper.find('details');
      const detailsElement = details.element as HTMLDetailsElement;

      detailsElement.open = true;
      await details.trigger('toggle');

      expect(wrapper.emitted('update:modelValue')).toBeTruthy();
      expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([true]);
    });

    it('emits update:modelValue when toggled closed', async () => {
      const wrapper = mount(GymxAccordion, {
        props: {
          ...defaultProps,
          modelValue: true,
        },
      });

      const details = wrapper.find('details');
      const detailsElement = details.element as HTMLDetailsElement;

      detailsElement.open = false;
      await details.trigger('toggle');

      expect(wrapper.emitted('update:modelValue')).toBeTruthy();
      expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([false]);
    });

    it('handles toggle event correctly with DOM manipulation', async () => {
      const wrapper = mount(GymxAccordion, {
        props: {
          ...defaultProps,
          modelValue: false,
        },
      });

      const details = wrapper.find('details');
      const detailsElement = details.element as HTMLDetailsElement;

      detailsElement.open = true;
      await details.trigger('toggle');

      expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([true]);

      detailsElement.open = false;
      await details.trigger('toggle');

      expect(wrapper.emitted('update:modelValue')?.[1]).toEqual([false]);
    });
  });

  describe('Default Icon', () => {
    it('renders default chevron icon', () => {
      const wrapper = mount(GymxAccordion, {
        props: defaultProps,
      });

      const icon = wrapper.find('.accordion__icon');
      expect(icon.exists()).toBe(true);
      expect(icon.element.tagName.toLowerCase()).toBe('svg');
      expect(icon.attributes('viewBox')).toBe('0 0 18 18');
      expect(icon.attributes('aria-hidden')).toBe('true');
    });

    it('applies correct icon styles', () => {
      const wrapper = mount(GymxAccordion, {
        props: defaultProps,
      });

      const icon = wrapper.find('.accordion__icon');
      expect(icon.attributes('style')).toContain('block-size: var(--icon-block-size, 1em)');
      expect(icon.attributes('style')).toContain('inline-size: var(--icon-inline-size, 1em)');
    });
  });

  describe('Slots', () => {
    it('renders title slot content', () => {
      const wrapper = mount(GymxAccordion, {
        props: defaultProps,
        slots: {
          title: '<span class="custom-title">Custom Title</span>',
        },
      });

      expect(wrapper.find('.custom-title').exists()).toBe(true);
      expect(wrapper.text()).toContain('Custom Title');
    });

    it('renders default content slot', () => {
      const wrapper = mount(GymxAccordion, {
        props: defaultProps,
        slots: {
          default: '<div class="custom-content">Custom content here</div>',
        },
      });

      expect(wrapper.find('.custom-content').exists()).toBe(true);
      expect(wrapper.text()).toContain('Custom content here');
    });

    it('renders icon-start slot with open state', () => {
      const wrapper = mount(GymxAccordion, {
        props: {
          ...defaultProps,
          modelValue: true,
        },
        slots: {
          'icon-start': '<template #icon-start="{ open }"><span class="custom-icon">{{ open ? "open" : "closed" }}</span></template>',
        },
      });

      expect(wrapper.find('.custom-icon').exists()).toBe(true);
      expect(wrapper.text()).toContain('open');
    });

    it('renders icon-end slot with open state', () => {
      const wrapper = mount(GymxAccordion, {
        props: {
          ...defaultProps,
          modelValue: false,
        },
        slots: {
          'icon-end': '<template #icon-end="{ open }"><span class="end-icon">{{ open ? "expanded" : "collapsed" }}</span></template>',
        },
      });

      expect(wrapper.find('.end-icon').exists()).toBe(true);
      expect(wrapper.text()).toContain('collapsed');
    });

    it('passes correct open state to icon slots', () => {
      const wrapper = mount(GymxAccordion, {
        props: {
          ...defaultProps,
          modelValue: true,
        },
        slots: {
          'icon-start': '<template #icon-start="{ open }"><span class="start-icon" :data-open="open">Start</span></template>',
          'icon-end': '<template #icon-end="{ open }"><span class="end-icon" :data-open="open">End</span></template>',
        },
      });

      const startIcon = wrapper.find('.start-icon');
      const endIcon = wrapper.find('.end-icon');

      expect(startIcon.exists()).toBe(true);
      expect(endIcon.exists()).toBe(true);
    });
  });

  describe('Props', () => {
    it('handles missing title prop gracefully', () => {
      const wrapper = mount(GymxAccordion, {
        props: {
          content: 'Test content',
        },
      });

      const summary = wrapper.find('summary');
      expect(summary.exists()).toBe(true);
    });

    it('handles missing content prop gracefully', () => {
      const wrapper = mount(GymxAccordion, {
        props: {
          title: 'Test title',
        },
      });

      const content = wrapper.find('.accordion__content');
      expect(content.exists()).toBe(true);
    });

    it('uses nativeIcons prop correctly', () => {
      const wrapper = mount(GymxAccordion, {
        props: {
          ...defaultProps,
          nativeIcons: true,
        },
      });

      expect(wrapper.find('details').classes()).toContain('accordion--has-native-icons');
    });
  });

  describe('Accessibility', () => {
    it('has proper ARIA attributes on icon', () => {
      const wrapper = mount(GymxAccordion, {
        props: defaultProps,
      });

      const icon = wrapper.find('.accordion__icon');
      expect(icon.attributes('aria-hidden')).toBe('true');
    });

    it('uses semantic HTML structure', () => {
      const wrapper = mount(GymxAccordion, {
        props: defaultProps,
      });

      expect(wrapper.find('details').exists()).toBe(true);
      expect(wrapper.find('summary').exists()).toBe(true);
      expect(wrapper.find('details > summary').exists()).toBe(true);
    });
  });

  describe('Edge Cases', () => {
    it('handles rapid toggle events', async () => {
      const wrapper = mount(GymxAccordion, {
        props: {
          ...defaultProps,
          modelValue: false,
        },
      });

      const details = wrapper.find('details');
      const detailsElement = details.element as HTMLDetailsElement;

      detailsElement.open = true;
      await details.trigger('toggle');

      detailsElement.open = false;
      await details.trigger('toggle');

      detailsElement.open = true;
      await details.trigger('toggle');

      const emitted = wrapper.emitted('update:modelValue');
      expect(emitted).toBeTruthy();
      expect(emitted?.length).toBe(3);
      expect(emitted?.[0]).toEqual([true]);
      expect(emitted?.[1]).toEqual([false]);
      expect(emitted?.[2]).toEqual([true]);
    });

    it('handles toggle event when details element exists', async () => {
      const wrapper = mount(GymxAccordion, {
        props: {
          ...defaultProps,
          modelValue: false,
        },
      });

      const details = wrapper.find('details');
      const detailsElement = details.element as HTMLDetailsElement;

      expect(detailsElement).toBeDefined();
      expect('open' in detailsElement).toBe(true);

      detailsElement.open = true;
      await details.trigger('toggle');

      expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([true]);
    });
  });
});
