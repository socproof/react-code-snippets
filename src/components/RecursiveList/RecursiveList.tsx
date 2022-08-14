import {Item} from "../../models/item";
import {ListItem} from "../ListItem/ListItem";
import React from "react";

export const RecursiveList = ({ items }: {items: Item[]}) => {
  return (
    <ul className="list">
      {items.map((item) => (
        <ListItem item={item} key={item.id} />
      ))}
    </ul>
  );
}
