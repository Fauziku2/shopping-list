import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Item } from './item';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) {
  }

  getShoppingItems() {
    return this.http.get('/api/items');
  }

  addShoppingItem(newItem: Item) {
    let headers = new HttpHeaders();
    headers.append('content-Type', 'application/json');
    return this.http.post('/api/item', newItem, { headers: headers });
  }

  updateShoppingItem(item: Item) {
    let headers = new HttpHeaders();
    headers.append('content-Type', 'application/json');
    return this.http.put(`/api/item/${item._id}`, item, { headers: headers });
  }

  deleteShoppingItem(id: string) {
    return this.http.delete('/api/item/' + id);
  }
}
