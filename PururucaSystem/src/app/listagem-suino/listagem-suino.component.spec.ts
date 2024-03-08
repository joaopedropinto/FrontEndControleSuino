import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListagemSuinoComponent } from './listagem-suino.component';

describe('ListagemSuinoComponent', () => {
  let component: ListagemSuinoComponent;
  let fixture: ComponentFixture<ListagemSuinoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListagemSuinoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListagemSuinoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
