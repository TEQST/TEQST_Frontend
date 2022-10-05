import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {IonicModule} from '@ionic/angular';

import {TimeStatsComponent} from './time-stats.component';

describe('TimeStatsComponent', () => {
  let component: TimeStatsComponent;
  let fixture: ComponentFixture<TimeStatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TimeStatsComponent],
      imports: [IonicModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(TimeStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
