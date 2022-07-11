import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {IonicModule} from '@ionic/angular';

import {
  SpeakerSelectPopoverComponent,
} from './speaker-select-popover.component';

describe('SpeakerSelectPopoverComponent', () => {
  let component: SpeakerSelectPopoverComponent;
  let fixture: ComponentFixture<SpeakerSelectPopoverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SpeakerSelectPopoverComponent],
      imports: [IonicModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(SpeakerSelectPopoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
