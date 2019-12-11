import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Item } from './item';
import { LoggerService } from './logger.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient,
    private loggerService: LoggerService) {
  }

  getShoppingItems(): Observable<any> {
    return this.http.get('/api/items');
  }

  getShoppingItem(itemId: string): Observable<any> {
    return this.http.get('/api/item/' + itemId);
  }

  addShoppingItem(newItem: Item): Observable<any> {
    let headers = new HttpHeaders();
    headers.append('content-Type', 'application/json');
    return this.http.post('/api/item', newItem, { headers: headers });
  }

  updateShoppingItem(item: Item): Observable<any> {
    let headers = new HttpHeaders();
    headers.append('content-Type', 'application/json');
    return this.http.put(`/api/item/${item._id}`, item, { headers: headers });
  }

  deleteShoppingItem(id: string): Observable<any> {
    return this.http.delete('/api/item/' + id);
  }

  add(n1: number, n2: number): number {
    this.loggerService.log('Addition operation called');
    return n1 + n2;
  }

  subtract(n1: number, n2: number): number {
    this.loggerService.log('Subtraction operation called');
    return n1 - n2;
  }
}
