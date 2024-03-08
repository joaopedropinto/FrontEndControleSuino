import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastraPesagemComponent } from './cadastra-pesagem.component';

describe('CadastraPesagemComponent', () => {
  let component: CadastraPesagemComponent;
  let fixture: ComponentFixture<CadastraPesagemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CadastraPesagemComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CadastraPesagemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
