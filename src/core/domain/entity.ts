import { v4 as uuid } from 'uuid';

export abstract class Entity<T> {
  protected readonly _id: string;
  protected readonly props: T;

  get id() {
    return this._id;
  }

  constructor(props: T, id?: string) {
    this._id = id ?? uuid();
    this.props = props;
  }
}
