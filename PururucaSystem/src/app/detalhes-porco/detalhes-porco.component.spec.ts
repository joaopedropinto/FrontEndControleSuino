import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalhesPorcoComponent } from './detalhes-porco.component';

describe('DetalhesPorcoComponent', () => {
  let component: DetalhesPorcoComponent;
  let fixture: ComponentFixture<DetalhesPorcoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DetalhesPorcoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetalhesPorcoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
