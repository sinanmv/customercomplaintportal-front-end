import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketregisterComponent } from './ticketregister.component';

describe('TicketregisterComponent', () => {
  let component: TicketregisterComponent;
  let fixture: ComponentFixture<TicketregisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TicketregisterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TicketregisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
