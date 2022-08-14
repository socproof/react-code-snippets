import React, {useEffect, useState} from "react";
import {fetchData} from "../../api/api";
import {Item} from "../../models/item";
import {RecursiveList} from "../RecursiveList/RecursiveList";

export const FoldersList = () => {
  const [listData, setListData] = useState<Item[]>([]);

  useEffect(() => {
    fetchData().then((data) => setListData(data));
  }, []);

  return <RecursiveList data-testid="RecursiveList" items={listData} />;
};

