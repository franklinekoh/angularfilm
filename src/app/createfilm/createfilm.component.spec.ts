import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatefilmComponent } from './createfilm.component';

describe('CreatefilmComponent', () => {
  let component: CreatefilmComponent;
  let fixture: ComponentFixture<CreatefilmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatefilmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatefilmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
