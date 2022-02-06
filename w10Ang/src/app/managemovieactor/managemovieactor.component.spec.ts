import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagemovieactorComponent } from './managemovieactor.component';

describe('ManagemovieactorComponent', () => {
  let component: ManagemovieactorComponent;
  let fixture: ComponentFixture<ManagemovieactorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagemovieactorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagemovieactorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
