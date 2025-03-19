import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import { GymxTabs } from './index';
import { builtinEnvironments } from 'vitest/environments';

describe('TabList.vue', () => {
  const tabsConfig = {
    tabs: [
      { id: 'a', title: 'Title 1', content: 'Content 1' },
      { id: 'b', title: 'Title 2', content: 'Content 2' },
      { id: 'c', title: 'Title 3', content: 'Content 3' },
    ],
    selectedTab: 1,
    label: 'Example Tabs',
  };

  const tabsConfigWithoutIds = {
    tabs: [
      { title: 'Title 1', content: 'Content 1' },
      { title: 'Title 2', content: 'Content 2' },
      { title: 'Title 3', content: 'Content 3' },
    ],
    label: 'Example Tabs',
  };

  it('should focus on the active tab when component is mounted', async () => {
    const wrapper = mount(GymxTabs, { props: tabsConfig, attachTo: 'body' });
    const activeTab = wrapper.find('[aria-selected="true"]');

    activeTab.element.focus();

    expect(document.activeElement).toBe(activeTab.element);
    expect(document.activeElement.textContent).toBe('Title 2');
  });

  it.skip('should move focus to the next tabpanel when Tab is pressed', async () => {
    expect(typeof window).not.toBe('undefined')
    const wrapper = mount(GymxTabs, { props: tabsConfig, attachTo: 'body' });
    const tabs = wrapper.findAll('[role="tab"]');
    const activeTab = wrapper.find('[aria-selected="true"]');

    activeTab.element.focus();
    await wrapper.trigger('keydown', { key: 'Tab' });
    const tabPanel = wrapper.find('[role="tabpanel"]');
    // tabPanel.element.focus();
    // expect(document.activeElement).toBe(tabPanel.element);

    console.log(builtinEnvironments)
    console.log('panel', tabPanel.element.textContent);
    console.log('document.activeElement', document.activeElement.textContent);

    // expect(document.activeElement.textContent).toBe('Content 2');
  });

  it.skip('should move focus to the tabpanel when Tab is pressed', async () => {
    const wrapper = mount(GymxTabs, { props: tabsConfig });
    const activeTab = wrapper.find('[aria-selected="true"]');
    const tabPanel = wrapper.find('[role="tabpanel"]');

    activeTab.element.focus();
    await wrapper.vm.$nextTick();
    // expect(document.activeElement).toBe(activeTab.element);

    await wrapper.trigger('keydown', { key: 'Tab' });
    await wrapper.vm.$nextTick();

    // expect(document.activeElement).toBe(tabPanel.element);
    console.log('d', document.activeElement)
  });

  it.skip('should move focus to the next button when Tab is pressed', () => {
    document.body.innerHTML = `
    <button id="button1">Button 1</button>
    <button id="button2">Button 2</button>
  `;

    const button1 = document.getElementById('button1');
    const button2 = document.getElementById('button2');

    button1.focus();
    expect(document.activeElement).toBe(button1);

    const tabEvent = new KeyboardEvent('keydown', { key: 'Tab' });
    document.dispatchEvent(tabEvent);
  });


  it('should move focus to the next tab click tab', async () => {
    const wrapper = mount(GymxTabs, { props: tabsConfig, attachTo: 'body' });
    const tabs = wrapper.findAll('[role="tab"]') || [];
    tabs.at(0).trigger('click');
    await wrapper.vm.$nextTick();
    expect(tabs.at(0).element).toBe(document.activeElement);
  });

  it('should move focus to the next tab when Right Arrow is pressed', async () => {
    const wrapper = mount(GymxTabs, { props: tabsConfig, attachTo: 'body' });
    const tabs = wrapper.findAll('[role="tab"]') || [];
    tabs.at(0).trigger('keydown', { key: 'ArrowRight' });
    await wrapper.vm.$nextTick();
    expect(tabs.at(1).element).toBe(document.activeElement);
  });

  it('should move focus to the previous tab when Left Arrow is pressed', async () => {
    const wrapper = mount(GymxTabs, { props: tabsConfig, attachTo: 'body' });
    const tabs = wrapper.findAll('[role="tab"]');
    tabs.at(1).trigger('keydown', { key: 'ArrowLeft' });
    await wrapper.vm.$nextTick();
    expect(tabs.at(0).element).toBe(document.activeElement);
  });

  it('should move focus to the first tab when Home is pressed', async () => {
    const wrapper = mount(GymxTabs, { props: tabsConfig, attachTo: 'body' });
    const tabs = wrapper.findAll('[role="tab"]');
    tabs.at(2).trigger('keydown', { key: 'Home' });
    await wrapper.vm.$nextTick();
    expect(tabs.at(0).element).toBe(document.activeElement);
    expect(document.activeElement).toBeInstanceOf(HTMLButtonElement);
  });

  it('should move focus to the last tab when End is pressed', async () => {
    const wrapper = mount(GymxTabs, { props: tabsConfig, attachTo: 'body' });
    const tabs = wrapper.findAll('[role="tab"]');
    tabs.at(0).trigger('keydown', { key: 'End' });
    await wrapper.vm.$nextTick();
    expect(tabs.at(tabs.length - 1).element).toBe(document.activeElement);
    expect(document.activeElement).toBeInstanceOf(HTMLButtonElement);
  });

  it('should move focus to the first tab when last tab is focused', async () => {
    const wrapper = mount(GymxTabs, { props: tabsConfig, attachTo: 'body' });
    const tabs = wrapper.findAll('[role="tab"]') || [];
    tabs.at(2).trigger('keydown', { key: 'ArrowRight' });
    await wrapper.vm.$nextTick();
    expect(tabs.at(0).element).toBe(document.activeElement);
  });

  it('should move focus to the last tab when a negative index is provided', async () => {
    const wrapper = mount(GymxTabs, { props: tabsConfig, attachTo: 'body' });
    const tabs = wrapper.findAll('[role="tab"]') || [];
    const negativeIndex = -1;
    wrapper.vm.selectTabIndex(negativeIndex);
    await wrapper.vm.$nextTick();
    expect(tabs.at(tabs.length - 1).element).toBe(document.activeElement);
  });

  it('should set default tab index if none is provided', async () => {
    const wrapper = mount(GymxTabs, { props: tabsConfigWithoutIds, attachTo: 'body' });
    expect(wrapper.vm.selectedTabIndex).toBe(0);
  });

  it('should have proper ARIA roles and attributes for tabs', () => {
    const wrapper = mount(GymxTabs, { props: tabsConfig });
    const tabList = wrapper.find('[role="tablist"]');
    expect(tabList.exists()).toBe(true);

    const tabs = wrapper.findAll('[role="tab"]');
    tabs.forEach(tab => {
      expect(tab.attributes('aria-selected')).toBeDefined();
      expect(tab.attributes('aria-controls')).toBeDefined();
    });
  });

  it('should have proper ARIA roles and attributes for tab panels', () => {
    const wrapper = mount(GymxTabs, { props: tabsConfig });
    const tabPanels = wrapper.findAll('[role="tabpanel"]');
    console.log(tabPanels);
    tabPanels.forEach(panel => {
      expect(panel.attributes('aria-labelledby')).toBeDefined();
    });
  });


  it('should generate IDs with attrs.id', async () => {
    const wrapper = mount(GymxTabs, {
      props: tabsConfigWithoutIds,
      attrs: {
        id: 'custom-id',
      },
    });

    const tabs = wrapper.vm.tabs;
    expect(tabs[0].id).toBe('custom-id-0');
    expect(tabs[1].id).toBe('custom-id-1');
    expect(tabs[2].id).toBe('custom-id-2');
  });

  it('should generate IDs with componentId when attrs.id is missing', async () => {
    const wrapper = mount(GymxTabs, { props: tabsConfigWithoutIds });

    const tabs = wrapper.vm.tabs;
    expect(tabs[0].id).toBe('gymx-tab-0');
    expect(tabs[1].id).toBe('gymx-tab-1');
    expect(tabs[2].id).toBe('gymx-tab-2');
  });
});
