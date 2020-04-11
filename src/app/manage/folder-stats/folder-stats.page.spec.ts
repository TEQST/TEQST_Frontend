import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FolderStatsPage } from './folder-stats.page';

describe('FolderStatsPage', () => {
  let component: FolderStatsPage;
  let fixture: ComponentFixture<FolderStatsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FolderStatsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FolderStatsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
