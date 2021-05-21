import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarPaqueteComponent } from './listar-paquete.component';

describe('ListarPaqueteComponent', () => {
  let component: ListarPaqueteComponent;
  let fixture: ComponentFixture<ListarPaqueteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarPaqueteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarPaqueteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
