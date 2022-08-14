import React, {MouseEventHandler, useCallback, useEffect, useRef, useState} from "react";
import {Item} from "../../models/item";
import {RecursiveList} from "../RecursiveList/RecursiveList";
import './ListItem.scss';

export const ListItem = ({ item }: {item: Item}) => {
  const { name, children } = item;
  const [isOpened, setIsOpened] = useState<boolean>(false);

  const getClassList = useCallback(() => {
    let classList = [];
    if(children?.length) {
      classList.push('parent');

      if(isOpened) {
        classList.push('parent--opened');
      }
    }
    return classList.join(' ');
  }, [children, isOpened]);

  const handleClick: MouseEventHandler<HTMLElement> = (e) => {
    e.stopPropagation();
    if(children?.length) {
      setIsOpened((clicked) => !clicked);
    }
  };
  return (
    <li onClick={handleClick} className={getClassList()}>
      {name}
      {isOpened && children && <RecursiveList items={children} />}
    </li>
  );
};
