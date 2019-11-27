import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DataService } from '../data.service';
import { Item } from '../item';

@Component({
  selector: 'app-shopping-item',
  templateUrl: './shopping-item.component.html',
  styleUrls: ['./shopping-item.component.scss'],
})
export class ShoppingItemComponent implements OnInit {
  @ViewChild(NgForm) frm: NgForm;
  @ViewChild(NgForm) editForm: NgForm;

  shoppingItemList: Item[] = [];
  selectedItem: Item;
  toggleForm: boolean = false;

  constructor(private dataService: DataService) {
  }

  ngOnInit() {
    this.getItems();
  }

  getItems() {
    this.dataService.getShoppingItems().subscribe((items: any) => {
      this.shoppingItemList = items;
    });
  }

  addItem(form: any) {
    let newItem: Item = {
      itemName: form.value.itemName,
      itemQuantity: form.value.itemQuantity,
      itemBought: false
    };
    this.dataService.addShoppingItem(newItem).subscribe(res => {
      this.getItems();
      this.frm.form.reset();
    }, err => {
      console.log(err);
    });
  }

  showEditForm(item: Item) {
    this.selectedItem = item;
    this.toggleForm = !this.toggleForm;
  }

  editItem(form: any) {
    let newItem: Item = {
      _id: this.selectedItem._id,
      itemName: form.value.editItemName,
      itemQuantity: form.value.editItemQuantity,
      itemBought: this.selectedItem.itemBought
    };

    this.dataService.updateShoppingItem(newItem).subscribe(res => {
      this.getItems();
      this.editForm.form.reset();
      this.toggleForm = !this.toggleForm;
    }, err => {
      console.log(err);
    });
  }

  deleteItem(id: string) {
    this.dataService.deleteShoppingItem(id).subscribe((res: any) => {
      if (res.n === 1) {
        let index = this.shoppingItemList.findIndex(item => item._id === id);
        this.shoppingItemList.splice(index, 1);
      }
    }, err => {
      console.log(err);
    });
  }

  updateItemCheckbox(item: Item) {
    item.itemBought = !item.itemBought;

    this.dataService.updateShoppingItem(item).subscribe(res => {
      this.getItems();
    }, err => {
      console.log(err);
    });
  }

}
