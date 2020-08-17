import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {IonicModule} from '@ionic/angular';

import {CreateFolderPage} from './create-folder.page';

describe('CreateFolderPage', () => {
  let component: CreateFolderPage;
  let fixture: ComponentFixture<CreateFolderPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CreateFolderPage],
      imports: [IonicModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateFolderPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
