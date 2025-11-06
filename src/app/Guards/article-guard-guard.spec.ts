import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { articleGuardGuard } from './article-guard-guard';

describe('articleGuardGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => articleGuardGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
