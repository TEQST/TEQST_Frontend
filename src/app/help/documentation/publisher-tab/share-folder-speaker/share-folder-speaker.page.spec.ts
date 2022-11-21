import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {IonicModule} from '@ionic/angular';

import {ShareFolderSpeakerPage} from './share-folder-speaker.page';

describe('ShareFolderSpeakerPage', () => {
  let component: ShareFolderSpeakerPage;
  let fixture: ComponentFixture<ShareFolderSpeakerPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ShareFolderSpeakerPage],
      imports: [IonicModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(ShareFolderSpeakerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
