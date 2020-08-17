import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {IonicModule} from '@ionic/angular';

import {SpeakerDetailPage} from './speaker-detail.page';

describe('SpeakerDetailPage', () => {
  let component: SpeakerDetailPage;
  let fixture: ComponentFixture<SpeakerDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SpeakerDetailPage],
      imports: [IonicModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(SpeakerDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
