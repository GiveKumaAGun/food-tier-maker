import { atom } from "recoil";
import { User } from "./interfaces/User"
import { DocumentData } from "@firebase/firestore";

export const userState = atom<User | null>({
  key: "user",
  default: null
});

export const userDataState = atom<DocumentData | null>({
  key: "userData",
  default: null
});

export const userListsState = atom<DocumentData[]>({
  key: "userListsState",
  default: []
});

export const currentListState = atom<DocumentData | null>({
  key: "currentList",
  default: null
})