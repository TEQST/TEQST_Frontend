import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {IonicModule} from '@ionic/angular';

import {ShareFolderPage} from './share-folder.page';

describe('ShareFolderPage', () => {
  let component: ShareFolderPage;
  let fixture: ComponentFixture<ShareFolderPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ShareFolderPage],
      imports: [IonicModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(ShareFolderPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
