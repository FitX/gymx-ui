import { describe, expect, it } from 'vitest';
import {
  useToast,
} from './use-toast';

describe('toast', () => {
  it('defaults are correct', () => {
    const {
      toasts,
    } = useToast();
    expect(toasts.value).toStrictEqual([]);
  });
  it('add + remove works are correctly', () => {
    const {
      toasts,
      addToast,
      removeToast,
    } = useToast();

    expect(() => addToast({ msg: '' })).toThrowError('Message is required');

    expect(toasts.value).toStrictEqual([]);
    addToast({ msg: 'Tada' });
    expect(toasts.value).toStrictEqual([{
      id: 1,
      msg: 'Tada',
      type: 'info',
      duration: 6000,
    }]);
    addToast({ msg: 'Tada 2', duration: 5000, type: 'error' });
    expect(toasts.value).toStrictEqual([{
      id: 1,
      msg: 'Tada',
      type: 'info',
      duration: 6000,
    }, {
        type: 'error',
        id: 2,
        msg: 'Tada 2',
        duration: 5000,
      }]);


    removeToast(2);
    expect(toasts.value).toStrictEqual([{
      id: 1,
      msg: 'Tada',
      type: 'info',
      duration: 6000,
    }]);
    removeToast(1);
    expect(toasts.value).toStrictEqual([]);
  });
});
