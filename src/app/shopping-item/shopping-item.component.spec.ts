import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { setupData } from '../../../server/setup-test-data';
import { AppModule } from '../app.module';

import { ShoppingItemComponent } from './shopping-item.component';

describe('ShoppingItemComponent', () => {
  let component: ShoppingItemComponent;
  let fixture: ComponentFixture<ShoppingItemComponent>;
  let el: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [AppModule]
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(ShoppingItemComponent);
        component = fixture.componentInstance;
        el = fixture.debugElement;
      });
  }));

  // beforeEach(() => {
  //   fixture = TestBed.createComponent(ShoppingItemComponent);
  //   component = fixture.componentInstance;
  //   fixture.detectChanges();
  // });

  it('should create a component', () => {
    expect(component).toBeTruthy();
  });

  it('should display a list of items', () => {
    component.shoppingItemList = setupData();
    fixture.detectChanges();
    const itemDiv = el.queryAll(By.css('.shopping-items-div'));
    expect(itemDiv).toBeTruthy('could not find div');
    expect(itemDiv.length).toBe(5, 'Unexpected number of items');
  });
});
