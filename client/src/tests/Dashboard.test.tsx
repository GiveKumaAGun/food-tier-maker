import React from "react";
import {cleanup, fireEvent, render, screen} from "@testing-library/react";
import Dashboard from "../components/Dashboard/Dashboard";
import { RecoilRoot } from "recoil";
import { userState, userListsState } from "../atoms";
import { getUserLists } from "../util";
import { testUserListState, testUserState } from "./testStates";

describe("The dashboard should", () => {
  test("display 'Welcome Guest' if using the demo profile", () => {
    render(
      <RecoilRoot 
        initializeState={(snap) => {
          snap.set(userState, testUserState);
        }}>
        <Dashboard />
      </RecoilRoot>
    );

    const component = screen.getByTestId("greeting");
    expect(component).toHaveTextContent("Welcome Guest");
  });

  test("display cards equal to the number of lists the user possesses plus one (create new list)", () => {
    render(
      <RecoilRoot 
        initializeState={ async (snap) => {
          snap.set(userState, testUserState);
          snap.set(userListsState, testUserListState);
        }}>
        <Dashboard />
      </RecoilRoot>
    );

    const component = screen.getByTestId("lists");
    expect(component).toHaveTextContent("Create new list");
    expect(component).toHaveTextContent("Sizzler");
    expect(component.childNodes.length).toEqual(2);
  });
});