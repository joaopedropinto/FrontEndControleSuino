import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditaPesagemComponent } from './edita-pesagem.component';

describe('EditaPesagemComponent', () => {
  let component: EditaPesagemComponent;
  let fixture: ComponentFixture<EditaPesagemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditaPesagemComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditaPesagemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
