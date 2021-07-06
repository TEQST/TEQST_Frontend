import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {IonicModule} from '@ionic/angular';

import {ListenPage} from './listen.page';

describe('ListenPage', () => {
  let component: ListenPage;
  let fixture: ComponentFixture<ListenPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ListenPage],
      imports: [IonicModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(ListenPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
