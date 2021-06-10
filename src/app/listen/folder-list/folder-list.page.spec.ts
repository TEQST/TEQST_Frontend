import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FolderListPage } from './folder-list.page';

describe('FolderListPage', () => {
  let component: FolderListPage;
  let fixture: ComponentFixture<FolderListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FolderListPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FolderListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
