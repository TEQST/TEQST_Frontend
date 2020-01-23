import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CreateTextPage } from './create-text.page';

describe('CreateTextPage', () => {
  let component: CreateTextPage;
  let fixture: ComponentFixture<CreateTextPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateTextPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CreateTextPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
