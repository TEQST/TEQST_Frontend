import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {IonicModule} from '@ionic/angular';

import {DeleteMultipleFoldersPage} from './delete-multiple-folders.page';

describe('DeleteMultipleFoldersPage', () => {
  let component: DeleteMultipleFoldersPage;
  let fixture: ComponentFixture<DeleteMultipleFoldersPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [DeleteMultipleFoldersPage],
      imports: [IonicModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(DeleteMultipleFoldersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
