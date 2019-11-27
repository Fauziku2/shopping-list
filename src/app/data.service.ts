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
    return this.http.get('http://localhost:3000/api/items');
  }

  addShoppingItem(newItem: Item) {
    let headers = new HttpHeaders();
    headers.append('content-Type', 'application/json');
    return this.http.post('http://localhost:3000/api/item', newItem, { headers: headers });
  }

  updateShoppingItem(item: Item) {
    let headers = new HttpHeaders();
    headers.append('content-Type', 'application/json');
    return this.http.put(`http://localhost:3000/api/item/${item._id}`, item, { headers: headers });
  }

  deleteShoppingItem(id: string) {
    return this.http.delete('http://localhost:3000/api/item/' + id);
  }
}
