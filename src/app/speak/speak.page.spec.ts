import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {IonicModule} from '@ionic/angular';

import {SpeakPage} from './speak.page';

describe('SpeakPage', () => {
  let component: SpeakPage;
  let fixture: ComponentFixture<SpeakPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SpeakPage],
      imports: [IonicModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(SpeakPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
