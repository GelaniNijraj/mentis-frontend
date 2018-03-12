import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IssueLabelsComponent } from './issue-labels.component';

describe('IssueLabelsComponent', () => {
  let component: IssueLabelsComponent;
  let fixture: ComponentFixture<IssueLabelsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IssueLabelsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IssueLabelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
