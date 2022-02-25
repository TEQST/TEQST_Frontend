import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {IonicModule} from '@ionic/angular';

import {BasicTextViewComponent} from './basic-text-view.component';

describe('BasicTextViewComponent', () => {
  let component: BasicTextViewComponent;
  let fixture: ComponentFixture<BasicTextViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BasicTextViewComponent],
      imports: [IonicModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(BasicTextViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
