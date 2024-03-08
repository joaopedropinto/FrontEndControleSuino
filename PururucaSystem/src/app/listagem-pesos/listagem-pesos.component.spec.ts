import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListagemPesosComponent } from './listagem-pesos.component';

describe('ListagemPesosComponent', () => {
  let component: ListagemPesosComponent;
  let fixture: ComponentFixture<ListagemPesosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListagemPesosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListagemPesosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
