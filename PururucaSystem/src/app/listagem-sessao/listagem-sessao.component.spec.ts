import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListagemSessaoComponent } from './listagem-sessao.component';

describe('ListagemSessaoComponent', () => {
  let component: ListagemSessaoComponent;
  let fixture: ComponentFixture<ListagemSessaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListagemSessaoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListagemSessaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
