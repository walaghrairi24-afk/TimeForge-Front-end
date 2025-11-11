import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListGoalComponent } from './list-goal.component';

describe('ListGoalComponent', () => {
  let component: ListGoalComponent;
  let fixture: ComponentFixture<ListGoalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListGoalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListGoalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
