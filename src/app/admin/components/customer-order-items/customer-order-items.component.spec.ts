import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerOrderItemsComponent } from './customer-order-items.component';

describe('CustomerOrderItemsComponent', () => {
  let component: CustomerOrderItemsComponent;
  let fixture: ComponentFixture<CustomerOrderItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerOrderItemsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerOrderItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
