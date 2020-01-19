import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TextListViewPage } from './text-list-view.page';

describe('TextListViewPage', () => {
  let component: TextListViewPage;
  let fixture: ComponentFixture<TextListViewPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TextListViewPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TextListViewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
