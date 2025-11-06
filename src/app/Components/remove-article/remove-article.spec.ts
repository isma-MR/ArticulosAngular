import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoveArticle } from './remove-article';

describe('RemoveArticle', () => {
  let component: RemoveArticle;
  let fixture: ComponentFixture<RemoveArticle>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RemoveArticle]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RemoveArticle);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
