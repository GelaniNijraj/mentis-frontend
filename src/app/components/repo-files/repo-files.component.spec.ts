import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RepoFilesComponent } from './repo-files.component';

describe('RepoFilesComponent', () => {
  let component: RepoFilesComponent;
  let fixture: ComponentFixture<RepoFilesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RepoFilesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RepoFilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
