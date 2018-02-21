import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllReposComponent } from './all-repos.component';

describe('AllReposComponent', () => {
  let component: AllReposComponent;
  let fixture: ComponentFixture<AllReposComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllReposComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllReposComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
