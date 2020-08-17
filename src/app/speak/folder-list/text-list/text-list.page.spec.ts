import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {IonicModule} from '@ionic/angular';

import {TextListPage} from './text-list.page';

describe('TextListPage', () => {
  let component: TextListPage;
  let fixture: ComponentFixture<TextListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TextListPage],
      imports: [IonicModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(TextListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
