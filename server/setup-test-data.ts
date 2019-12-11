import { Item } from '../src/app/item';
import { ShoppingItems } from './db-data';

export function setupData(): Item[] {
  return ShoppingItems as Item[];
}
