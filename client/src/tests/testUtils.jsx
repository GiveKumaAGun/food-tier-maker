import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { RecoilRoot } from "recoil";
import { currentListState } from "../atoms";
import { testCurrentListState } from "./testStates";
import { createMemoryHistory } from "history";

export const customRender = (
  ui,
  {
    route = "/",
    history = createMemoryHistory({ initialEntries: [route] }),
    initialState,
    ...options
  } = {}
) => ({
  ...rtl(
    <RecoilRoot 
      initializeState={ async (snap) => {
        snap.set(userState, testUserState);
        snap.set(userListsState, testUserListState);
        snap.set(currentListState, testCurrentListState);
      }}>
      <Router history={history}>{ui}</Router>
    </RecoilRoot>,
    options
  ),
  history,
});