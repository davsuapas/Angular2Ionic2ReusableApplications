import {ContextService} from './context.service';

import {contextMock} from "../mock";

import {TestBed, inject} from '@angular/core/testing';

describe('ContextService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ContextService]
    });
  });

  it('should set and get context', inject([ContextService], (service: ContextService) => {
    service.setUser(contextMock);
    expect(service.getUser()).toBeDefined();
  }));

  it('should throw exception when context is not set', inject([ContextService], (service: ContextService) => {
    expect(() => service.getUser()).toThrowError(Error);
  }));
});
