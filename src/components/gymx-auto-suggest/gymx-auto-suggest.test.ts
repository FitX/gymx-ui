import { mount } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vitest';
import { GymxAutoSuggest } from './index';
import { nextTick } from 'vue';

const options = [
  { text: 'Option 1', value: '1' },
  { text: 'Option 2', value: '2', disabled: true },
  { text: 'Option 3', value: '3' },
];

describe('GymxAutoSuggest', () => {
  const mountGymxAutoSuggest = (props = {}) =>
    mount(GymxAutoSuggest, {
      props: {
        options,
        name: 'test-GymxAutoSuggest',
        label: 'Test GymxAutoSuggest',
        ...props,
      },
      attachTo: document.body
    });

  it('is a Vue instance', () => {
    const wrapper = mountGymxAutoSuggest();
    expect(wrapper.exists()).toBeTruthy();
  });

  it('render with label and options', () => {
    const wrapper = mountGymxAutoSuggest();
    expect(wrapper.find('label').text()).toContain('Test GymxAutoSuggest');
    expect(wrapper.findAll('li').length).toBe(3);
  });

  it('filters options based on input text', async () => {
    const wrapper = mountGymxAutoSuggest();
    await wrapper.find('input').setValue('Option 1');
    expect(wrapper.vm.filteredList).toEqual([{ text: 'Option 1', value: '1' }]);
  });

  it('open and closes the list when input is clicked', async () => {
    const wrapper = mountGymxAutoSuggest();
    const input = wrapper.find('input');

    expect(wrapper.vm.isListOpen).toBe(false);

    await input.trigger('mousedown');
    await nextTick();
    console.log('Nach Focus isListOpen:', wrapper.vm.isListOpen);
    // expect(wrapper.find('ul').isVisible()).toBe(true);
    expect(wrapper.vm.isListOpen).toBe(true);

    await wrapper.vm.hideList();
    expect(wrapper.vm.isListOpen).toBe(false);
  });

  it('handle arrow key navigation and selection', async () => {
    const wrapper = mountGymxAutoSuggest();
    const input = wrapper.find('input');

    await input.trigger('keyup', { key: 'ArrowDown' });
    await nextTick();
    expect(wrapper.vm.isListOpen).toBe(true);

    const firstOption = wrapper.findAll('li').at(0);
    expect(document.activeElement).toBe(firstOption.element);

    await firstOption.trigger('keydown', { key: 'Enter' });
    expect(wrapper.vm.model).toBe('1');
  });

  it('handle input keys', async () => {
    const wrapper = mountGymxAutoSuggest();
    const input = wrapper.find('input');

    await input.trigger('keyup', { key: 'A' });
    await nextTick();
    expect(wrapper.vm.isListOpen).toBe(true);
  });

  it('ignores focus on disabled list item', async () => {
    const wrapper = mountGymxAutoSuggest({
      options: [
        { text: 'Option 1', value: '1', disabled: true },
        { text: 'Option 2', value: '2' },
        { text: 'Option 3', value: '3' },
      ]
    });
    const input = wrapper.find('input');

    await input.trigger('keyup', { key: 'ArrowDown' });
    await nextTick();

    const maybeSelectedOptionNotDisabled = wrapper.findAll('li').at(1);
    expect(document.activeElement).toBe(maybeSelectedOptionNotDisabled.element);
  });

  it('ignores defined keyup cases ', async () => {
    const ignoreKeys = [
      'Escape',
      'ArrowUp',
      'ArrowLeft',
      'ArrowRight',
      'Enter',
      'Tab',
      'Shift'
    ];
    const wrapper = mountGymxAutoSuggest();
    const input = wrapper.find('input');

    const testKeys = async (key: string) => {
      await input.trigger('keyup', { key });
      await nextTick();
      expect(wrapper.vm.isListOpen).toBe(false);
    };

    await ignoreKeys.reduce(async (a, key) => {
      await a;
      await testKeys(key);
    }, Promise.resolve());
  });

  it('selects option with Enter key and closes list', async () => {
    const wrapper = mountGymxAutoSuggest();
    const input = wrapper.find('input');

    await input.trigger('keydown', { key: 'ArrowDown' });
    await nextTick();
    // li
    const firstLi = wrapper.findAll('li').at(0);
    // await input.trigger('keydown', { key: 'Enter' });
    await firstLi.trigger('keydown', { key: 'Enter' });
    await nextTick();

    console.log('vm', wrapper.vm)
    await nextTick();
    expect(wrapper.vm.model).toBe('1');
    expect(wrapper.vm.isListOpen).toBe(false);
  });

  it('hide list on escape keydown event', async () => {
    const wrapper = mountGymxAutoSuggest();
    const input = wrapper.find('input');

    await input.trigger('keydown', { key: 'Escape' });
    await nextTick();
    expect(wrapper.vm.isListOpen).toBe(false);
  });

  it('hide list on escape tab event', async () => {
    const wrapper = mountGymxAutoSuggest();
    const input = wrapper.find('input');

    await input.trigger('keydown', { key: 'Tab' });
    await nextTick();
    expect(wrapper.vm.isListOpen).toBe(false);
  });

  it('ul hide list on escape tab event', async () => {
    const wrapper = mountGymxAutoSuggest();
    const input = wrapper.find('ul');

    await input.trigger('keydown', { key: 'Tab' });
    await nextTick();
    expect(wrapper.vm.isListOpen).toBe(false);
  });

  it('ul hide list on escape escape event', async () => {
    const wrapper = mountGymxAutoSuggest();
    const input = wrapper.find('ul');

    await input.trigger('keydown', { key: 'Escape'});
    await nextTick();
    expect(wrapper.vm.isListOpen).toBe(false);
  });



  it('navigate list items', async () => {
    const wrapper = mountGymxAutoSuggest();
    const input = wrapper.find('input');

    await input.trigger('keyup', { key: 'O' });
    const listItems = wrapper.findAll('li');

    await listItems.at(0).trigger('keydown', { key: 'ArrowDown' });
    expect(document.activeElement).toBe(listItems.at(2).element);

    await listItems.at(2).trigger('keydown', { key: 'ArrowUp' });
    expect(document.activeElement).toBe(listItems.at(0).element);
  });






  it('selects option with click', async () => {
    const wrapper = mountGymxAutoSuggest();
    const disabledOption = wrapper.findAll('li').at(0);

    await disabledOption.trigger('click');
    expect(wrapper.vm.model).toBe('1');
  });

  it('prevents selection of disabled options', async () => {
    const wrapper = mountGymxAutoSuggest();
    const disabledOption = wrapper.findAll('li').at(1);

    await disabledOption.trigger('click');
    expect(wrapper.vm.model).not.toBe('2');
  });

  it('No Results Text is visible', async () => {
    const wrapper = mountGymxAutoSuggest();;
    expect(wrapper.find('.list__no-results').exists()).toBe(false);
    const input = wrapper.find('input');
    await input.setValue('Not included');
    expect(wrapper.find('.list__no-results').exists()).toBe(true);
    expect(wrapper.find('.list__no-results').text()).toBe('No results available');
    await wrapper.setProps({ noResultsText: 'Another Text'});
    expect(wrapper.find('.list__no-results').text()).toBe('Another Text');
  });







  it('set focus as default', async () => {
    const wrapper = mountGymxAutoSuggest();
    const input = wrapper.find('input');
    const firstLi = wrapper.findAll('li').at(0);
    await firstLi.trigger('keydown', { key: 'O' });

    await nextTick();
    expect(document.activeElement).toBe(input.element);
  });

  it('calls scrollIntoView when input is clicked and list is shown', async () => {
    const wrapper = mountGymxAutoSuggest();
    const scrollIntoViewMock = vi.fn();
    HTMLLIElement.prototype.scrollIntoView = scrollIntoViewMock;
    HTMLElement.prototype.scrollIntoView = scrollIntoViewMock;
    window.HTMLElement.prototype.scrollIntoView = () => {};
    window.HTMLElement.prototype.scrollIntoView = scrollIntoViewMock;

    const input = wrapper.find('input');
    const list = wrapper.find('ul');
    const listItem = wrapper.find(`[role="option"][data-value="1"]`);

    await input.setValue('Option 1')

    listItem.element.scrollIntoView = scrollIntoViewMock;

    await input.trigger('mousedown');

    expect(wrapper.vm.isListOpen).toBe(true);

    expect(listItem.exists()).toBe(true);

    await nextTick();

    expect(scrollIntoViewMock).toHaveBeenCalled();


    expect(scrollIntoViewMock).toHaveBeenCalled();
  });
});
