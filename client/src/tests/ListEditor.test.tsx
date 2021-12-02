import React from "react";
import {cleanup, fireEvent, render, screen} from "@testing-library/react";
import ListEditor from "../components/List/ListEditor";
import { RecoilRoot } from "recoil";
import { userState, userListsState, currentListState } from "../atoms";
import { testUserListState, testUserState, testCurrentListState } from "./testStates";
import ReactRouter from "react-router";
import { Router, Route } from "react-router-dom";
import { MemoryRouter } from "react-router-dom";
import { createMemoryHistory } from "history";

afterEach(cleanup);

describe("The ListEditor should", () => {
  test("display the appropriate information", async () => {

    jest.mock("react-router-dom", () => ({
      ...jest.requireActual("react-router-dom"), // use actual for all non-hook parts
      useParams: () => ({
        listId: "HwVACfSl5e2OnqcQwJsn",
      }),
      useRouteMatch: () => ({ url: "/lists/edit//HwVACfSl5e2OnqcQwJsn" }),
    }));

    const history = createMemoryHistory();
    history.push("/lists/edit/HwVACfSl5e2OnqcQwJsn");
    await render(
      <RecoilRoot 
        initializeState={ async (snap) => {
          snap.set(userState, testUserState);
          snap.set(userListsState, testUserListState);
          snap.set(currentListState, testCurrentListState);
        }}>
        <Router history={history}>
          <Route path="/lists/edit/:listId">
            <ListEditor />
          </Route>
        </Router>
      </RecoilRoot>,
    );
    
    const listName = screen.getByTestId("list_name");
    const tiers = screen.getByTestId("tiers");
    expect(listName).toHaveTextContent("Sizzler");
    expect(tiers.childNodes.length).toEqual(4);
  });
});