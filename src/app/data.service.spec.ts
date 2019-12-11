import { HttpErrorResponse } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ShoppingItems } from '../../server/db-data';

import { DataService } from './data.service';
import { LoggerService } from './logger.service';

describe('DataService', () => {
  let service: DataService;
  let loggerSpy: any;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    loggerSpy = jasmine.createSpyObj('LoggerService', ['log']);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        DataService,
        { provide: LoggerService, useValue: loggerSpy }
      ]
    });

    service = TestBed.get(DataService);
    httpTestingController = TestBed.get(HttpTestingController);
  });

  it('should retrieve all shopping items', () => {
    service.getShoppingItems().subscribe(items => {
      expect(items).toBeTruthy('No items returned');
      expect(items.length).toBe(5, 'incorrect number of items');

      const item = items.find(item => item._id === 'asdasda23423');
      expect(item.itemName).toBe('Orange');
    });

    const req = httpTestingController.expectOne('/api/items');
    expect(req.request.method).toEqual('GET');
    req.flush(ShoppingItems);
    // httpTestingController.verify();
  });

  it('should find an item by id', () => {
    service.getShoppingItem('asdasda45645').subscribe(item => {
      expect(item).toBeTruthy('No item returned');
      expect(item.itemName).toBe('Pear');
    });

    const req = httpTestingController.expectOne('/api/item/asdasda45645');
    expect(req.request.method).toEqual('GET');
    req.flush(ShoppingItems.find(item => item._id === 'asdasda45645'));
    // httpTestingController.verify();
  });

  it('should save an item', () => {
    service.addShoppingItem({
      _id: 'asdasda23123',
      itemName: 'Rambutan',
      itemBought: false,
      itemQuantity: 4
    });
  });

  it('should update an item', () => {
    const changeItem = {
      _id: 'asdasda3423',
      itemName: 'Kiwi',
      itemBought: false,
      itemQuantity: 3
    };

    service.updateShoppingItem(changeItem).subscribe(item => {
      expect(item._id).toBe(changeItem._id);
    });

    const req = httpTestingController.expectOne(`/api/item/${changeItem._id}`);

    expect(req.request.method).toEqual('PUT');
    expect(req.request.body.itemName).toEqual(changeItem.itemName);

    req.flush({
      ...ShoppingItems.find(item => item._id === changeItem._id),
      ...changeItem
    });
  });

  it('should give an error if update course fails', () => {
    const changeItem = {
      _id: 'asdasda3423',
      itemName: 'Kiwi',
      itemBought: false,
      itemQuantity: 3
    };

    service.updateShoppingItem(changeItem).subscribe(() => {
      fail('the update item operation should have failed');
    }, (error: HttpErrorResponse) => {
      expect(error.status).toBe(500);
    });

    const req = httpTestingController.expectOne(`/api/item/${changeItem._id}`);
    expect(req.request.method).toEqual('PUT');
    req.flush('Save item fail', { status: 500, statusText: 'Internal Server Error' });
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  // it('should add two numbers', () => {
  //   const result = service.add(2, 2);
  //   expect(result).toBe(4, 'unexpected addition result');
  //   expect(loggerSpy.log).toHaveBeenCalledTimes(1);
  // });
  //
  // it('should subtract two numbers', () => {
  //   const result = service.subtract(2, 2);
  //   expect(result).toBe(0, 'unexpected subtraction result');
  //   expect(loggerSpy.log).toHaveBeenCalledTimes(1);
  // });
});
