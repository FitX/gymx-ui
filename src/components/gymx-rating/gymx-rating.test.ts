import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import { GymxRating } from './index';

describe('GymxRating', () => {
  it('renders the correct number of vote buttons based on numberOfVotes prop', () => {
    const wrapper = mount(GymxRating, {
      props: {
        numberOfVotes: 3,
      },
    });

    const buttons = wrapper.findAll('.vote');
    expect(buttons.length).toBe(3);
  });

  it('renders vote buttons in a row when direction is row', () => {
    const wrapper = mount(GymxRating, {
      props: {
        direction: 'row',
      },
    });

    expect(wrapper.find('.rating').attributes('style')).toContain('--gymx-rating-direction: row');
  });

  it('renders vote buttons in a column when direction is column', () => {
    const wrapper = mount(GymxRating, {
      props: {
        direction: 'column',
      },
    });

    expect(wrapper.find('.rating').attributes('style')).toContain(
      '--gymx-rating-direction: column',
    );
  });

  it('saves the vote correctly when a button is clicked', async () => {
    const wrapper = mount(GymxRating);

    const firstVoteButton = wrapper.find('[data-test="vote-1"]');
    await firstVoteButton.trigger('click');

    expect(wrapper.vm.vote).toBe(1);
  });

  it('does not allow multiple votes when multipleVotes is false', async () => {
    const wrapper = mount(GymxRating, {
      props: {
        multipleVotes: false,
      },
    });

    const firstVoteButton = wrapper.find('[data-test="vote-1"]');
    const secondVoteButton = wrapper.find('[data-test="vote-2"]');

    await firstVoteButton.trigger('click');
    expect(wrapper.vm.vote).toBe(1);

    await secondVoteButton.trigger('click');
    expect(wrapper.vm.vote).toBe(1); // vote should not change
  });

  it('allows multiple votes when multipleVotes is true', async () => {
    const wrapper = mount(GymxRating, {
      props: {
        multipleVotes: true,
      },
    });

    const firstVoteButton = wrapper.find('[data-test="vote-1"]');
    const secondVoteButton = wrapper.find('[data-test="vote-2"]');

    await firstVoteButton.trigger('click');
    expect(wrapper.vm.vote).toBe(1);

    await secondVoteButton.trigger('click');
    expect(wrapper.vm.vote).toBe(2); // vote should change
  });

  it('displays animation when a vote is clicked', async () => {
    const wrapper = mount(GymxRating);

    const firstVoteButton = wrapper.find('[data-test="vote-1"]');
    await firstVoteButton.trigger('click');

    const animation = wrapper.find('[data-test="animation-wrapper"]');
    expect(animation.exists()).toBe(true);
  });
});
