import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayingCarsComponent } from './playing-cars.component';

describe('PlayingCarsComponent', () => {
  let component: PlayingCarsComponent;
  let fixture: ComponentFixture<PlayingCarsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlayingCarsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlayingCarsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
