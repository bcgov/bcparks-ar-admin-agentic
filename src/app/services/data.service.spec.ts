import { DataService } from './data.service';

describe('DataService', () => {
  let service: DataService;

  beforeEach(() => {
    service = new DataService();
  });

  it('initialises missing items with a null value', () => {
    expect(service.getItemValue('missing-item')).toBeNull();
  });

  it('sets and gets item values', () => {
    service.setItemValue('selected-park', { id: 1 });

    expect(service.getItemValue('selected-park')).toEqual({ id: 1 });
  });

  it('emits the initial and updated values when an item is watched', () => {
    const values: string[] = [];
    const subscription = service.watchItem('status').subscribe((value) => {
      values.push(value);
    });

    service.setItemValue('status', 'ready');

    expect(values).toEqual([null, 'ready']);
    subscription.unsubscribe();
  });
});
