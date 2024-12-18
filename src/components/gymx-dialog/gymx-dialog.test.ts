import { mount } from '@vue/test-utils';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { GymxDialog } from './index';

// prevent .close() error when testing
beforeEach(() => {
  HTMLDialogElement.prototype.showModal = vi.fn();
  HTMLDialogElement.prototype.show = vi.fn();
  HTMLDialogElement.prototype.close = vi.fn();
});
describe('GymxDialog', () => {
  it('is a Vue instance', () => {
    const wrapper = mount(GymxDialog, { attachTo: document.body });
    expect(wrapper.exists()).toBeTruthy();
  });

  it('renders the dialog with the correct title', () => {
    const wrapper = mount(GymxDialog, {
      props: {
        title: 'Test Dialog',
      },
    });

    expect(wrapper.find('.dialog__title').text()).toBe('Test Dialog');
  });

  it('opens the dialog when isOpen is set to true', async () => {
    const wrapper = mount(GymxDialog, {
      props: {
        modelValue: false,
        isModal: true,
      },
    });

    await wrapper.setProps({ modelValue: true });

    const dialogEl = wrapper.find('dialog').element as HTMLDialogElement;
    expect(dialogEl.showModal).toHaveBeenCalled();
  });

  it('closes the dialog when close is called', async () => {
    const wrapper = mount(GymxDialog, {
      props: {
        modelValue: true,
      },
    });

    await wrapper.vm.close();
    const dialogEl = wrapper.find('dialog').element as HTMLDialogElement;
    expect(dialogEl.close).toHaveBeenCalled();
  });

  it('emits opened and closed events', async () => {
    const wrapper = mount(GymxDialog, {
      props: {
        modelValue: false,
      },
    });

    await wrapper.setProps({ modelValue: true });
    expect(wrapper.emitted().opened).toBeTruthy();

    await wrapper.vm.close();
    expect(wrapper.emitted().closed).toBeTruthy();
  });

  it('closes when clicking outside if closeOnOutside is true', async () => {
    const wrapper = mount(GymxDialog, {
      props: {
        closeOnOutside: true,
        modelValue: true,
      },
    });

    // Simulate click outsid
    const clickEvent = new MouseEvent('click');
    document.body.dispatchEvent(clickEvent);

    // Wait for close
    await wrapper.vm.$nextTick();

    const dialogEl = wrapper.find('dialog').element as HTMLDialogElement;
    expect(dialogEl.close).toHaveBeenCalled();
    expect(wrapper.emitted().closed).toBeTruthy();
  });

  it('does not close when clicking outside if closeOnOutside is false', async () => {
    const wrapper = mount(GymxDialog, {
      props: {
        closeOnOutside: false,
        modelValue: true,
      },
    });

    // Simulate click outside
    const clickEvent = new MouseEvent('click');
    document.body.dispatchEvent(clickEvent);

    const dialogEl = wrapper.find('dialog').element as HTMLDialogElement;
    expect(dialogEl.close).not.toHaveBeenCalled();
    expect(wrapper.emitted().closed).toBeFalsy();
  });

  it('should close when the dialog is closed', async () => {
    const wrapper = mount(GymxDialog, {
      props: {
        modelValue: true,
        isModal: true,
        closeOnOutside: false,
        title: 'Test Dialog',
      },
      slots: {
        default: '<div>Dialog Body</div>',
        footer: '<div>Dialog Footer</div>',
      },
    });

    expect(wrapper.vm.isOpen).toBe(true);

    await wrapper.find('dialog').trigger('close');

    expect(wrapper.emitted('closed')).toBeTruthy();
    expect(wrapper.vm.isOpen).toBe(false);
  });

  /* it('should close when clicking outside the dialog', async () => {
    const wrapper = mount(GymxDialog, {
      props: {
        modelValue: true,
        isModal: true,
        closeOnOutside: true,
        title: 'Test Dialog'
      },
      slots: {
        default: '<div>Dialog Body</div>',
        footer: '<div>Dialog Footer</div>'
      },
      attachTo: document.body
    });

    expect(wrapper.vm.isOpen).toBe(true);

    await document.body.click();

    expect(wrapper.emitted('closed')).toBeTruthy();
    expect(wrapper.vm.isOpen).toBe(false);

    wrapper.unmount();
  }); */

  it('should close when the close button is clicked', async () => {
    const wrapper = mount(GymxDialog, {
      props: {
        modelValue: true,
        isModal: true,
        closeOnOutside: false,
        title: 'Test Dialog',
      },
      slots: {
        default: '<div>Dialog Body</div>',
        footer: '<div>Dialog Footer</div>',
      },
      attachTo: document.body,
    });

    expect(wrapper.vm.isOpen).toBe(true);

    const closeButton = wrapper.find('.dialog__button-close');
    expect(closeButton.exists()).toBe(true);

    await closeButton.trigger('click');

    expect(wrapper.emitted('closed')).toBeTruthy();
    expect(wrapper.vm.isOpen).toBe(false);

    wrapper.unmount();
  });
});
