import { TestBed } from '@angular/core/testing';

import { HeaderHandlerInterceptor } from './header-handler.interceptor';

describe('HeaderHandlerInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      HeaderHandlerInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: HeaderHandlerInterceptor = TestBed.inject(HeaderHandlerInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
