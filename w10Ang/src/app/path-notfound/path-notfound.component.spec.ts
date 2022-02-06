import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PathNotfoundComponent } from './path-notfound.component';

describe('PathNotfoundComponent', () => {
  let component: PathNotfoundComponent;
  let fixture: ComponentFixture<PathNotfoundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PathNotfoundComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PathNotfoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
