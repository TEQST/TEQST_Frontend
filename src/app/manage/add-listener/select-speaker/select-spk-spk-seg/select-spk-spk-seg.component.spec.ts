import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {IonicModule} from '@ionic/angular';

import {SelectSpkSpkSegComponent} from './select-spk-spk-seg.component';

describe('SelectSpkSpkSegComponent', () => {
  let component: SelectSpkSpkSegComponent;
  let fixture: ComponentFixture<SelectSpkSpkSegComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [SelectSpkSpkSegComponent],
      imports: [IonicModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(SelectSpkSpkSegComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
