import React from "react";
import {render} from '@testing-library/react';
import {FoldersList} from "./FoldersList";
import * as api from "../../api/api";
import * as childComponent from "../RecursiveList/RecursiveList";

describe('FoldersList component', () => {
  beforeEach(() => {
    jest.spyOn(childComponent, 'RecursiveList');
    jest.spyOn(api, "fetchData");
  });

  test('test RecursiveList render', () => {
    render(<FoldersList />);
    expect(api.fetchData).toBeCalledTimes(1);
    expect(childComponent.RecursiveList).toBeCalledTimes(1);
  })
});





