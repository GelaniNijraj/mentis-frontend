import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RepoShowcaseComponent } from './repo-showcase.component';

describe('RepoShowcaseComponent', () => {
  let component: RepoShowcaseComponent;
  let fixture: ComponentFixture<RepoShowcaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RepoShowcaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RepoShowcaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
