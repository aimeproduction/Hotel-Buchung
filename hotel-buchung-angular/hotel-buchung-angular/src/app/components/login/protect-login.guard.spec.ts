import { TestBed } from '@angular/core/testing';

import { ProtectLoginGuard } from './protect-login.guard';

describe('ProtectLoginGuard', () => {
  let guard: ProtectLoginGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ProtectLoginGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
