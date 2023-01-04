import { InvalidFlowError } from './errors/invalid-flow-error';
import { Flow } from './flow';

describe('Status value object', () => {
  it('Should create a flow on success', () => {
    expect(Flow.create('income').isRight()).toBeTruthy();
    expect(Flow.create('outcome').isRight()).toBeTruthy();
  });

  it('Should reject if try to create an invalid flow', () => {
    expect(Flow.create('').isLeft()).toBeTruthy();
    expect(Flow.create('S').isLeft()).toBeTruthy();
    expect(Flow.create('  TS').isLeft()).toBeTruthy();
    expect(Flow.create('Test status'.repeat(300)).isLeft()).toBeTruthy();
    expect(Flow.create('Test]n§=¨5¨# statusºª').isLeft()).toBeTruthy();
    expect(Flow.create('TS'.repeat(300)).value).toBeInstanceOf(
      InvalidFlowError,
    );
  });
});
