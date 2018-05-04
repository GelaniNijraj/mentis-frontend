import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RepoCloneComponent } from './repo-clone.component';

describe('RepoCloneComponent', () => {
  let component: RepoCloneComponent;
  let fixture: ComponentFixture<RepoCloneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RepoCloneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RepoCloneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
