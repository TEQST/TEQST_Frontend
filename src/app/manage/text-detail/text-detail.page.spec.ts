import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TextDetailPage } from './text-detail.page';

describe('TextDetailPage', () => {
  let component: TextDetailPage;
  let fixture: ComponentFixture<TextDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TextDetailPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TextDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
