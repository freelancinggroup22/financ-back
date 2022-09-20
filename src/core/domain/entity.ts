import { v4 as uuid } from 'uuid';

type Dates = {
  createdAt?: Date;
  updatedAt?: Date;
};

export abstract class Entity<T> {
  protected readonly _id: string;
  protected readonly props: T & Dates;

  get id() {
    return this._id;
  }

  constructor(props: T & Dates, id?: string) {
    this._id = id ?? uuid();
    this.props.createdAt = props.createdAt ?? new Date();
    this.props.updatedAt = new Date();
    this.props = props;
  }
}
