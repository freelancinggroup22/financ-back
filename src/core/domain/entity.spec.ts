import { Entity } from './entity';

type CustomProps = {
  prop: string;
};

class CustomEntity extends Entity<CustomProps> {}

describe('Core Entity', () => {
  it('should generate an ID if not provided', () => {
    const entity = new CustomEntity({ prop: 'custom-prop' });

    expect(entity.id).toBeTruthy();
  });

  it('should use the provided ID if provided', () => {
    const entity = new CustomEntity({ prop: 'custom-prop' }, 'custom-id');

    expect(entity.id).toEqual('custom-id');
  });
});
