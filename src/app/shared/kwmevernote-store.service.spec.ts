import { TestBed } from '@angular/core/testing';

import { KwmevernoteStoreService } from './kwmevernote-store.service';

describe('KwmevernoteStoreService', () => {
  let service: KwmevernoteStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KwmevernoteStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
