import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShoppingItemComponent } from './shopping-item/shopping-item.component';

const routes: Routes = [
  {
    path: '',
    component: ShoppingItemComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
