import { InvalidStatusError } from './errors/invalid-status-error';
import { Status } from './status';

describe('Status value object', () => {
  it('Should create a status on success', () => {
    expect(Status.create('pending').isRight()).toBeTruthy();
    expect(Status.create('planned').isRight()).toBeTruthy();
    expect(Status.create('paid').isRight()).toBeTruthy();
  });

  it('Should reject if try to create an invalid status', () => {
    expect(Status.create('').isLeft()).toBeTruthy();
    expect(Status.create('S').isLeft()).toBeTruthy();
    expect(Status.create('  TS').isLeft()).toBeTruthy();
    expect(Status.create('Test status'.repeat(300)).isLeft()).toBeTruthy();
    expect(Status.create('Test]n§=¨5¨# statusºª').isLeft()).toBeTruthy();
    expect(Status.create('TS'.repeat(300)).value).toBeInstanceOf(
      InvalidStatusError,
    );
  });
});
