import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Articulo } from './articulo';

describe('Articulo', () => {
  let component: Articulo;
  let fixture: ComponentFixture<Articulo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Articulo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Articulo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
