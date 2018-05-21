import { ReusableModule } from './reusable.module';

describe('ReusableModule', () => {
  let reusableModule: ReusableModule;

  beforeEach(() => {
    reusableModule = new ReusableModule();
  });

  it('should create an instance', () => {
    expect(reusableModule).toBeTruthy();
  });
});
