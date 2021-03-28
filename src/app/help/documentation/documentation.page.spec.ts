import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {IonicModule} from '@ionic/angular';

import {DocumentationPage} from './documentation.page';

describe('DocumentationPage', () => {
  let component: DocumentationPage;
  let fixture: ComponentFixture<DocumentationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DocumentationPage],
      imports: [IonicModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(DocumentationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
