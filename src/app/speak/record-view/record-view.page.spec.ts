import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {IonicModule} from '@ionic/angular';

import {RecordViewPage} from './record-view.page';

describe('RecordViewPage', () => {
  let component: RecordViewPage;
  let fixture: ComponentFixture<RecordViewPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RecordViewPage],
      imports: [IonicModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(RecordViewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
