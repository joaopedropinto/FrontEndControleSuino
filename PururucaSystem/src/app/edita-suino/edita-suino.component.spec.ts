import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditaSuinoComponent } from './edita-suino.component';

describe('EditaSuinoComponent', () => {
  let component: EditaSuinoComponent;
  let fixture: ComponentFixture<EditaSuinoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditaSuinoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditaSuinoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
