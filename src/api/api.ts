import {Item} from "../models/item";
import items from './items';

export const fetchData = () => new Promise<Item[]>(resolve => {
  setTimeout(resolve, 100, items);
});
