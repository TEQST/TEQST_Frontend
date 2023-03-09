import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {IonicModule} from '@ionic/angular';

import {ListeningToSpeakersPage} from './listening-to-speakers.page';

describe('ListeningToSpeakersPage', () => {
  let component: ListeningToSpeakersPage;
  let fixture: ComponentFixture<ListeningToSpeakersPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ListeningToSpeakersPage],
      imports: [IonicModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(ListeningToSpeakersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
