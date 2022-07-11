import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {IonicModule} from '@ionic/angular';

import {
  SpeakerProgressTextViewComponent,
} from './speaker-progress-text-view.component';

describe('SpeakerProgressTextViewComponent', () => {
  let component: SpeakerProgressTextViewComponent;
  let fixture: ComponentFixture<SpeakerProgressTextViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SpeakerProgressTextViewComponent],
      imports: [IonicModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(SpeakerProgressTextViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
